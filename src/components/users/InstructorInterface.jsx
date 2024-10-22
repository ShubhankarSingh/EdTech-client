import React from 'react';
import image from "./engaging-course.jpg";
import { useNavigate } from "react-router-dom";
import "./styles/Instructor.css"

const InstructorInterface = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/course/add-course");
    };

    return (
        <div className="container-fluid my-5" style={{ maxWidth: "1500px" }}> 
            
            <div className="instructor row align-items-center">
                <div className="col-md-8 text-start" style={{ paddingLeft: '25px' }}>
                    <p style={{paddingLeft: "12px"}}>Jump Into Course Creation</p>
                </div>
                <div className="col-md-4 text-end" style={{ paddingRight: '50px' }}>
                    <button className="btn btn-primary" onClick={handleClick}>
                        Create Your Course
                    </button>
                </div>
            </div>

            <div className="instructor row align-items-center">
                <div className="col-md-4" style={{ paddingLeft: '35px' }}>
                    <img src={image} alt="Engaging Course" className="img-fluid" />
                </div>
                <div className="col-md-8" style={{ paddingRight: '250px' }}>
                    <h2>Create an Engaging Course</h2>
                    <p>
                        Whether you've been teaching for years or are teaching for the first time, 
                        you can make an engaging course. We've compiled resources and best practices 
                        to help you get to the next level, no matter where you're starting.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InstructorInterface;
