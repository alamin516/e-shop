import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useTitle from '../../../hooks/useTitle';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);


const Payment = () => {
    const order = useLoaderData();
    const {price, title} = order;
    useTitle('Payment')

    return (
        <div className='p-5'>
            <h2 className='text-2xl font-bold'>Your Payment Details:</h2>
            <h3 className='text-xl my-3'>You have to pay <strong>${price}</strong> for <strong>{title}</strong></h3>
            <Elements className="mt-5" stripe={stripePromise}>
                    <CheckoutForm 
                    order={order}
                    />
                </Elements>
        </div>
    );
};

export default Payment;