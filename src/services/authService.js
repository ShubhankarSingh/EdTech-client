import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:8080/api/"
})


/* This function register a new user */
export async function registerUser(registration) {
    try{
        const response = await api.post("auth/register", registration)
        return response
    }catch(error){
        throw new Error(`User registration error: ${error.message}`);
    }
}

/* This function register a new user */
export async function loginUser(login) {
    try{
        const response = await api.post("auth/login", login)
        return response
    }catch(error){
        console.log(error.message)
        return error
    }
}

export async function getUserProfile(userId) {

    try{
        const response = await api.get(`/users/user/${userId}`);
        console.log("User Data: " + JSON.stringify(response.data))
        return response
    }catch(error){
        console.log(error.message)
        return error
    }
}

export async function updateProfile(photo, userId) {

    const formData = new FormData()
    formData.append('profilePicture', photo)

    try{
        console.log("Inside update user profile")
        const response = await api.put(`/users/${userId}/update-profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        console.log("Response:" + response)
        return response
    }catch(error){
        console.log(error.message)
        return error
    }
    
}