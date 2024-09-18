import React from 'react'
import { Link } from "react-router-dom"

const NavBar = (props) => {

    return (
        <div id="app-navbar">
            <nav className="navbar navbar-expand-md navbar-dark navbar-custom py-3">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="/">EdTech</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link text-light" aria-current="page" to="/">Home</Link></li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-light" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <Link className="dropdown-item text-dark" to="/">Mobile</Link>
                                    <Link className="dropdown-item text-dark" to="/">Laptop</Link>
                                    <Link className="dropdown-item text-dark" to="/">Appliances</Link>
                                    <Link className="dropdown-item text-dark" to="/">Furniture</Link>
                                </ul>
                            </li>
                        </ul>

                        {/* <form method="GET" action="/search" className="d-flex mx-auto" onSubmit={handleSubmit}>
                            <input className="form-control me-2" type="search" value={query} onChange={handleChange} placeholder="Search for Products, Brand and More" aria-label="Search" name="query" id="search" style={{ minWidth: "730px" }}/>
                            <button className="btn btn-outline-dark text-light search-button" type="submit" >Search</button>
                        </form> */}
                        
                        <ul>
                            <li className="nav-item">
                                <Link className="nav-link text-light" style={{fontSize: '15px'}} to="/course/add-course" role="button">Add Course</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                            {!localStorage.getItem('token') &&  
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/login" role="button">Login</Link>
                            </li>}
                            {!localStorage.getItem('token') &&
                            <li className="navitem">
                                <Link className="nav-link text-light" to="/register" role="button">Signup</Link>
                            </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default NavBar