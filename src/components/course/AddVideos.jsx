import React, { useState } from 'react'

const AddVideos = () => {

    const [videoData, setVideoData] = useState({
        title: "",
        video: null
    })

    const [videos, setVideos] = useState([])

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div>AddVideos</div>
    )
}

export default AddVideos