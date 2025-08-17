import React from "react";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import ProductsCardSection from "../ProductsSection";
import AdsSction from "../AdsSection/AdsSction";
import Counter from "../../Counter/Counter";
import Reviews from "../../UserReviews/Reviews";
import ReviewsSection from "../ReviewsSection";
import { Typewriter } from "react-simple-typewriter";
import { Link, useNavigate } from "react-router";
const Home = () => {
  const { user } = useAuth();
 const navigate=useNavigate()
  return (
    <div className=" max-w-15/16 mx-auto px-5 md:px-12 py-10 md:py-12 ">
      <div>
        
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-y-10 md:gap-x-10 mb-10">
          {/* Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img
              src="https://i.ibb.co/dsmt140F/a-basket-brimming-with-vegetables-free-png-removebg-preview.png"
              alt="Smart Bazar Vegetables"
              className="w-72 md:w-96 lg:w-[500px] object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center   text-center md:text-left md:items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 drop-shadow-sm">
              Welcome to <br />
              <span className="bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
                SmartBazar
              </span>
            </h1>

            {/* Typewriter Animation */}
            <p className="mt-3 text-lg md:text-xl text-gray-800 font-medium">
              <Typewriter
                words={[
                  "Track daily prices of fresh vegetables ",
                  "Know before you go — shop smarter ",
                  "Get real-time updates from your local bazar",
                  "Plan your weekly budget with confidence ",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </p>

            {/* Supporting Paragraph */}
            <motion.p
              className="mt-5 text-base md:text-lg text-gray-600 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              SmartBazar helps you stay informed with accurate, up-to-date
              prices for vegetables and daily essentials — straight from your
              trusted local markets. Save time, save money, and shop with
              confidence.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              className="mt-6     flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center  md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              {/* Purple Glow */}
              <Link to='/allProductsApproved'
                className="px-6  py-3  bg-purple-600 text-white font-semibold rounded-full shadow-lg 
             hover:shadow-purple-500/80 hover:scale-105 transition duration-300 hover:animate-pulse 
             text-sm "
           
                style={{ boxShadow: "0 0 15px rgba(147, 51, 234, 0.8)" }}
              >
                View Products
              </Link>

              {/* Pink Glow */}
              <button
                onClick={()=>navigate('/faq')}
                className=" px-6  py-3  bg-pink-500 text-white  rounded-full shadow-lg 
             hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse 
             text-sm "
                style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <ProductsCardSection />
      <AdsSction />
      <Reviews />
      <Counter />
    </div>
  );
};

export default Home;
