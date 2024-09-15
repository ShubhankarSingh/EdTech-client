import React, { useEffect, useState } from 'react'
import { getAllLectures } from "../../services/courseService"

const Lectures = () => {

    const [lectures, setLectures] = useState()

    useEffect(()=>{
        
        getAllLectures(courseId).then(()=>{
            setLectures(data)
        })

    },[courseId])

    return (
        <div>

        lectures.map((lecture)=> (
            <h3 key={lecture.id}>{lecture.title}</h3>

            <video width={750} height={400}>
                <source src={lecture.url} type="video/mp4"/>
            </video>
        ))

            

        </div>
    )
}

export default Lectures