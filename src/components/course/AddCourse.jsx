import React, { useState } from 'react'

const AddCourse = () => {

    const [course, setCourse] = useState({
        author: "", title: "",
        description: "", shortDescription: "",
        language: "", createdDate: "",
        catgeoryId: ""
    })

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    
    return (
        <div>
            <h1>Add Course</h1>
            <form onSubmit={handleFormSubmit}>

                <div className="mb-3 row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">
                        Title
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="form-control"
                            value={course.title}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="description" className="col-sm-2 col-form-label">
                        Description
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="description"
                            name="description"
                            type="text-area"
                            className="form-control"
                            value={course.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="shortDescription" className="col-sm-2 col-form-label">
                        Short Description
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="shortDescription"
                            name="shortDescription"
                            type="text"
                            className="form-control"
                            value={course.shortDescription}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="author" className="col-sm-2 col-form-label">
                        Author
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="author"
                            name="author"
                            type="text"
                            className="form-control"
                            value={course.author}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="createdDate" className="col-sm-2 col-form-label">
                        Created Date
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="createdDate"
                            name="createdDate"
                            type="text"
                            className="form-control"
                            value={course.createdDate}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="language" className="col-sm-2 col-form-label">
                        Language
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="language"
                            name="language"
                            type="text"
                            className="form-control"
                            value={course.language}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <button type="sumbit">Add Course</button>
                </div>
            </form>

        </div>
    )
}

export default AddCourse