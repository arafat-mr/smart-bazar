import React from "react";
import { ShoppingBag, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router";

const ExploreSmartBazar = ({ openBuyModal }) => {
  return (
    <section className="relative w-full  flex items-center justify-center py-10 px-4 "
    
    >
      {/* Hero Container with Rounded Corners */}
      <div className="relative w-full max-w-full h-[70vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-2xl"
       style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}>
        {/* Background Image */}
        <img
          src="https://i.ibb.co/JWP873G5/sharon-pittaway-KUZnfk-2-DSQ-unsplash-1.jpg"
          alt="Explore Smart Bazar"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white space-y-6 px-6">
          <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-pink-400" />
            Explore Smart Bazar
          </h2>

          <p className="text-lg md:text-xl max-w-2xl text-gray-200">
            Discover fresh products, trusted vendors, and the best deals all in
            one place. Shop smart, live better.
          </p>

          {/* Highlighted Features */}
          <div className="flex flex-col md:flex-row gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-yellow-300" />
              <span>Wide range of products</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span>Track price trends</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-300" />
              <span>Exclusive offers daily</span>
            </div>
          </div>

          {/* Button */}
          <Link to='/faq'
            className="px-6 py-3 text-center font-semibold bg-pink-500 text-white rounded-md shadow-lg 
                       hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse 
                       text-sm md:text-base"
            onClick={openBuyModal}
            style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreSmartBazar;
