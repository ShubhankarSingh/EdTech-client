import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:8080/"
})


export async function getAllCategories(){
    try{
        const response = await api.get("/categories/all")
        return response.data
    }catch(error){
        throw new Error("Error fetching categories")
    }
}

export async function addCourse(author, title, description, shortDescription, language, category, createdDate){
    
    const data = {
        author: author,
        title: title,
        description: description,
        shortDescription: shortDescription,
        language: language,
        createdDate: createdDate,
        id: category.id
    }

    try{
        console.log("Inside add course")
        const response = await api.post("/courses/add-course", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log("Saved course data: " + response.data)
        return response
    }catch(error){
        console.log(`Error adding course ${error.message}`)
        return [];
    }
}

export async function addLecture(video, courseId){


    const formData = new FormData()
    formData.append('title', video.title)
    formData.append('url', video.url)

    try{
        const response = await api.post(`/courses/${courseId}/add-lecture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (response.status === 200) {
            alert("Video added successfully")
        }
        return response.status
    }catch(error){
        console.log(`Error adding lecture ${error.message}`)
    }
}