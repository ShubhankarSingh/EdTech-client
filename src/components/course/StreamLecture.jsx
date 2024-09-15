import React from 'react'
import { useLocation } from "react-router-dom"

const StreamLecture = () => {

    const location = useLocation()

    const {video} = location.state || {}

    console.log(video)

    return (
        <div class="my-5">
            <h2>{video.title}</h2>
            <video name='demo' controls width='600px' height='300px'>
                <source src={`http://localhost:8080/${video.url}`} type="video/mp4"></source>
            </video>
        </div>
    )
}

export default StreamLecture