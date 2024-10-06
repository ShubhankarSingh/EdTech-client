import React, { createContext, useContext, useState, useEffect } from "react";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const [isReviewAdded, setIsReviewAdded] = useState(
        localStorage.getItem('isReviewAdded') === 'true' // Parse 'true' string to boolean
        );

    const addReviewCheck = () => {
        setIsReviewAdded(true);
        localStorage.setItem('isReviewAdded', 'true');
    };

    const removeReviewCheck = () => {
        setIsReviewAdded(false);
        localStorage.setItem('isReviewAdded', 'false');
    };

  return (
    <ReviewContext.Provider value={{ isReviewAdded, addReviewCheck, removeReviewCheck }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  return useContext(ReviewContext);
};
