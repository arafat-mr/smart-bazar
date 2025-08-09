import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const [error, setError] = useState("");
  const { productId } = useParams();
  const location = useLocation();
  const { amount, vendorEmail, productImage, pricePerKg,productName,marketName,userEmail } = location.state || {};

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      // Step 1: Create payment method
      const { error: methodErr, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (methodErr) {
        setError(methodErr.message);
        return;
      } else {
        setError("");
      }

      // Step 2: Get client secret from backend
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount, // BDT = AED for testing
        vendorEmail,
        productImage,
      });

      const clientSecret = data.clientSecret;

      // Step 3: Confirm payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        setError(confirmError.message);
        return;
      }

      // Step 4: Payment succeeded, save record
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          amount,
          vendorEmail,
          productImage,
          productId,
          transactionId: paymentIntent.id,
          date: new Date(),
          status: "paid",
          pricePerKg,
          marketName,
          productName,
          userEmail
          
        };

        const res = await axiosSecure.post("/payments", paymentInfo);
        if (res.data.insertedId) {
          Swal.fire("Payment successful!", `Transaction ID: ${paymentIntent.id}`, "success");
         
        }
        
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
     navigate(`/allProductsApproved/${productId}`)
  };

  return (
    <div className="mt-10 mb-10 p-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gradient-to-b from-violet-300 to-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded bg-white" />
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-secondary w-full bg-transparent text-black hover:bg-gray-600 hover:text-white"
            disabled={!stripe}
          >
            Pay ৳{amount}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
