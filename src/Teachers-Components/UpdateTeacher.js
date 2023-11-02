import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { StudentContext } from "../App";

export default function UpdateTeachers() {
    var index;
    var i = 0;
    const navTo = useNavigate();
    //Getting teachers data using context....
    const { teachers, setTeachers } = useContext(StudentContext);
    //Getting teacher id.....
    const { id } = useParams();
    //Setting required Form fields....
    const fieldvalidationscheme = yup.object({
        name: yup.string().required("Please enter Name"),
        experience: yup.string().required("Please enter experience"),
        qualification: yup.string().required("Please enter qualification"),
        gender: yup.string().required("Please enter gender"),
    });
    //Getting the teacher data which we have to edit....
    const editTeacher = teachers.filter((ele) => {
        if (ele.id === id) {
            index = i;
            return ele;
        }
        i++;
    });
    //Assigning the values for initial value....
    const [name, setName] = useState(editTeacher.name);
    const [experience, setexperience] = useState(editTeacher.experience);
    const [gender, setGender] = useState(editTeacher.gender);
    const [qualification, setQualification] = useState(editTeacher.qualification);
    //Formik for form validation....
    const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
        useFormik({
            initialValues: {
                id,
                name,
                experience,
                qualification,
                gender,
            },
            validationSchema: fieldvalidationscheme,
            onSubmit: async function updateTeacher() {
                //updated teacher data
                const updatedObject = {
                    name: values.name,
                    experience: values.experience,
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
                    teachers[index] = data;
                    setTeachers([...teachers]);
                    navTo("/teachersList");
                }
            },
        });
    return (
        <div className="">
            <h1 className="page-title m-5">Edit Teacher</h1>
            <form
                onSubmit={handleSubmit}
                title={"Add new teacher"}
                description={"You can add new teacher data here"}
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
                            id="experience"
                            className={`form-control shadow ${touched.experience && errors.experience ? " border-danger " : ""
                                }`}
                            placeholder="Enter experience"
                            type="text"
                            value={values.experience}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="experience" className="text-muted">
                            {touched.experience && errors.experience
                                ? errors.experience
                                : "Enter experience"}
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
            <footer>you can add new teacher data here</footer>
        </div>
    );
}
