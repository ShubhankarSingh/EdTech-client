import React, { useEffect, useState } from 'react'
import { deleteReview, getAllReviews } from "../../services/courseService"
import { useReview } from "./CourseContext"

const Reviews = ({reviews}) => {
    const reviewCheck = useReview()

    let totalStars = 0
    let totalRating
    if(reviews){
        reviews.map((review)=>{
            totalStars += parseInt(review.rating)
        })

        let totalRatingFloor = Math.floor(totalStars/reviews.length)
        let decimalPortion = totalStars/reviews.length - totalRatingFloor
        totalRating = totalRatingFloor + Math.ceil(decimalPortion * 10)/10
    }

    const handleDeleteReview = async (reviewId) => {
    try {
        const response = await deleteReview(reviewId);
        if (response.status === 200) {
            reviewCheck.removeReviewCheck()
            window.location.reload()
            alert("Review deleted successfully")
        }
    } catch (error) {
        console.error("Error deleting review:", error);
    }
};

    return (
        <>
            {reviews.length === 0 ? ("") : (   
                <div className="row mt-3 mb-3">
                    <div className="col-md-12">
                        <div className="d-flex align-items-center gap-2">
                            <h4 className="m-0">
                                <i className="bi bi-star-fill" style={{ color: "#f5c518" }}></i> {totalRating} course rating |
                            </h4>
                            <h4 className="m-0">{reviews.length} ratings</h4>
                        </div>
                    </div>
                </div>
            )}
            {reviews && reviews.map(review => (
                <div key={review.id} className="card bg-dark text-light p-3 mb-3 mx-3 shadow-sm" style={{maxWidth: "500px", borderRadius: "8px"}}>
                    <div className="d-flex align-items-center mb-3">
                        
                        <div className="user-avatar bg-secondary d-flex justify-content-center align-items-center rounded-circle text-white me-3" style={{width: "40px", height: "40px"}}>
                            {/* Display initials of the username */}
                            {review.username.split(' ').map(name => name[0]).join('')}
                        </div>
                    
                        <div>
                            <h6 className="m-0">{review.username}</h6>
                            
                            {/* Flexbox to align stars and timestamp */}
                            <div className="d-flex align-items-center text-muted" style={{ gap: '8px' }}>
                                <small>{review.timestamp}</small>
                                
                                <div className="text-warning d-flex">
                                    {/* Loop to display filled stars */}
                                    {[...Array(parseInt(review.rating))].map((_, i) => (
                                        <i key={i} className="bi bi-star-fill"></i>
                                    ))}
                                    {/* Loop to display unfilled stars (if rating is less than 5) */}
                                    {[...Array(5 - parseInt(review.rating))].map((_, i) => (
                                        <i key={i} className="bi bi-star"></i>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="ms-auto">
                            {review.userId === parseInt(localStorage.getItem('userId')) && 
                                <div>
                                    <button className="btn" style={{ padding: '0', marginLeft: '10px' }} onClick={() => handleDeleteReview(review.id)}>
                                        <i className="bi bi-trash3-fill" style={{ color: "red" }}></i>
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
            
                    <p className="mb-0">{review.description}</p>
                </div>
            ))}
        </>
    );
    
}

export default Reviews