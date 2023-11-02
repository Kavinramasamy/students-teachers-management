import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { StudentContext } from "../App";
import { useEffect } from "react";

export default function UpdateStudents() {
    var index;
    var i = 0;
    const navTo = useNavigate();
    //Getting students data using context....
    const { students, setStudents, temp } = useContext(StudentContext);
    //Getting student id.....
    const { id } = useParams();
    //Setting required Form fields....
    const fieldvalidationscheme = yup.object({
        name: yup.string().required("Please enter Name"),
        batch: yup.string().required("Please enter Batch"),
        qualification: yup.string().required("Please enter qualification"),
        gender: yup.string().required("Please enter gender"),
    });
    console.log(students)
    //Getting the student data which we have to edit....
    const editStudent = students.filter((ele) => { if (ele.id == id) { index = i; return ele; } i++; });
    //Assigning the values for initial value....
    const [name, setName] = useState(editStudent[0].name);
    const [batch, setBatch] = useState(editStudent[0].batch);
    const [gender, setGender] = useState(editStudent[0].gender);
    const [qualification, setQualification] = useState(editStudent[0].qualification);

    //Formik for form validation....
    const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
        useFormik({
            initialValues: {
                id,
                name,
                batch,
                qualification,
                gender,
            },
            validationSchema: fieldvalidationscheme,
            onSubmit: async function updateStudent() {
                //updated student data
                const updatedObject = {
                    name: values.name,
                    batch: values.batch,
                    gender: values.gender,
                    qualification: values.qualification,
                    id,
                };
                const response = await fetch(
                    `https://644b33c517e2663b9deab9c8.mockapi.io/users/${id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(updatedObject),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();
                if (data) {
                    students[index] = data;
                    setStudents([...students]);
                    navTo('/studentsList')
                }
            },
        });
    return (
        <div className="">
            <h1 className="page-title m-5">EDIT STUDENT</h1>
            <form
                onSubmit={handleSubmit}
                title={"Add new student"}
                description={"You can add new student data here"}
            >
                <div className="m-3 pt-5 pb-3  border border-3 shadow rounded d-flex flex-column align-items-center justify-content-start">
                    <div className=" form-floating mb-3 ">
                        <input
                            id="name"
                            className={`form-control shadow  ${touched.name && errors.name ? " border-danger " : ""
                                }`}
                            placeholder="Enter name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="name" className="text-muted">
                            {touched.name && errors.name ? errors.name : "Enter Name"}
                        </label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="batch"
                            className={`form-control shadow ${touched.batch && errors.batch ? " border-danger " : ""
                                }`}
                            placeholder="Enter Batch"
                            type="text"
                            value={values.batch}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="batch" className="text-muted">
                            {touched.batch && errors.batch ? errors.batch : "Enter batch"}
                        </label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="gender"
                            className={`form-control shadow ${touched.gender && errors.gender ? " border-danger " : ""
                                }`}
                            placeholder="Enter Gender"
                            type="text"
                            value={values.gender}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="gender" className="text-muted">
                            {touched.gender && errors.gender ? errors.gender : "Enter Gender"}
                        </label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="qualification"
                            className={`form-control shadow ${touched.qualification && errors.qualification
                                    ? " border-danger "
                                    : ""
                                }`}
                            placeholder="Enter Qualification"
                            type="text"
                            value={values.qualification}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="qualification" className="text-muted">
                            {touched.qualification && errors.qualification
                                ? errors.qualification
                                : "Enter qualification"}
                        </label>
                    </div>
                    <button className="btn btn-success shadow" type="submit">
                        Update
                    </button>
                </div>
            </form>
            <footer>you can add new student data here</footer>
        </div>
    );
}
