import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const StreamLecture = () => {
    const location = useLocation();
    const { video } = location.state || {};

    const [videoUrl, setVideoUrl] = useState("");

    useEffect(() => {
        if (video?.id) {
            fetch(`http://localhost:8080/courses/play/${video.id}`)
                .then(response => response.text())  // Backend returns plain text (URL)
                .then(url => setVideoUrl(url))
                .catch(error => console.error("Error fetching video URL:", error));
        }
    }, [video]);

    console.log(videoUrl)

    return (
        <div className="m-5">
            <h4>{video?.title}</h4>
            {videoUrl ? (
                <video controls width="600px" height="300px">
                    <source src={videoUrl} type="video/mp4" />
                </video>
            ) : (
                <p>Loading video...</p>
            )}
        </div>
    );
};

export default StreamLecture;
