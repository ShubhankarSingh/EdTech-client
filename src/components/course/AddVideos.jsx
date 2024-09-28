import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { addLecture } from "../../services/courseService";


const AddVideos = () => {
    const [video, setVideo] = useState({
        title: "",
        url: ""
    });

    const { courseId } = useParams(); 

    console.log(courseId)

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        setVideo({...video, [e.target.name]: e.target.value});
    };

    const handleVideoChange = (e) => {
        setVideo({...video, url: e.target.files[0]});
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("Inside video form submit");
        try {
            
            const response = await addLecture(video, courseId); 
            console.log(response)
            if(response == 200) {
                setVideo({ title: "", url: "" });
                setSuccessMessage("Lecture added successfully!");
            }
        } catch (error) {
            setErrorMessage(`Failed to add Lecture: ${error.message}`);
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 5000);
    };

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
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
    </div>
    </div>
    </div>
    </div>
    );
};

export default AddVideos;
