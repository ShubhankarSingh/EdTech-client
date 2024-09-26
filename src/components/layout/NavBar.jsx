import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './styles/Navbar.css';
import { getAllCategories } from "../../services/courseService";
import Logout from "../auth/Logout";
import { useAuth } from "../auth/AuthProvider";

const NavBar = (props) => {

    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        getAllCategories().then((data) => {
            setCategories(data);
        });
    }, []);

    const { isAuthenticated } = useAuth();
    
    return (
        <div id="app-navbar">
            <nav className="navbar navbar-expand-md navbar-dark navbar-custom py-3">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light fs-3 mx-4" to="/">EdTech</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    {/* Use mx-auto to center the content */}
                    <div className="collapse navbar-collapse mx-auto" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <Link className="nav-link text-light fs-5 mx-2" aria-current="page" to="/">Home</Link>
                            </li> */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-light fs-5" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {categories.map((category) => (
                                        <li key={category.id}>
                                            <Link className="dropdown-item text-dark fs-5" to={`courses/${category.categoryType}`}>{category.categoryType}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                        
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-light fs-5 mx-4" to="/course/add-course" role="button">Instructor</Link>
                            </li>
                            
                            {isAuthenticated ? (
                                <Logout />
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light fs-5" to="/login" role="button">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light fs-5" to="/register" role="button">Signup</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
