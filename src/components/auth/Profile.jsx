import React, { useEffect, useState } from 'react'
import { useAuth } from "./AuthProvider"
import { getUserProfile, updateProfile } from "../../services/authService"

const Profile = () => {

    const [user, setUser] = useState()
	const [profilePicture, setProfilePicture] = useState({
		photo: null
	})
	const [imagePreview, setImagePreview] = useState("")
    const userId = localStorage.getItem('userId')

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

    return (
		<div className="container my-5">
			<div className="main-body">
				{user ? ( // Conditionally render only when user data is available
					<>
						<div className="row gutters-sm">
							<div className="col-md-4 mb-3">
								<div className="card">
									<div className="card-body">
										<div className="d-flex flex-column align-items-center text-center">
											<img className="profile-pic" src={`data:image/png;base64, ${user.profilePicture}`} style={{ height: "200px", width: "200px", borderRadius: "50%" }} alt="profile" />
											<div className="mt-3">
												<h4>{user.firstName}</h4>
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
												<h6 className="mb-0">First Name</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{user.firstName}
											</div>
										</div>
										<br />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Last Name</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{user.lastName}
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
											<button type="submit" className="btn btn-primary auth-button w-50 my-3">
												Update
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<p>Loading user data...</p> // Optional: Display a loading message
				)}
			</div>
		</div>
	);	
}

export default Profile