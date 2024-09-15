import React from 'react'
import { useNavigate } from "react-router-dom"

const CourseDetail = ({course}) => {

    const navigate = useNavigate()

    const handleView = () =>{
        navigate(`/course/${course.title}/`, {state: {course : course}})
    }


    return (
        
        <div className="col-md-3">
            <a className="card product-card my-3" onClick={handleView}>
                {/* <img src={imageSrc} alt={name} /> */}
                <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.shortDescription}</p>
                    <p className="card-text">₹{course.author}</p>
                </div>
            </a>
        </div>
        
    )
}

export default CourseDetail