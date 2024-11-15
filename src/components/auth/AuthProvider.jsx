import React, {createContext, useState, useContext} from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

    const login = (id, email, name, token) => {
        setIsAuthenticated(true)
        localStorage.setItem('userId', id)
        localStorage.setItem('email', email)
        localStorage.setItem('username', name)
        localStorage.setItem("token", token)
    }

    const logout = () =>{
        setIsAuthenticated(false)
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem('username')
        localStorage.removeItem("userId")
        localStorage.removeItem('isReviewAdded')
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () =>{
    return useContext(AuthContext)
}