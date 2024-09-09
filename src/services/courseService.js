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

export async function addCourse(course){

    const formData = new FormData()
    formData.append("title", course.title)
    formData.append("author", course.author)
    formData.append("description", course.description)
    formData.append("shortDescription", course.shortDescription)
    formData.append("language", course.language)
    formData.append("createdDate", course.createdDate)
    formData.append("category", course.category.categoryId)

    console.log("Formdata: "+ formData)
    try{
        console.log("Inside add course")
        const response = await api.post("/courses/add-course", formData)
        return response.data
    }catch(error){
        console.log("Error fetching categories")
        return [];
    }
}