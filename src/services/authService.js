import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:8080/api/auth"
})


/* This function register a new user */
export async function registerUser(registration) {
    try{
        const response = await api.post("/register", registration)
        return response.data
    }catch(error){
        throw new Error(`User registration error: ${error.message}`);
    }
}