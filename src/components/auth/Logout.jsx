import React from 'react'
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom"
import Profile from "./Profile"

const Logout = () => {

    const auth = useAuth()
    const navigate = useNavigate()


    const handleLogout = () =>{
        auth.logout()
        navigate("/courses/music")
    }

    const loadUserProfile = () =>{
        navigate("/user/profile")
    }

    return (
        <>
            <li className="nav-item">
                <button className="nav-link text-light fs-5" onClick={loadUserProfile}>Profile</button>
            </li>
            <li className="nav-item">
                <button className="nav-link text-light fs-5" onClick={handleLogout}>Logout</button>
            </li>
        </>
    )
}

export default Logout