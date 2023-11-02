import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Students() {
    return (
        <div className="fixed-container">
            <div className="row bg-dark justify-content-around">
                <div className="col-md-6">
                    <Link className="btn text-light w-100" to="studentsList">
                        Students List
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link className="btn text-light w-100" to="addStudent">
                        Add Students
                    </Link>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
