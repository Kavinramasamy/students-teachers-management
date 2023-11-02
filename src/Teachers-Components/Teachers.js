import React from "react";
import { Link, Outlet } from "react-router-dom";

const Teachers = () => {
    return (
        <div className="fixed-container">
            <div className="row bg-dark justify-content-around">
                <div className="col-md-6">
                    <Link className="btn text-light w-100" to="teachersList">
                        ListTeacher
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link className="btn text-light w-100" to="addTeacher">
                        AddTeacher
                    </Link>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Teachers;
