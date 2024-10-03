import React, { useEffect, useState } from 'react'
import { getAllReviews } from "../../services/courseService"

const Reviews = ({reviews}) => {

    console.log(reviews)

    // const [reviews, setReviews] = useState([])
    // const [errorMessage, setErrorMessage] = useState("");

    // const fetchReviews = async (courseId) => {

    //     try{
    //         const response = await getAllReviews(courseId)
    //         console.log(response.data)
    //     }catch(error){
    //         setErrorMessage(`Failed to fetch Reviews: ${error.message}`);
    //     }
    // }

    // useEffect(()=>{
    //     fetchReviews(courseId)
    // },[courseId])

    return (
            <>
        {reviews && reviews.map(review => (
            <>
        <div className="card bg-dark text-light p-3 mb-3 shadow-sm" style={{maxWidth: "500px", borderRadius: "8px"}}>
            <div className="d-flex align-items-center mb-3">
                
                <div className="user-avatar bg-secondary d-flex justify-content-center align-items-center rounded-circle text-white me-3" style={{width: "40px", height: "40px"}}>
                    RA
                </div>
               
                <div>
                    <h6 className="m-0">{review.username}</h6>
                    <small className="text-muted">{review.timestamp}</small>
                </div>
               
                <div className="ms-auto text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                </div>
            </div>
    
            <p className="mb-0">{review.description}</p>
        </div>
        </>
        ))}
        </>
    )
}

export default Reviews