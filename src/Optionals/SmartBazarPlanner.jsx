import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import LoadingSpinner from "./LoadingSpinner";
import useUserInfo from "../Hooks/useUserInfo";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const SmartBazarPlanner = () => {
  const [budget, setBudget] = useState("");
  const axios = useAxios();
 const {userInfo}=useUserInfo()

  const navigate=useNavigate()

  // TanStack Query
  const { data, isLoading, refetch, remove } = useQuery({
    queryKey: ["budgetItems", budget],
    queryFn: async () => {
      if (!budget || isNaN(budget) || budget <= 0)
        return { items: [], total: 0 };
      const res = await axios.get(`/recommendations?budget=${budget}`);
      return res.data;
    },
    enabled: false, 
  });

  const handleSubmit = () => {
    if (!budget || isNaN(budget) || budget <= 0) {
      remove();
      return;
    }
    refetch();
  };

  // Clear old data when budget input is cleared
  useEffect(() => {
    if (!budget) refetch();
  }, [budget]);

  return (
    <section
      className="min-h-screen px-5 py-10 md:px-20 md:py-16"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 60% 20%, rgba(175, 109, 255, 0.50), transparent 65%),
          radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 100, 180, 0.45), transparent 65%),
          radial-gradient(ellipse 60% 50% at 60% 65%, rgba(255, 235, 170, 0.43), transparent 62%),
          radial-gradient(ellipse 65% 40% at 50% 60%, rgba(120, 190, 255, 0.48), transparent 68%),
          linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
        `,
      }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          <span className="text-purple-700 drop-shadow-lg">Spend Smartly </span>
        </h1>

        {/* Budget Input */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
          <input
            type="number"
            placeholder="Enter your budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="px-4 py-2 rounded-full border-2 border-purple-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-900"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/80 hover:scale-105 transition duration-300 hover:animate-pulse"
            style={{ boxShadow: "0 0 15px rgba(147, 51, 234, 0.8)" }}
          >
            {/* {isLoading ?  "Loading..." : "Check Items"} */}

            Check Items
          </button>
        </div>

        {/* Messages */}
        {
            isLoading && <LoadingSpinner/>
        }
        {!budget && !isLoading && (
          <p className="text-gray-700 text-lg md:text-xl mb-6">
            Enter your budget to see recommended products!
          </p>
        )}
        {budget && !isLoading && data?.items?.length === 0 && (
          <p className="text-red-600 text-lg md:text-xl mb-6">
            No products found within your budget.
          </p>
        )}
      
        {/* Total */}
        {data?.items?.length > 0 && !isLoading && budget && (
          <p className="text-gray-900 text-lg md:text-xl font-medium mb-6">
            Total Price: <span className="font-bold">{data.total}</span> / Budget: {budget}
          </p>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.items?.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 shadow-lg border-2"
              style={{
                borderImage: "linear-gradient(135deg, #af6dff, #ff64b4, #ffebaa, #78beff) 1",
              }}
            >
              <img
                src={item.image}
                alt={item.itemName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {item.itemName}
              </h2>
              <p className="text-gray-800 dark:text-gray-300 mb-2">
                {item.marketName}
              </p>
              <p className="text-gray-900 font-bold text-lg">Price: {item.price}</p>
              <button
                 onClick={()=> navigate(`/allProductsApproved/${item._id}`)}
                className={`mt-3 w-full px-4 py-2 bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-pink-400/80   ${userInfo.role== 'user' ?"hover:scale-105 transition duration-300" :"cursor-not-allowed opacity-40 " }`}
                style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
              >
               View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartBazarPlanner;
