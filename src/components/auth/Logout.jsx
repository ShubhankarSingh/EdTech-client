import React from 'react'
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom"

const Logout = () => {

    const auth = useAuth()
    const navigate = useNavigate()


    const handleLogout = () =>{
        auth.logout()
        navigate("/courses/music")
    }

    return (
        <>
            <li className="nav-item">
                <button className="nav-link text-light" onClick={handleLogout}>Logout</button>
            </li>
        </>
    )
}

export default Logout