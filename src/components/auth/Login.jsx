import React, { useState } from 'react'
import { loginUser } from "../../services/authService"
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom"
import authFormImage from "./authFormImage.jpg"

const Login = () => {

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

    const auth = useAuth()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e) =>{
        e.preventDefault()
        const loginSuccess = await loginUser(login)
        if(loginSuccess){
            const token = loginSuccess.token
            auth.login(token)
            navigate("/")
        }else{
            setErrorMessage("Invalid username or password. Please try again.")
        }
        setTimeout(()=>{
            setErrorMessage("")
        }, 3000)
    }

    return (
       
        <div className="container my-5 auth">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <img src={authFormImage} className="card-img" alt="..." style={{ height: "260px" }} />
                        <div className="card-body">
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={login.email}
                                        onChange={handleInputChange}
                                        name="email"
                                        id="email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={login.password}
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
    )
}

export default Login