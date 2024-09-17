import React, { useEffect, useState } from 'react'
import { addCourse, getAllCategories } from "../../services/courseService";
import {useNavigate} from 'react-router-dom'

const AddCourse = () => {

    const [course, setCourse] = useState({
        author: "", title: "",
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
                navigate(`/${savedCourse.id}/add-lecture`)
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
        <div>

            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {successMessage && <p className="alert alert-success">{successMessage}</p>}

            <h1>Add Course</h1>
            <form onSubmit={handleFormSubmit}>

                <div className="mb-3 row">
                    <label htmlFor="title" className="col-sm-3 col-form-label">
                        Title
                    </label>
                    <div className="col-sm-6">
                        <input id="title" name="title" type="text" className="form-control" value={course.title} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="author" className="col-sm-3 col-form-label">
                        Author
                    </label>
                    <div className="col-sm-6">
                        <input id="author" name="author" type="text" className="form-control" value={course.author} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="category" className="col-sm-3 col-form-label">
                        Category
                    </label>
                    <select className="form-select" name="category" id="category" aria-label="Default select example" value={course.category.categoryType} onChange={handleCategoryChange} >
                        {categories.map(category =>(
                            <option key={category.id} value={category.categoryType}>{category.categoryType}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="description" className="col-sm-3 col-form-label">
                        Description
                    </label>
                    <div className="col-sm-6">
                        <input id="description" name="description" type="text" className="form-control" value={course.description} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="shortDescription" className="col-sm-3 col-form-label">
                        Short Description
                    </label>
                    <div className="col-sm-6">
                        <input id="shortDescription" name="shortDescription" type="text" className="form-control" value={course.shortDescription} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="language" className="col-sm-3 col-form-label">
                        Language
                    </label>
                    <div className="col-sm-6">
                        <input id="language" name="language" type="text" className="form-control" value={course.language} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="createdDate" className="col-sm-3 col-form-label">
                        Date
                    </label>
                    <div className="col-sm-6">
                        <input id="createdDate" name="createdDate" type="date" className="form-control" value={course.createdDate} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="thumbnail" className="col-sm-3 col-form-label">
                        Thumbnail
                    </label>
                    <div className="col-sm-6">
                        <input id="thumbnail" name="thumbnail" type="file" className="form-control" onChange={handleImageChange}/>
                    </div>
                    {imagePreview && <img src={imagePreview} alt="Thumbnail" style={{ maxWidth: "400px", maxHeight: "400px" }}></img>}
                </div>


                <div>
                    <button type="submit">Add Course</button>
                </div>
            </form>

        </div>
    )
}

export default AddCourse