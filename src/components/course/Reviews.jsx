import React, { useEffect, useState } from 'react'
import { getAllReviews } from "../../services/courseService"

const Reviews = ({reviews}) => {

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

    return (
            <>
            {reviews &&  
            <>  
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
            </>
            }
            {reviews && reviews.map(review => (
                <>
            <div className="card bg-dark text-light p-4 mb-3 mx-3 shadow-sm" style={{maxWidth: "500px", borderRadius: "8px"}}>
                <div className="d-flex align-items-center mb-3">
                    
                    <div className="user-avatar bg-secondary d-flex justify-content-center align-items-center rounded-circle text-white me-3" style={{width: "40px", height: "40px"}}>
                        RA
                    </div>
                
                    <div>
                        <h6 className="m-0">{review.username}</h6>
                        <small className="text-muted">{review.timestamp}</small>
                    </div>
                
                
                    <div className="ms-auto text-warning">
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
        
                <p className="mb-0">{review.description}</p>
            </div>
            </>
            ))}
        </>
    )
}

export default Reviews