import React from "react";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import ProductsCardSection from "../ProductsSection";
import AdsSction from "../AdsSection/AdsSction";
import Counter from "../../Counter/Counter";
import Reviews from "../../UserReviews/Reviews";
import ReviewsSection from "../ReviewsSection";

const Home = () => {
  const { user } = useAuth();


  return (
    <div className=" px-4 md:px-12 py-10 md:py-12 ">
      <div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-y-10 md:gap-x-10 mb-5">
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="https://i.ibb.co/dsmt140F/a-basket-brimming-with-vegetables-free-png-removebg-preview.png"
              alt="Smart Bazar Vegetables"
              className="w-72 md:w-96 lg:w-[500px] object-contain drop-shadow-xl"
            />
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 leading-tight">
              Welcome to <br />
              <span className="bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500 bg-clip-text text-transparent">
                SmartBazar
              </span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-700">
              Track daily prices of fresh vegetables and <br />
              essentials from your local bazar — quick, reliable, and updated
              daily.
            </p>
          </motion.div>
        </div>
      </div>
      <ProductsCardSection />
      <AdsSction/>
      <Reviews/>
      <Counter/>
    </div>
  );
};

export default Home;
