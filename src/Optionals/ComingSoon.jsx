import React from "react";
import { Clock, Package, MapPin, Loader2 } from "lucide-react";
const ComingSoon = () => {
  return (
    <section className="py-16 ">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-12 flex items-center justify-center gap-4">
  <Clock className="h-9 w-9 text-black animate-pulse" />
  Coming Soon
  
</h2>

      {/* Grid with Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto px-6">
        
        {/* Delivery Feature */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg group">
          <img
            src="https://i.ibb.co/Kp7JxMXh/elias-ek-v-CHd2-Ubexq-U-unsplash.jpg"
            alt="Fast Delivery"
            className="w-full h-72 object-cover rounded-2xl transform group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
              🚚 Faster Delivery  
              <span className="block text-sm font-normal mt-2">
                Same-day doorstep delivery in selected areas
              </span>
            </h3>
          </div>
        </div>

        {/* Tracking Feature */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg group">
          <img
            src="https://i.ibb.co/xSc22TBK/fdc4f82b-e2db-445b-a6bc-ad356c53798a.jpg"
            alt="Live Tracking"
            className="w-full h-72 object-cover rounded-2xl transform group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
              📍 Live Tracking  
              <span className="block text-sm font-normal mt-2">
                Track your orders in real-time
              </span>
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ComingSoon;
