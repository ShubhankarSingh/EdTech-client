import React, { useEffect, useState } from 'react'
import { useAuth } from "./AuthProvider"
import { getUserProfile, updateProfile } from "../../services/authService"
import { useNavigate } from "react-router-dom"

const Profile = () => {

    const [user, setUser] = useState()
	const [profilePicture, setProfilePicture] = useState({
		photo: null
	})
	const [imagePreview, setImagePreview] = useState("")
    const userId = localStorage.getItem('userId')
	const navigate = useNavigate()

    const fetchUserProfile = async (userId) =>{
		const response = await getUserProfile(userId)
		setUser(response.data)
    }

    useEffect(()=>{
      
      fetchUserProfile(userId)

    },[userId])

	
	const handleImageChange = (e) =>{
		const selectedImage = e.target.files[0]
		setProfilePicture({...profilePicture, photo:selectedImage})
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleSubmit = async (e) =>{
		e.preventDefault()

		try{
			const response = await updateProfile(profilePicture.photo, userId)
			window.location.reload();
			
		}catch(error){
			console.log(error)
		}

	}

	const handleClick = (title, id) => {
		const formmatedTitle = title.replace(/\s/g, '-').replace(/-+/g, '-').toLowerCase()
		navigate(`/course/${formmatedTitle}`, {state : {courseId: id}})
	}

	const handleCourseEdit = (title, id) => {
		const formmatedTitle = title.replace(/\s/g, '-').replace(/-+/g, '-').toLowerCase()
		navigate(`/course/edit/${id}/${formmatedTitle}/`)
	}

	if (!user) {
        return (
            <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh", paddingTop: "100px" }}>
                <div className="text-center">
                    <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
                        
                    </div>
                    <p className="mt-3 text-center">Loading...</p>
                </div>
            </div>
        );
    }

    return (
		<div className="container my-5">
			<div className="main-body">
				{user && ( // Conditionally render only when user data is available
					<>
						<div className="row gutters-sm">
							<div className="col-md-4 mb-3">
								<div className="card">
									<div className="card-body">
										<div className="d-flex flex-column align-items-center text-center">
											<img className="profile-pic" src={`data:image/png;base64, ${user.profilePicture}`} style={{ height: "200px", width: "200px", borderRadius: "50%" }} alt="profile" />
											<div className="mt-3">
												<h4>{user.name}</h4>
												<p className="text-muted font-size-sm">XYZ Street, Bangalore, Karnataka</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-8">
								<div className="card mb-3">
									<div className="card-body">
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Name</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{user.name}
											</div>
										</div>
										<br />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Email</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{user.email}
											</div>
										</div>
										<br />
	
										<form onSubmit={handleSubmit}>
											<label htmlFor="photo" className="col-sm-3 col-form-label">
												Profile Picture
											</label>
											<div className="col-sm-6">
												<input id="photo" name="photo" type="file" className="form-control" onChange={handleImageChange} />
											</div>
											{/* {imagePreview && <img src={imagePreview} alt="Thumbnail" style={{ maxWidth: "200px", maxHeight: "200px" }}></img>} */}
											<button type="submit" className="btn btn-primary auth-button w-50 my-3"
												style={{ borderRadius: '0', padding: '7px', margin: '0' }}>
												Update
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</>
				)}

				{user && user.courses && (user.courses.map(course =>(
					<div className="row">
						<div className="col-md-4 mb-3">
							<br />
							<h3>My Courses</h3>
							<div className="card">
								<div className="card-body">
									<a className="d-flex flex-column align-items-center text-center" onClick={() => handleClick(course.title, course.courseId)}>
										<img className="profile-pic" src={`data:image/png;base64, ${course.thumbnail}`} style={{ height: "200px", width: "350px" }} alt="profile" />
										<div className="mt-3">
											<h4>{course.title}</h4>
										</div>
									</a>
									<button className="btn btn-primary mt-1" style={{ borderRadius: '0', padding: '8px'}}
									onClick={() => handleCourseEdit(course.title, course.courseId)}>Edit Course</button>
								</div>
							</div>
						</div>
					</div>
				)))}
			</div>
		</div>
	);	
}

export default Profile