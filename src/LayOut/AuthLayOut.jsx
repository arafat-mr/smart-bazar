import React from "react";
import { Outlet } from "react-router";
import Footer from "../Shared/Footer";
import Logo from "../Shared/Logo";

const AuthLayOut = () => {
  return (
    <div className="w-full text-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <div className="bg-white/10 backdrop-blur-3xl shadow-2xl px-3 flex justify-between items-center py-3">
          <Logo />
        </div>
      </div>

      {/* Page content */}
      <div className="mt-0">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default AuthLayOut;
