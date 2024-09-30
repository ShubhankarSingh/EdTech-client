import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import StreamLecture from "./StreamLecture"
import { getCourseById } from "../../services/courseService"
import "./styles/CourseDescription.css"

const CourseDescription = () => {

    const location = useLocation()

    const {courseId} = location.state || {}
    const navigate = useNavigate()
    
    const [course, setCourse] = useState()

    const getCourse = async (id) => {
        const response = await getCourseById(id)
        setCourse(response.data)
    }

    useEffect(()=>{
        getCourse(courseId)
    },[courseId])

    if (!course) {
        return (
            <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh", paddingTop: "100px" }}>
                <div className="text-center">
                    <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
                        
                    </div>
                    <p className="mt-3 text-center">Loading...</p>
                </div>
            </div>
        );
    }
    
    // Replace %20 (space) with '-' (dash), also replaces multiple dashes with single dash
    const formmatedTitle = course.title.replace(/\s/g, '-').replace(/-+/g, '-').toLowerCase()

    const handleVideoView = (video, videoId, videoTitle) => {
        navigate(`/course/${formmatedTitle}/lesson/${videoId}`, {state: {video: video}})
    }

    // Get the first video from list 
    var previewVideoId = null
    if(course.videos.length > 0){
        previewVideoId = course.videos[0].id
    }

    const handleClick = () => {
        navigate(`/course/${courseId}/${formmatedTitle}/add-lecture`)
    }

    const handleAddReview = () => {
        navigate(`/course/${courseId}/${formmatedTitle}/add-review`, {state: {courseId: courseId, username: course.author.name}})
    }
    
    return (
    
    <div className="light">   
    <div className="blog-single">
        <div className="container">
        {course && (
            <div className="row align-items-start">
                <div className="col-lg-7 m-15px-tb">
                    <article className="article">                        
                        <div className="article-title">
                        
                            <h2>{ course.title }</h2>
                            <div className="media">
                                <div className="avatar">
                                  <img src={`data:image/png;base64, ${course.author.profilePicture}`} title="" alt="profile pic" />
                                </div>
                                <div className="media-body">
                                    <label>{course.author.name}</label>
                                </div>
                            </div>
                        </div>
                       
                        <div className="media-body">
                           
                        </div>
                        <div className="article-content">
                            <h4>What is this course about?</h4>
                            <p>{course.description}</p>
                            <blockquote>
                                <p>What you will learn?</p>
                                <p className="blockquote-footer">Course Outcomes </p>
                            </blockquote>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cupiditate ipsa doloribus dicta voluptates, beatae reiciendis quas, illum optio tenetur rem 
                              aperiam hic voluptatibus tempora sint nulla repudiandae velit placeat provident voluptatem! Dolorum ratione sint tempore deserunt facilis vel 
                              facere sapiente! Porro blanditiis nemo sapiente, at iure neque officiis veritatis tempore aliquid illum provident animi debitis optio exercitationem a aliquam magni dignissimos tenetur sunt ex. Natus voluptate.</p>
                        </div>
                    </article>
                   
                </div>
                <div className="col-lg-4 m-15px-tb blog-aside">
                    
                    <div className="widget widget-post">
                        <div className="widget-title">
                            <h3>INTRODUCTION TO COURSE</h3>
                        </div>
                        <div className="widget-body">         
                          
                            <h5 style={{color: 'black'}}>Course Preview</h5>                            
                            <video width="300" height="200" controls >
                                {previewVideoId ? (
                                    <source src={`http://localhost:8080/courses/play/${previewVideoId}`} type="video/mp4" />
                                ): (
                                    <source src="" />
                                )}
                            </video>
                          
                        </div>
                    </div>
                    
                    <div className="widget widget-author">
                        <div className="widget-title">
                            <h3>About Instructor</h3>
                        </div>
                        <div className="widget-body">
                            <div className="media align-items-center">
                                <div className="avatar">
                                    <img src={`data:image/png;base64, ${course.author.profilePicture}`} title="Profile Picture" alt="profile" />
                                </div>
                                <div className="media-body">
                                    <a href=""><h6>Hello, I'm {course.author.name}</h6></a>
                                </div>
                            </div>
                            <p>I am a professional software developer for over 14 years. I have trained over 50,000 students how to program, way more than a typical IT Professor at a college does in a lifetime.</p>
                        </div>
                    </div>
                                    
                </div>
                <div className="table-responsive custom-table-responsive" style={{marginLeft: "20px", marginRight: "100px", border: "1px solid rgb(218, 204, 204)"}}>

                  <table className="table custom-table">
                    <thead>
                      <tr>                                                   
                        <th scope="col">S.No.</th>
                        <th scope="col">Lesson Name</th>                       
                        <th scope="col">Video</th>
                        <th scope="col">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                        
                   {course.videos && course.videos.map((video) => (
                        
                    <>
                        <tr key={video.id} scope="row">                                        
                            <td>{video.id}</td>
                            <td>{video.title}</td>
                            <td><a onClick={() => handleVideoView(video, video.id, video.title)}>Watch Lecture</a></td>
                            <td>45 mins</td>  
                        </tr>
                        <tr key={`spacer-${video.id}`} className="spacer"><td colSpan="200"></td></tr>  
                    </>
                    )
                    )}                                    
                    </tbody>
                  </table>
                </div>
                {(localStorage.getItem('email') == course.author.email) && (localStorage.getItem('userId') == course.author.id) ? (<div>
                    <br />
                    <button className="btn btn-primary mx-2" 
                     style={{ borderRadius: '0', padding: '7px', margin: '0' }} 
                     onClick={() => handleClick()}
                     >
                     Add Lecture
                     </button>
                </div>) : <></>
                }

                {(localStorage.getItem('email') != course.author.email) && (localStorage.getItem('userId') != course.author.id) ? (<div>
                    <br />
                    <button className="btn btn-primary mx-2" 
                     style={{ borderRadius: '0', padding: '7px', margin: '0' }} 
                     onClick={() => handleAddReview()}
                     >
                     Add a review
                     </button>
                </div>) : <></>
                }

            </div>
            ) }
        </div>   
    </div>
    </div>
    )
}

export default CourseDescription