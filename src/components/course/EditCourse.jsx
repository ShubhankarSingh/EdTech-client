import React, {useEffect, useState} from 'react'
import { useLocation, useParams } from "react-router-dom"
import { getCourseById, updateCourse } from "../../services/courseService"

const EditCourse = () => {

    const {courseId} = useParams()
    const [course, setCourse] = useState({
        title: "",
        description: "", shortDescription: "",
        language: ""
    });
    const [imagePreview, setImagePreview] = useState("");

    useEffect(()=>{
        getCourseById(courseId).then((response)=>{
            setCourse(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[courseId])

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setCourse({...course, [name]:value})
    }

    // const handleImageChange = (e) =>{
    //     const selectedImage = e.target.files[0]
    //     setCourse({...course, thumbnail: selectedImage})
    //     setImagePreview(URL.createObjectURL(selectedImage))
    // }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await updateCourse(course, courseId)
            if(response.status === 200){
                const savedCourse = response.data
                console.log(response.data)
                const formmatedTitle = savedCourse.title.replace(/\s/g, '-').replace(/-+/g, '-').toLowerCase()
                navigate(`/course/${savedCourse.id}/${formmatedTitle}/add-lecture`)
            }
        }catch(error){
           console.log(error)
        }
    }

    return (
        <div className="container my-5">
    
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="">
                    <div className="p-3 mb-2  text-white text-center" style={{backgroundColor: "rgb(10, 7, 59)"}} >ADD A COURSE</div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input id="title" name="title" type="text" className="form-control" value={course.title} onChange={handleInputChange} />
                        </div>
    
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea id="description" name="description" className="form-control" rows="3" value={course.description} onChange={handleInputChange}></textarea>
                        </div>
    
                        <div className="mb-3">
                            <label htmlFor="shortDescription" className="form-label">Short Description</label>
                            <input id="shortDescription" name="shortDescription" type="text" className="form-control" value={course.shortDescription} onChange={handleInputChange} />
                        </div>
    
                        <div className="mb-3">
                            <label htmlFor="language" className="form-label">Language</label>
                            <input id="language" name="language" type="text" className="form-control" value={course.language} onChange={handleInputChange} />
                        </div>
    
                        {/* <div className="mb-3">
                            <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
                            <input id="thumbnail" name="thumbnail" type="file" className="form-control" onChange={handleImageChange} />
                            {imagePreview && <img src={imagePreview} alt="Thumbnail" style={{ maxWidth: "100%", marginTop: "10px" }} />}
                        </div> */}
    
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary w-100 mt-3" 
                                style={{ borderRadius: '0', padding: '10px', margin: '0' }}>
                                Update Course
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
        )
}

export default EditCourse