import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:8080/api/auth"
})


/* This function register a new user */
export async function registerUser(registration) {
    try{
        const response = await api.post("/register", registration)
        return response
    }catch(error){
        throw new Error(`User registration error: ${error.message}`);
    }
}

/* This function register a new user */
export async function loginUser(login) {
    try{
        const response = await api.post("/login", login)
        console.log(response)
        return response
    }catch(error){
        console.log(error.message)
        return error
    }
}