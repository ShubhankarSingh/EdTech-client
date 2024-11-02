import React, { useEffect, useState } from 'react'
import {loadStripe} from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from "react-router-dom";
import { createPaymentIntent } from "../../services/paymentService";
import { enrollCourse } from "../../services/courseService";

// Load the Stripe instance with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CoursePayment = () => {
    
    const location = useLocation()
    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()
    const userId = localStorage.getItem('userId')

    const {courseId, email, amount} = location.state || {}
    const [clientSecret, setClientSecret] = useState(null)
    const [loading, setLoading] = useState(false);
    

    useEffect(()=>{

        const initiatePayment = async () => {
            try {
                const response = await createPaymentIntent(courseId, email, amount);
                if (response.status === 200) {
                    setClientSecret(response.data); // Set client secret to handle payment
                }
            } catch (error) {
                console.log("Error creating payment intent:", error);
            }
        }

        initiatePayment();
    }, [courseId, email, amount])

    const handlePayment = async (event) => {
        event.preventDefault();
        setLoading(true)

        if (!stripe || !elements) {
            console.error("Stripe or Elements not loaded.");
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        
        const {error, paymentIntent} = stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: cardElement,
                billing_details: {email},
            }
        })

        if (error) {
            console.error("Payment failed:", error.message);
            setLoading(false);
        } else if (paymentIntent.status === 'succeeded') {
            console.log("Payment successful!");

            const response = await enrollCourse(userId, courseId)
            if(response.status === 200){
                alert("Payment successful! Course Enrolled.");
            }
            
        }

        setLoading(false);
    } 
    
    return (
        <div>
            {clientSecret ? (
                <Elements stripe={stripePromise} options={{clientSecret}}>
                    <form onSubmit={handlePayment}>
                        <CardElement options={{hidePostalCode: true}}/>
                        <button type="submit" disable={!stripe || loading}>
                            {loading ? "Processing..." : "Pay"}
                        </button>
                    </form>

                </Elements>
            ):(
                <p>Loading payment details...</p>
            )}
        </div>
    )
}

export default CoursePayment