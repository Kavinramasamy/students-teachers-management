import React from 'react'
import { Link } from 'react-router-dom'

const NavPage = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-success px-3">
            <Link class="navbar-brand text-light px-3" to="/home">
                <h3>Dashboard</h3>
            </Link>
            <button
                class="navbar-toggler border-0"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <i class="fa-solid fa-bars fa-xl text-light" />
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link className="btn text-light w-100 px-5" to="/studentsList">
                            Students page
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link className="btn text-light w-100 px-5" to="/teachersList">
                            Teachers Page
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavPage
