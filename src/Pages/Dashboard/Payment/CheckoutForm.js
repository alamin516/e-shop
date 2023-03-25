import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const CheckoutForm = ({ order }) => {
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe()
    const elements = useElements();
    const { email, price, _id, buyer } = order;


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://e-shop-self-sigma.vercel.app/create-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setCardError(error.message)
        }
        else {
            setCardError('')
        }

        setSuccess('')
        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyer,
                        email: email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message)
            return;
        }

        if (paymentIntent.status === 'succeeded') {

            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                orderId: _id
            }

            // Store payment data on your database
            fetch('https://e-shop-self-sigma.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('Congrats! your payment completed')
                        setTransactionId(`Your payment transaction Id: ${paymentIntent.id}`);
                        toast.success('Payment successfully done.')
                    }
                })

        }

        setProcessing(false)

    }


    return (
        <form className='w-96' onSubmit={handleSubmit}>
            <CardElement className='border p-4'
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm btn-primary text-white mt-4' type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay Now
            </button>
            <p className='text-red-600'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-600'>{success}</p>
                    <p>{transactionId}</p>
                </div>
            }
        </form>


    );
};

export default CheckoutForm;