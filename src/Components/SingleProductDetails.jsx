import React, { useState } from "react";
import { Link, useParams } from "react-router";
import Swal from "sweetalert2";

import AddToWatchlistButton from "./AddToWatchListButton";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import useUserInfo from "../Hooks/useUserInfo";
import useSingleProduct from "../Hooks/useSngleProduct";
import LoadingSpinner from "../Optionals/LoadingSpinner";

const SingleProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { userInfo } = useUserInfo();
  const [showHistory, setShowHistory] = useState(false);

  const { data: product, isLoading, isError, error } = useSingleProduct(id);

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const openBuyModal = () => {
    setQuantity(1);
    setIsBuyModalOpen(true);
  };

  const closeBuyModal = () => {
    setIsBuyModalOpen(false);
  };

  if (isLoading)
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        <LoadingSpinner/>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Error loading product: {error?.message || "Unknown error"}
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Product not found
      </div>
    );

  const currentPrice = product.prices?.[0];

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10 p-6  rounded-xl shadow-lg"
     style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}>
     
               
      <div className=" rounded-lg md:flex overflow-hidden shadow-md border border-gray-200">
        {/* Image */}
        <div className="md:w-5/12 bg-gray-200">
          <img
            src={product.image}
            alt={product.itemName}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Details */}
        <div className="md:w-7/12 p-6 space-y-4 text-gray-700">
          <h2 className="text-3xl font-bold ">
            {product.itemName}
          </h2>
          <p className="text-sm text-gray-500">
            Market:{" "}
            <span className="font-medium text-gray-700">
              {product.marketName}
            </span>
          </p>
          <p className="text-gray-600">{product.itemDescription}</p>

          {/* Current Price */}
          {currentPrice && (
            <div className="text-xl text-emerald-600 font-semibold border border-emerald-200 bg-emerald-50 px-4 py-2 rounded-lg w-fit">
              ৳{currentPrice.price}/kg{" "}
              <span className="text-sm">({currentPrice.date})</span>
            </div>
          )}

          {/* Toggle previous price history */}
          <div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm underline"
            >
              {showHistory ? "Hide Previous Prices" : "View Previous Prices"}
            </button>

            {showHistory && (
              <ul className="list-disc list-inside text-gray-600 text-sm max-h-40 overflow-auto mt-2 bg-gray-50 p-2 rounded-md border border-gray-200">
                {product.prices?.slice(1).length > 0 ? (
                  product.prices.slice(1).map((p, idx) => (
                    <li key={idx}>
                      {p.date} — ৳{p.price}/kg
                    </li>
                  ))
                ) : (
                  <li>No previous price history available</li>
                )}
              </ul>
            )}
          </div>

          {/* Vendor */}
          <p className="text-sm text-gray-500">
            Vendor: <span className="text-gray-700">{product.vendorName}</span>{" "}
            ({product.vendorEmail})
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            {/* Buy Product Button */}
            <button
               className=" px-6  py-3 text-center font-semibold bg-pink-500 text-white  rounded-md shadow-lg 
             hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse 
             text-sm "
              onClick={openBuyModal}
               style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
            >
              Buy Product
            </button>

            {/* Watchlist Button */}
            <AddToWatchlistButton product={product} />
          </div>
        </div>
      </div>

      {/* ====== SIMPLE BUY MODAL ====== */}
      {isBuyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-md px-4">
          <div className=" bg-purple-400 text-gray-800 bg-opacity-90 rounded-lg max-w-md w-full p-6 relative shadow-lg"
          
          style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}>
            <button
              className="absolute top-2 right-3  hover:text-red-600 text-xl"
              onClick={closeBuyModal}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-black">Buy Product</h2>

            <div className="mb-4">
              <div className="w-full text-black">
                <img
                  src={product.image}
                  alt={product.itemName}
                  className="h-52 w-full object-cover rounded-md mb-2"
                />
              </div>
              <h3 className="text-lg font-semibold text-black">{product.itemName}</h3>
              <p className="text-black">
                Price: ৳{currentPrice?.price || "N/A"}/kg
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block font-medium mb-1 text-black">
                Quantity (kg)
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border rounded px-3 py-2 text-black"
              />
            </div>

            <div className="text-right font-semibold text-indigo-900 mb-4">
              Total: ৳{(quantity * (currentPrice?.price || 0)).toFixed(2)}
            </div>

            <div className="flex justify-end gap-2">
              <button 
              
             className=" px-6  py-3 text-center font-semibold bg-red-500 text-white  rounded-md shadow-lg 
             hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse 
             text-sm "
              
              onClick={closeBuyModal}>
                Cancel
              </button>
              <Link
                to={`/payment/${id}`}
                state={{
                  amount: (quantity * (currentPrice?.price || 0)).toFixed(2),
                  quantity: quantity,
                  pricePerKg: currentPrice?.price,
                  productName:product.itemName,
                  productImage:product.image,
                  vendorEmail:product.vendorEmail,
                  marketName:product.marketName,
                  userEmail:user.email


                }}
                // className="btn btn-primary"
                className=" px-6  py-3 text-center font-semibold bg-green-600 text-white  rounded-md shadow-lg 
             hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse 
             text-sm "
                onClick={() => {
                
                  Swal.fire({
                    icon: "info",
                    title: `You will be charged ৳${(
                      quantity * (currentPrice?.price || 0)
                    ).toFixed(2)}`,
                    // timer: 2000,
                    showConfirmButton: true,
                  });
                }}
              >
                Proceed to Pay
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductDetails;
