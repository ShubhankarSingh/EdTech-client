import React, { useEffect, useState } from 'react'
import { getAllCoursesByCategory } from "../../services/courseService"
import { useParams } from "react-router-dom"
import CourseDetail from "./CourseDetail"
import {gql, useQuery} from "@apollo/client"

// // Graphql qeury
// const GET_COURSES_BY_CATEGORY = gql`
//     query GetCoursesByCategory($category: String!){
//         getAllCoursesByCategory(category: $category){
//         id
//         title
//         shortDescription
//         originalPrice
//         offerPrice
//         category {
//             id
//         }
//         author {                # Subselection for the 'author' field
//             id
//             name
//             email
//         }
//         }
//     }`;

const Courses = () => {

  const [courses, setCourses] = useState([])

  const {category} = useParams()

  console.log("Category:" + category)

  // const {loading, error, data} = useQuery(GET_COURSES_BY_CATEGORY, {
  //   variables: {category},
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error fetching courses: {error.message}</p>;

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

  return (

    <div className='row my-3'>
      <div className="h1 text-center" id="pageHeaderTitle" style={{color: 'white'}}> {category}</div>        
      {courses && courses.map((course, index)=>(          
          <CourseDetail key={index} course={course}/>
      ))}
    </div>
  
  )
}

export default Courses