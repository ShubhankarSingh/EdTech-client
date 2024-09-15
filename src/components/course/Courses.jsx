import React, { useEffect, useState } from 'react'
import { getAllCoursesByCategory } from "../../services/courseService"
import { useParams } from "react-router-dom"
import CourseDetail from "./CourseDetail"

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

    <div className='row my-3'>        
      {courses && courses.map((course, index)=>(          
          <CourseDetail key={index} course={course}/>
      ))}
    </div>
  
  )
}

export default Courses