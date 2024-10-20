import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import "./styles/CourseDetail.css"
import { getCourseById } from "../../services/courseService"

const CourseDetail = ({course}) => {

    //const [fetchedCourse, setCourse] = useState()
    const navigate = useNavigate()

    // const getCourse = async (id) => {
    //     const response = await getCourseById(id)
    //     console.log("Course data: " + response)
    //     setCourse(response.data)
    // }

    // console.log(course)

    // useEffect(()=>{
    //     getCourse(course.courseId)
    // },[course.courseId])

    // Replace %20 (space) with '-' (dash), also replaces multiple dashes with single dash
    const formmatedTitle = course.title.replace(/\s/g, '-').replace(/-+/g, '-').toLowerCase()
    const handleView = () =>{
        navigate(`/course/${formmatedTitle}/`, {state: {title: course.title, courseId : course.courseId}})
    }

    return (
        
        <div className="dark">
            <main className="container py-4">
                
                <article className="postcard dark blue" style={{ maxHeight: '320px' }}>
                    <a className="postcard__img_link" href="#">
                        <img className="postcard__img" alt="Image Title" src={`data:image/png;base64, ${course.thumbnail}`} />  
                    </a>
                    <div className="postcard__text">
                        <h1 className="postcard__title red">
                            <a href="#">{course.title}</a>
                        </h1>
                        <div className="postcard__subtitle small">                  
                            <p className="fas fa-calendar-alt mr-2"> {course.shortDescription} </p>           
                        </div>
                        <div className="postcard__bar"></div>
                        <div className="postcard__preview-txt">
                            <p>{course.author.name }</p> 
                        </div>
                        <div className="postcard__preview-txt">
                            {course.originalPrice != 0 && course.offerPrice != 0 &&
                            <h4>₹ <s>{course.originalPrice }</s> {course.offerPrice}</h4> 
                            }
                            {
                                course.originalPrice == 0 && course.offerPrice == 0 && 
                                <h4>Free</h4> 
                            }
                        </div>
                        
                        <div className="postcard__tagbox">
                            <button type="button" className="btn btn-outline-warning" onClick={handleView}>
                                DETAILS
                            </button>
                        </div>
                    </div>
                </article>    
            </main>
        </div>

    )

    
}

export default CourseDetail