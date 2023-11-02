import { useFormik } from 'formik';
import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { StudentContext } from '../App';

export const AddTeacher = () => {
    const navTo = useNavigate()
    const { teachers, setTeachers } = useContext(StudentContext);
    const fieldvalidationscheme = yup.object({
        name: yup.string().required("Please enter Name"),
        year_of_exp: yup.string().required("Please enter exp"),
        qualification: yup.string().required("Please enter qualification"),
        gender: yup.string().required("Please enter gender")
    })

    const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
        initialValues: {
            name: "",
            year_of_exp: "",
            qualification: "",
            gender: ""
        },
        validationSchema: fieldvalidationscheme,
        onSubmit: async (newTeacher) => {
            const response = await fetch(
                "https://644b33c517e2663b9deab9c8.mockapi.io/Teachers",
                {
                    method: "POST",
                    body: JSON.stringify(newTeacher),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            setTeachers([...teachers, data]);
            navTo('/teachersList')
        }
    })
    return (
        <div className=''>
            <h1 className='page-title m-5'>ADD TEACHER</h1>
            <form onSubmit={handleSubmit}
                title={"Add new teacher"}
                description={"You can add new teacher data here"}
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
                            id="year_of_exp"
                            className={`form-control shadow ${touched.year_of_exp && errors.year_of_exp ? " border-danger " : ""}`}
                            placeholder="Enter years of exp"
                            type="text"
                            value={values.year_of_exp} onChange={handleChange} onBlur={handleBlur}
                        />
                        <label for="year_of_exp" className="text-muted">
                            {touched.year_of_exp && errors.year_of_exp ? errors.year_of_exp : "Enter year_of_exp"}
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
                        Add Teacher
                    </button>

                </div>
            </form>
            <footer>you can add new teacher data here</footer>
        </div>
    );
}
