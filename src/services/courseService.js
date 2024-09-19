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


export async function addCourse(author, title, description, shortDescription, language, category, createdDate, thumbnail) {
    const formData = new FormData();
    
    formData.append('author', author);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('shortDescription', shortDescription);
    formData.append('language', language);
    formData.append('createdDate', createdDate);
    formData.append('id', category.id); 
    
    // Append the thumbnail file
    formData.append('thumbnail', thumbnail);

    try {
        
        const response = await api.post("/courses/add-course", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("Saved course data: " + response.data);
        return response;
    } catch (error) {
        console.log(`Error adding course ${error.message}`);
        return [];
    }
}


// export async function getCourse(courseId) {
    
//     try{
//         console.log("Inside Get a single course")
//         const response = await api.get(`/courses/course/${courseId}`)

//         return response
//     }catch(error){
//         console.log(`Error fetching course ${error.message}`)
//     }
// }

export async function getCourse(title) {
    
    try{
      
        const response = await api.get(`/courses/course/${title}`)

        return response
    }catch(error){
        console.log(`Error fetching course ${error.message}`)
    }

}

export async function getAllCoursesByCategory(category) {
    try{
       
        const response = await api.get(`/courses/${category}`)

        return response
    }catch(error){
        console.log(`Error fetching course ${error.message}`)
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


export async function getAllLectures(courseId) {

    try{
        console.log("Inside get all lectures")

        const response = await api.get(`/courses/${courseId}/all-lectures`)
        return response
    }catch(error){
        console.log(`Error fetching lectures: ${error.message}`)
    }
    
}