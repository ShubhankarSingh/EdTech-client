import React, { useState } from 'react'
import { loginUser } from "../../services/authService"
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom"

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

    const handleLogin = async (e) =>{
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
        <div>

<h1>Registration Form</h1>
            <form onSubmit={handleLogin}>

                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="email"
                            name="email"
                            type="text"
                            className="form-control"
                            value={login.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="password"
                            name="password"
                            type="text"
                            className="form-control"
                            value={login.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <button type="sumbit">Login</button>
                </div>
            </form>


        </div>
    )
}

export default Login