import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import StreamLecture from "./StreamLecture"
import { checkEnrollmentStatus, deleteLecture, enrollCourse, getCourseById } from "../../services/courseService"
import "./styles/CourseDescription.css"
import Reviews from "./Reviews"
import { useReview } from "./CourseContext"

const CourseDescription = () => {

    const location = useLocation()

    const {courseId} = location.state || {}
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    
    const [course, setCourse] = useState()
    const [isEnrolled, setIsEnrolled] = useState()

    const getCourse = async (courseId) => {
        const response = await getCourseById(courseId)
        setCourse(response.data)
    }

    const enrollmentStatus = async (userId, courseId) => {
        const response = await checkEnrollmentStatus(userId, courseId)
        console.log(response.data)
        setIsEnrolled(response.data)
    }

    useEffect(()=>{
        enrollmentStatus(userId, courseId)
        getCourse(courseId)
    },[courseId, userId])

    // check if current user has already added a review
    const reviewCheck = useReview()
    var isReviewAdded
    useEffect(() => {
        if (course) {
            isReviewAdded = course.reviews.some((review) => review.userId === parseInt(userId));
            if (isReviewAdded) {
                reviewCheck.addReviewCheck();
            } else {
                reviewCheck.removeReviewCheck();  // Ensure removal in case no review exists
            }
        }
    }, [course, reviewCheck]);


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

    const showProfile = (authorId) => {
        navigate(`/user/profile`, {state: {authorId: authorId}})
    }

    const handleLectureUpdate = (courseId, videoId) =>{
        navigate(`/course/${courseId}/update-lecture/${videoId}`);
    }

    const handleDeleteLecture = async (courseId, videoId) => {
        const isConfirmed = confirm("Are you sure you want to delete this lecture?")
        if(isConfirmed){
            const response = await deleteLecture(courseId, videoId)
            if(response.status === 200){
                alert(response.data)
            }
            window.location.reload()
        }
    }

    const handleAddReview = () => {
        navigate(`/course/${courseId}/${formmatedTitle}/add-review`, {state: {courseId: courseId, title: formmatedTitle, }})
    }

    const handleCourseEnroll = async (courseId, email, amount) =>{ 
        navigate("/course/payment", {state: {courseId, email, amount}})
    }

    const handleFreeCourseEnroll = async (courseId) => {
        const response = await enrollCourse(userId, courseId);
        if (response.status === 200) {
            alert("Course Enrollment Successfull!");
            navigate('/my-courses');
        }
    }
 
    return (
    
    <div className="light">   
    <div className="blog-single">
        <div className="container">
        {course && (
            <div className="row align-items-start">
                <div className="col-lg-8 m-15px-tb">
                    <article className="article">                        
                        <div className="article-title">
                        
                            <h2>{ course.title }</h2>
                            <h5>{course.shortDescription}</h5>
                            <br />
                            <p>Created By <a href="" onClick={() => showProfile(course.author.id)}>{course.author.name}</a></p>
                            <div className="row">
                                <div className="col">
                                    <i className="bi bi-patch-exclamation-fill">  Created on {course.createdDate}&nbsp;&nbsp;</i> 
                                    <i className="bi bi-globe2"> {course.language}</i>
                                </div>
                            </div>
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

                    <h4>Course Content</h4>                   
                    <div className="container lectures">
                        
                    {course.videos && course.videos.map((video) => (
                            
                        <>
                        <div className="row p-3 mb-2 text-white align-items-center" style={{ backgroundColor: "grey" }} key={video.id}>
   
                            <div className="col-auto">
                                <button className="btn" style={{ cursor: "pointer" }} onClick={() => handleVideoView(video, video.id, video.title)}>
                                    <i className="bi bi-play-btn-fill"></i> {video.title}
                                </button>
                            </div>

                            <div className="col"></div>
                            
                            <div className="col-auto">
                                <span>15 mins</span>
                            </div>
                            
                            {(localStorage.getItem('email') == course.author.email) && (localStorage.getItem('userId') == course.author.id) ? <>
                                
                            <div className="col-auto">
                                <button className="btn" style={{ cursor: "pointer" }} onClick={() => handleLectureUpdate(course.courseId, video.id)}>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                            </div>

                            <div className="col-auto">
                                <button className="btn" style={{ cursor: "pointer" }} onClick={() => handleDeleteLecture(course.courseId, video.id)}>
                                    <i className="bi bi-trash3-fill" style={{ color: "red" }}></i>
                                </button>
                            </div>
                            </> : <></>
                            }
                        </div>

                        </>
                        )
                        )}                                    
                    </div>   
                </div>

                <div className="col-lg-3 m-15 px-tab blog-aside">
                    
                    <div className="widget widget-post" style={{ height: "300px" }}>
                        <div className="widget-title">
                            <h3>COURSE PREVIEW</h3>
                        </div>
                        <div className="widget-body d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                            <video style={{ width: "100%", height: "170px", objectFit: "cover" }} controls>
                                {previewVideoId ? (
                                    <source src={`http://localhost:8080/courses/play/${previewVideoId}`} type="video/mp4" />
                                ) : (
                                    <source src="" />
                                )}
                            </video>
                            {!isEnrolled && (localStorage.getItem('userId') != course.author.id) && (course.offerPrice != 0 && course.originalPrice != 0) &&
                                <button className="btn btn-md btn-primary px-3 mt-1 w-100" onClick={() => handleCourseEnroll(course.courseId, localStorage.getItem('email'), course.offerPrice)} style={{ borderRadius: '0' }}>
                                    Buy Course
                                </button>
                            }
                            {!isEnrolled && (localStorage.getItem('userId') != course.author.id) && (course.offerPrice == 0 && course.originalPrice == 0) &&
                                <button className="btn btn-md btn-primary px-3 mt-1 w-100" onClick={() => handleFreeCourseEnroll(course.courseId)} style={{ borderRadius: '0' }}>
                                    Enroll
                                </button>
                            }
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
                                    <p>Hello, I'm <a onClick={() => showProfile(course.author.id)}>{course.author.name}</a></p>
                                </div>
                            </div>
                            <p>I am a professional software developer for over 14 years. I have trained over 50,000 students how to program, way more than a typical IT Professor at a college does in a lifetime.</p>
                        </div>
                    </div>
                                    
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

                {(localStorage.getItem('email') != course.author.email) && (localStorage.getItem('userId') != course.author.id) 
                    && isEnrolled && localStorage.getItem('isReviewAdded') === 'false' 
                ? (<div>
                    <br />
                    <button className="btn btn-primary mx-2" 
                     style={{ borderRadius: '0', padding: '7px', margin: '0' }} 
                     onClick={() => handleAddReview()}
                     >
                     Add a review
                     </button>
                </div>) : <></>
                }
                 
                <Reviews reviews={course.reviews}/>
            </div>
            ) }
        </div>   
    </div>
    </div>
    )
}

export default CourseDescription