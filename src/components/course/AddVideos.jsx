import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { addLecture } from "../../services/courseService";


const AddVideos = () => {
    const [video, setVideo] = useState({
        title: "",
        url: ""
    });

    const { courseId } = useParams(); 

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
        <div>
            <h1>Add Lecture</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="title" className="col-sm-3 col-form-label">Title</label>
                    <div className="col-sm-6">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="form-control"
                            value={video.title}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="url" className="col-sm-3 col-form-label">Video</label>
                    <div className="col-sm-6">
                        <input
                            id="url"
                            name="url"
                            type="file"
                            className="form-control"
                            onChange={handleVideoChange}
                        />
                    </div>
                </div>
                <div>
                    <button type="submit">Add Lecture</button>
                </div>
            </form>
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default AddVideos;
