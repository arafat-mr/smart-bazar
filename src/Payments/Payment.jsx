import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PK);
const Payment = () => {
    ;
    return (
        <Elements  stripe={stripePromise}>
<PaymentForm/>
        </Elements>
    );
};

export default Payment;