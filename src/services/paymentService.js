import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api/payment/"
})

export async function createPaymentIntent(courseId, email, amount) {

    try{
        const response = await api.post("payment-intent", {
            courseId: courseId,
            userEmail: email,
            amount: amount
        });
        return response
    }catch(error){
        console.error('Error creating payment intent:', error);
    }
}