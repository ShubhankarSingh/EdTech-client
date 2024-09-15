import React from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import StreamLecture from "./StreamLecture"

const CourseDescription = () => {

    const location = useLocation()

    const {course} = location.state || {}
    const navigate = useNavigate()
    

    const handleVideoView = (video, videoTitle) => {
        navigate(`/course/${course.title}/${videoTitle}`, {state: {video: video}})
    }
    
    return (
        <div>
        {course && (
        <div className="my-5">
        <div className="row">
            {/* <div className="col-6">
                <img src={imageSrc} alt={productDetails.name} style={{ width: "100%", height: "500px"}} />
            </div> */}
            <div className="col-5"> 
                <p style={{ fontSize: '28px', fontWeight: 'normal', textAlign: 'left' }}>{course.title}</p>
                <hr></hr>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginRight: '10px', fontSize: '15px' }}>{course.author}</p>
                    <p style={{ fontSize: '22px', textAlign: 'left', fontWeight: 'bold' }}>{course.description}</p>
                    <p style={{ fontSize: '22px', textAlign: 'left', fontWeight: 'bold' }}>{course.language}</p>
                </div>
            </div>
            {course.videos && course.videos.map((video) => (
                
                <div>
                    <h3>{video.title}</h3>
                    <a onClick={() => handleVideoView(video, video.title)}>Watch Lecture</a>
                </div>
            )
            )}
        </div>
        </div>
        )}
    </div>
    )
}

export default CourseDescription