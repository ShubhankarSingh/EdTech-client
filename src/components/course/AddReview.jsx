import React, { useState } from 'react'
import { useLocation } from "react-router-dom"
import { addReview } from "../../services/courseService"

const AddReview = () => {

    const userId = Number(localStorage.getItem('userId'))
    const username = localStorage.getItem('username')

    const location = useLocation()
    const {courseId} =  location.state || {}
    
    const getCurrentDate = () => {
        const date = new Date()
        const yyyy = date.getFullYear()
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const dd = String(date.getDate()).padStart(2, '0')
        return `${yyyy}-${mm}-${dd}`
    }

    const [review, SetReview] = useState({
        description: "",
        userId: userId,
        username: username,
        rating: "0",
        courseId: courseId,
        timestamp: getCurrentDate()
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    
    const handleInputChange = (e) => {
        SetReview({...review, [e.target.name]: e.target.value});
    };

    const handleRatingChange = (e) => {
        SetReview({ ...review, rating: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addReview(review); 
            console.log(response.data)
            if(response == 200) {
                window.location.reload()
                setSuccessMessage("Review added successfully!");
            }
        } catch (error) {
            setErrorMessage(`Failed to add Review: ${error.message}`);
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 5000);
    };

    return (
    <div className="row justify-content-center my-5">
        <div className="col-md-4">
            <div className="">
                <div className="p-3 mb-2  text-white text-center" style={{backgroundColor: "rgb(10, 7, 59)"}} >ADD A REVIEW</div>
                <form onSubmit={handleFormSubmit}>
                       
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea id="description" name="description" className="form-control" rows="3" value={review.description} onChange={handleInputChange}></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Rating</label>
                        <div className="star-rating">
                            {[...Array(5)].map((star, index)=>{
                                const ratingValue = index + 1
                                return (
                                    <label key={index}>
                                        <input type="radio"
                                            name="ratings"
                                            value={ratingValue}
                                            onClick={handleRatingChange}
                                            className="rating-input"
                                        />
                                        <span
                                            className={` mx-2 fa fa-star ${ratingValue <= review.rating ? 'checked' : ''}`}
                                        ></span>
                                    </label>
                                )
                            })}
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary w-100 mt-3" 
                            style={{ borderRadius: '0', padding: '10px', margin: '0' }}>
                            Add Review
                        </button>
                    </div>

                </form>
                {successMessage && <p>{successMessage}</p>}
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    </div>
    )
}

export default AddReview