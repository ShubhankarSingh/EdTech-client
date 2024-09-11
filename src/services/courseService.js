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
        return response.status === 200
    }catch(error){
        console.log(`Error adding course ${error.message}`)
        return [];
    }
}