import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Shared/Footer";
import ProductsCardSection from "../Components/ProductsSection";

const Root = () => {
  return (
    <div className="rubik min-h-screen w-full   text-white   ">
      <div className="min-h-screen w-full relative ">
        {/* Aurora Dream Soft Harmony */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
       radial-gradient(ellipse 80% 60% at 60% 20%, rgba(175, 109, 255, 0.50), transparent 65%),
        radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 100, 180, 0.45), transparent 65%),
        radial-gradient(ellipse 60% 50% at 60% 65%, rgba(255, 235, 170, 0.43), transparent 62%),
        radial-gradient(ellipse 65% 40% at 50% 60%, rgba(120, 190, 255, 0.48), transparent 68%),
        linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `,
          }}
        />
        {/* Your content goes here */}
        <div className="relative z-40 ">
            <div className="w-full shadow-sm sticky top-0 backdrop-blur-2xl z-50">
          <Navbar />

            </div>
          <Outlet />

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Root;
