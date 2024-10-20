import React, { useEffect, useState } from 'react'
import { fetchEnrolledCourses } from "../../../services/courseService"
import { useNavigate } from "react-router-dom"

const EnrolledCourses = () => {

    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [enrolledCourses, setEnrolledCourses] = useState([])
    
    const fetchUserEnrolledCourses = async (userId) => {
        const response = await fetchEnrolledCourses(userId)
        console.log(response.data)
        setEnrolledCourses(response.data)
    }

    useEffect(()=>{
        fetchUserEnrolledCourses(userId)
    },[userId])

    const handleClick = (title, id) => {
		const formmatedTitle = title.replace(/\s/g, '-').replace(/-+/g, '-').toLowerCase()
		navigate(`/course/${formmatedTitle}`, {state : {courseId: id}})
	}

    return (
        <div className="container my-5">
			<div className="main-body">
				
				<div className="row justify-content-center">
					<div className="col-md-10">
						<h4>My Learning</h4>
						<div className="row mt-2">
							{enrolledCourses.map((data, index) => (
								<div className="col-md-4 mb-3" key={data.course.courseId}>
									<div className="card" style={{width: "100%", height: "100%", padding: 0}}>
										<a className="d-flex flex-column align-items-center text-center" onClick={() => handleClick(data.course.title, data.course.courseId)}>
											<img className="card-img-top" src={`data:image/png;base64, ${data.course.thumbnail}`} style={{ height: "200px", width: "100%" }} alt="course thumbnail" />
										</a>
										<div className="card-body">
											<div className="card-text">
												<h6>{data.course.title}</h6>
												{/* <h6>{data.courses.author.name}</h6> */}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

			</div>
		</div>
    )
}

export default EnrolledCourses