import React from 'react'
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom"

const Logout = () => {

    const auth = useAuth()
    const navigate = useNavigate()


    const handleLogout = () =>{
        auth.logout()
        navigate("/")
    }

    return (
        <div>

            

        </div>
    )
}

export default Logout