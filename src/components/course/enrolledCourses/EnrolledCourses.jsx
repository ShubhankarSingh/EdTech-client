import React, { useEffect, useState } from 'react'
import { fetchEnrolledCourses } from "../../../services/courseService"
import { useNavigate } from "react-router-dom"
import image from "./empty-cart.jpg"

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

	const homePage = () => {
		navigate("/")
	}

    return (
		<div className="container my-5">
			<div className="main-body">
				
				<div className="row justify-content-center">
					<div className="col-md-9">
						<h4 style={{color: "white", fontWeight: "bold"}}>My Learning</h4>
						<div className="row mt-3" style={{ border: '1px solid rgba(255, 255, 255, 0.1)', padding: '10px'}}>
							{enrolledCourses.length > 0 ? (
								enrolledCourses.map((data, index) => (
									<div className="col-md-4 mb-3" key={data.course.courseId}>
										<div className="card" style={{width: "250px", height: "100%", padding: 0, borderRadius: 0, border: 0}}>
											<a className="d-flex flex-column align-items-center text-center" onClick={() => handleClick(data.course.title, data.course.courseId)}>
												<img className="card-img-top" src={`data:image/png;base64, ${data.course.thumbnail}`} style={{ height: "160px", width: "100%", borderRadius: 0 }} alt="course thumbnail" />
											</a>
											<div className="card-body">
												<div className="card-text">
													<p style={{fontSize: '16px', fontWeight: 'bold'}}>{data.course.title}</p>
													<p style={{fontSize: '12px', fontWeight: 'lighter'}}>{data.course.author.name}</p>
												</div>
											</div>
										</div>
									</div>
								))
							) : (
								<div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '400px', width: '100%' }}>
									<img src={image} style={{height: "200px", width: "250px"}} alt="No courses" />
									<p style={{fontSize: '18px', fontWeight: "lighter", margin: '15px'}}>
										You have not bought any course yet!
									</p>
									<button className="btn btn-primary w-30" style={{ borderRadius: '0', padding: '7px', margin: '0' }}
										onClick={()=> homePage()}>
										Explore Courses
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
	
			</div>
		</div>
	);
	
}

export default EnrolledCourses