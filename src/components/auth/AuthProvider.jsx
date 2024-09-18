import React, {createContext, useState, useContext} from "react";

const AuthContext = useContext()

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(null)

    const login = (token) => {
        setToken(token)
        localStorage.setItem("token", token)
    }

    const logout = () =>{
        setToken(null);
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () =>{
    return useContext(AuthContext)
}