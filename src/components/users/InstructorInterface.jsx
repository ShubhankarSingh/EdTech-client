import React from 'react';
import image from "./engaging-course.jpg";
import { useNavigate } from "react-router-dom";

const InstructorInterface = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/course/add-course");
    };

    return (
        <div className="container-fluid my-5" style={{ maxWidth: "1500px" }}> 
            
            <div className="row align-items-center" 
                style={{ border: '1px solid white', padding: '20px 0', margin: '0' }}>
                <div className="col-md-8 text-start" style={{ paddingLeft: '25px' }}>
                    <p style={{ fontSize: '18px', margin: '0', paddingLeft: '25px' }}>Jump Into Course Creation</p>
                </div>
                <div className="col-md-4 text-end" style={{ paddingRight: '50px' }}>
                    <button className="btn btn-primary" 
                            style={{ borderRadius: '0', padding: '15px', margin: '0' }} 
                            onClick={handleClick}>
                        Create Your Course
                    </button>
                </div>
            </div>

            <div className="row align-items-center" 
                 style={{ border: '1px solid white', padding: '20px 0', margin: '0', marginTop: '10px' }}>
                <div className="col-md-4" style={{ paddingLeft: '35px' }}>
                    <img src={image} style={{height: '250px'}} alt="Engaging Course" className="img-fluid" />
                </div>
                <div className="col-md-8" style={{ paddingRight: '250px' }}>
                    <h2 style={{marginBottom: '40px'}}>Create an Engaging Course</h2>
                    <p style={{ fontSize: '18px', margin: '0' }}>
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
