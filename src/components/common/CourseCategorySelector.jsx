import React, { useEffect, useState } from 'react'
import { getAllCategories } from "../../services/courseService";

const CourseCategorySelector = () => {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        getAllCategories().then((data)=>{
            setCategories(data);
        })
    })

    return (
        <div>

        </div>
    )
}

export default CourseCategorySelector