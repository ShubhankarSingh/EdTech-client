import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPaymentIntent } from '../../services/paymentService';
import { enrollCourse } from '../../services/courseService';

// Load the Stripe instance with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CoursePaymentForm = ({ clientSecret, courseId, email, userId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePayment = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            console.error("Stripe or Elements not loaded.");
            setLoading(false);
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardNumberElement,
                billing_details: { email },
            },
        });

        if (error) {
            console.error("Payment failed:", error.message);
            setLoading(false);
        } else if (paymentIntent.status === 'succeeded') {
            console.log("Payment successful!");
            
            const response = await enrollCourse(userId, courseId);
            if (response.status === 200) {
                alert("Payment successful!");
                navigate('/my-courses'); // Navigate to a success page or courses page
            }
        }

        setLoading(false);
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card" style={{ width: '22rem' }}>
                <div className="card-body">
                    <h5 className="card-title text-center">Course Payment</h5>
                    <form onSubmit={handlePayment}>
                        <div className="mb-3">
                            <label className="form-label">Card Number</label>
                            <CardNumberElement options={{ style: { base: { fontSize: '16px', width: '100%' } } }} className="form-control" />
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <div style={{ width: '48%' }}>
                                <label className="form-label">Expiration Date</label>
                                <CardExpiryElement options={{ style: { base: { fontSize: '16px' } } }} className="form-control" />
                            </div>
                            <div style={{ width: '48%' }}>
                                <label className="form-label">CVC</label>
                                <CardCvcElement options={{ style: { base: { fontSize: '16px' } } }} className="form-control" />
                            </div>
                        </div>
                        <button type="submit" disabled={!stripe || loading} className="btn btn-primary w-100">
                            {loading ? "Processing..." : "Pay"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const CoursePayment = () => {
    const location = useLocation();
    const { courseId, email, amount } = location.state || {};
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        const initiatePayment = async () => {
            try {
                const response = await createPaymentIntent(courseId, email, amount);
                if (response.status === 200) {
                    setClientSecret(response.data); // Set client secret to handle payment
                }
            } catch (error) {
                console.log("Error creating payment intent:", error);
            }
        };

        initiatePayment();
    }, [courseId, email, amount]);

    const userId = localStorage.getItem('userId');

    return (
        <div>
            {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CoursePaymentForm clientSecret={clientSecret} courseId={courseId} email={email} userId={userId} />
                </Elements>
            ) : (
            <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh", paddingTop: "100px" }}>
                <div className="text-center">
                    <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
                    </div>
                    <p className="mt-3 text-center">Loading Payment Details...</p>
                </div>
            </div>
        )}
        </div>
    );
};

export default CoursePayment;
