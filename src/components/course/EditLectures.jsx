import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById, updateLecture } from "../../services/courseService";

const EditLectures = () => {

    const [video, setVideo] = useState({
        title: "",
        url: ""
    });

    const [course, setCourse] = useState();
    const { courseId, videoId } = useParams(); 
    const navigate = useNavigate()
    
    
    useEffect(()=>{
        getCourseById(courseId).then((response)=>{
            setCourse(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[courseId])


    const handleInputChange = (e) => {
        setVideo({...video, [e.target.name]: e.target.value});
    };

    const handleVideoChange = (e) => {
        setVideo({...video, url: e.target.files[0]});
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateLecture(courseId, videoId, video); 
            console.log(response)
            if(response == 200) {
                window.location.reload()
                setVideo({ title: "", url: "" });
            }
        } catch (error) {
            console.log(error)
        }
    };

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

    const formmatedTitle = course.title.replace(/\s/g, '-').replace(/-+/g, '-').toLowerCase()
    if(course.author.id != localStorage.getItem('userId')){
        navigate(`/course/${formmatedTitle}`, {state: {courseId : course.courseId}})
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="">
                        <div className="p-3 mb-2  text-white text-center" style={{backgroundColor: "rgb(10, 7, 59)"}} >ADD A LECTURE</div>
            
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="col-sm-3 col-form-label">Title</label>
                                <input id="title" name="title" type="text" className="form-control" value={video.title} onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="url" className="col-sm-3 col-form-label">Video</label>
                                <input id="url" name="url" type="file" className="form-control" onChange={handleVideoChange}/>
                            </div>
                            <div className="text-center">
                            <button type="submit" className="btn btn-primary w-100 mt-3">Add Lecture</button>
                        </div>
                        </form>
        </div>
        </div>
        </div>
        </div>
    )
}

export default EditLectures