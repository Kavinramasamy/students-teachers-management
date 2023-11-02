import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { StudentContext } from '../App';

export const AddStudents = () => {
    const { students, setStudents } = useContext(StudentContext);
    const navTo = useNavigate();
    const fieldvalidationscheme = yup.object({
        name: yup.string().required("Please enter Name"),
        batch: yup.string().required("Please enter Batch"),
        qualification: yup.string().required("Please enter qualification"),
        gender: yup.string().required("Please enter gender")
    })

    const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
        initialValues: {
            name: "",
            batch: "",
            qualification: "",
            gender: "",
        },
        validationSchema: fieldvalidationscheme,
        onSubmit: async (newStudent) => {
            const response = await fetch(
                "https://644b33c517e2663b9deab9c8.mockapi.io/users",
                {
                    method: "POST",
                    body: JSON.stringify(newStudent),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            setStudents([...students, data]);
            navTo('/studentsList');
        }
    })
    return (
        <div className=''>
            <h1 className='page-title m-5'>ADD STUDENT</h1>
            <form onSubmit={handleSubmit}
                title={"Add new student"}
                description={"You can add new student data here"}
            >
                <div className="m-3 pt-5 pb-3  border border-3 shadow rounded d-flex flex-column align-items-center justify-content-start">
                    <div className=" form-floating mb-3 ">
                        <input
                            id="name"
                            className={`form-control shadow  ${touched.name && errors.name ? " border-danger " : ""}`}
                            placeholder="Enter name"
                            type="text"
                            value={values.name} onChange={handleChange} onBlur={handleBlur}
                        />
                        <label for="name" className="text-muted">
                            {touched.name && errors.name ? errors.name : "Enter Name"}
                        </label>

                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="batch"
                            className={`form-control shadow ${touched.batch && errors.batch ? " border-danger " : ""}`}
                            placeholder="Enter Batch"
                            type="text"
                            value={values.batch} onChange={handleChange} onBlur={handleBlur}
                        />
                        <label for="batch" className="text-muted">
                            {touched.batch && errors.batch ? errors.batch : "Enter batch"}
                        </label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="gender"
                            className={`form-control shadow ${touched.gender && errors.gender ? " border-danger " : ""}`}
                            placeholder="Enter Gender"
                            type="text"
                            value={values.gender} onChange={handleChange} onBlur={handleBlur}
                        />
                        <label for="gender" className="text-muted">
                            {touched.gender && errors.gender ? errors.gender : "Enter Gender"}
                        </label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="qualification"
                            className={`form-control shadow ${touched.qualification && errors.qualification ? " border-danger " : ""}`}
                            placeholder="Enter Qualification"
                            type="text"
                            value={values.qualification} onChange={handleChange} onBlur={handleBlur}
                        />
                        <label for="qualification" className="text-muted">
                            {touched.qualification && errors.qualification ? errors.qualification : "Enter qualification"}
                        </label>
                    </div>
                    <button
                        className="btn btn-success shadow"
                        type='submit'
                    >
                        Add Student
                    </button>
                </div>
            </form>
            <footer>you can add new student data here</footer>
        </div>
    );
}
