import React, { useState } from 'react'
import { registerUser } from "../../services/authService";
import authFormImage from "./authFormImage.jpg"

const Registration = () => {

    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password:""
    });

    const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

    const handleInputChange = async (e) => {
        const {name, value} = e.target;
        setRegistration({...registration, [name]: value})
    }

    const handleRegistration = async (e) => {
        e.preventDefault()
        try{
        
            const result = await registerUser(registration)
            setSuccessMessage("Registartion successful")
            setErrorMessage("")
            setRegistration({ firstName: "", lastName: "", email: "", password: "" })
        }catch(error){

            setSuccessMessage("");
            setErrorMessage(`${error.message}`)
        }
        setTimeout(() =>{
            setErrorMessage("")
            setSuccessMessage("")
        },7000)
    }

    return (
        <>
        
        <div className="container my-5 auth">
            <div className="row justify-content-center">
                <div className="col-md-5">
                <div className="card">
                    <img src={authFormImage} className="card-img" alt="..." style={{ height: "260px" }} />
                    <div className="card-body">
                    <form onSubmit={handleRegistration} className="auth-form">
                        <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={registration.firstName}
                            onChange={handleInputChange}
                            name="firstName"
                            id="firstName"
                            aria-describedby="nameHelp"
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={registration.lastName}
                            onChange={handleInputChange}
                            name="lastName"
                            id="lastName"
                            aria-describedby="nameHelp"
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            value={registration.email}
                            onChange={handleInputChange}
                            name="email"
                            id="email"
                            aria-describedby="emailHelp"
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            value={registration.password}
                            onChange={handleInputChange}
                            name="password"
                            id="password"
                        />
                        </div>

                        <button type="submit" className="btn btn-primary auth-button w-100 my-3">
                            Submit
                        </button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Registration