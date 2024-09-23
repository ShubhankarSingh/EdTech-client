import React, { useEffect, useState } from 'react'
import { addCourse, getAllCategories } from "../../services/courseService";
import {useNavigate} from 'react-router-dom'

const AddCourse = () => {

    const user = localStorage.getItem('userId') 
    
    const [course, setCourse] = useState({
        author: user, title: "",
        description: "", shortDescription: "",
        language: "", createdDate: "",
        category: {id: "", categoryType: ""},
        thumbnail: null,
    })

    const navigate = useNavigate()
    
   

    const [categories, setCategories] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    useEffect(()=>{
        getAllCategories().then((data)=>{
            setCategories(data);
        })
    },[])

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setCourse({...course, [name]:value})
    }

    const handleCategoryChange = (e) =>{
        const selectedCategory = categories.find(category => category.categoryType == e.target.value)
        setCourse({...course, category: selectedCategory})
    }

    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setCourse({...course, thumbnail: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await addCourse(course.author, course.title, course.description, course.shortDescription,
                                            course.language, course.category, course.createdDate, course.thumbnail)
            
            
            if(response.status === 200){
                const savedCourse = response.data
                const formmatedTitle = savedCourse.title.replace(/\s/g, '-').replace(/-+/g, '-').toLowerCase()
                navigate(`/course/${savedCourse.id}/${formmatedTitle}/add-lecture`)
            }

            setSuccessMessage("Course added successfully")
            setErrorMessage("")
            setCourse({author: "", title: "", description: "", shortDescription: "",
            language: "", createdDate: "", category: {id: "", categoryType: ""}})

        }catch(error){
            setSuccessMessage("")
            setErrorMessage(`Failed to add course ${error.message}`)
        }
        setTimeout(()=>{
            setErrorMessage("")
            setSuccessMessage("")
        },5000)
    }

    return (
    <div className="container my-5">
    {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
    {successMessage && <p className="alert alert-success">{successMessage}</p>}

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
                        <label htmlFor="author" className="form-label">Author</label>
                        <input id="author" name="author" type="text" className="form-control" value={course.author} onChange={handleInputChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-select" name="category" id="category" value={course.category.categoryType} onChange={handleCategoryChange}>
                            {categories.map((category) => (
                                <option key={category.id} value={category.categoryType}>{category.categoryType}</option>
                            ))}
                        </select>
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

                    <div className="mb-3">
                        <label htmlFor="createdDate" className="form-label">Date</label>
                        <input id="createdDate" name="createdDate" type="date" className="form-control" value={course.createdDate} onChange={handleInputChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
                        <input id="thumbnail" name="thumbnail" type="file" className="form-control" onChange={handleImageChange} />
                        {imagePreview && <img src={imagePreview} alt="Thumbnail" style={{ maxWidth: "100%", marginTop: "10px" }} />}
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary w-100 mt-3">Add Course</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

    )
}

export default AddCourse