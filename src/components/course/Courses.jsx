import React, { useEffect, useState } from 'react'
import { getAllCoursesByCategory } from "../../services/courseService"
import { useParams } from "react-router-dom"

const Courses = () => {

  const [courses, setCourses] = useState([])

  const {category} = useParams()

  const fetchCourses = async (category) =>{
    try{
      const response = await getAllCoursesByCategory(category)

      setCourses(response.data)
    }catch(error){
      console.log("Error fetching courses")
    }
  }

  useEffect(()=>{

   fetchCourses(category)

  },[category])


  console.log(courses)

  return (
    <div>

      {courses && courses.map((course)=>(
          <p key={course.id}>Title: {course.title}</p>
      ))}

    </div>
  )
}

export default Courses