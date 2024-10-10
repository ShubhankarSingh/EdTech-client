import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:8080/"
})


export async function getAllCategories(){
    try{
        const response = await api.get("/categories/all")
        return response.data
    }catch(error){
        throw new Error(`Error fetching categories: ${error.message}`)
    }
}


export async function addCourse(author, title, description, shortDescription, originalPrice, 
                                offerPrice, language, category, createdDate, thumbnail) {

    const formData = new FormData();
    formData.append('userId', author);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('shortDescription', shortDescription);
    formData.append('originalPrice', originalPrice)
    formData.append('offerPrice', offerPrice)
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
        return response;
    } catch (error) {
        console.log(`Error adding course: ${error.message}`);
        return [];
    }
}

export async function updateCourse(course, courseId) {
    // const formData = new FormData();
    
    // formData.append('userId', author);
    // formData.append('title', title);
    // formData.append('description', description);
    // formData.append('shortDescription', shortDescription);
    // formData.append('language', language);
    // formData.append('createdDate', createdDate);
    // formData.append('id', category.id); 
    
    // // Append the thumbnail file
    // formData.append('thumbnail', thumbnail);

    try {
        
        const response = await api.put(`/courses/update/${courseId}`, course, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response;
    } catch (error) {
        console.log(`Error updating course: ${error.message}`);
        return [];
    }
}


export async function getCourseById(id) {
    
    try{
        const response = await api.get(`/courses/course/${id}`)
        return response
    }catch(error){
        console.log(`Error fetching course: ${error.message}`)
    }

}

export async function getAllCoursesByCategory(category) {
    try{
       
        const response = await api.get(`/courses/${category}`)
        return response
    }catch(error){
        console.log(`Error fetching course: ${error.message}`)
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
        console.log(`Error adding lecture: ${error.message}`)
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

export async function updateLecture(courseId, videoId, video){


    const formData = new FormData()
    formData.append('title', video.title)
    formData.append('url', video.url)

    try{
        const response = await api.put(`/courses/${courseId}/update-lecture/${videoId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (response.status === 200) {
            alert("Lecture updated successfully")
        }
        return response
    }catch(error){
        console.log(`Error updating lecture: ${error.message}`)
    }
}

export async function deleteLecture(courseId, videoId) {

    try{
        const response = await api.delete(`/courses/${courseId}/delete-lecture/${videoId}`)
        return response
    }catch(error){
        console.log(`Error deleting lecture: ${error.message}`);
    }
    
}

//API for Reviews
export async function addReview(review) {

    try{
        const response = await api.post("/reviews/add-review", review, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }catch (error) {
        console.log(`Error adding review: ${error.message}`);
    }
    
}

export async function  getAllReviews(courseId) {

    try{
        const response = await api.get(`/reviews/${courseId}`)
        return response;
    }catch(error){
        console.log(`Error fetching reviews: ${error.message}`);
    }
    
}

export async function deleteReview(reviewId) {

    try{
        const response = await api.delete(`/reviews/delete/${reviewId}`)
        return response
    }catch(error){
        console.log(`Error deleting review: ${error.message}`);
    }
    
}