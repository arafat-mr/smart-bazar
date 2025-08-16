import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import Logo from "../Shared/Logo";
import { ToastContainer } from "react-toastify";
import Footer from "../Shared/Footer";
import useUserInfo from "../Hooks/useUserInfo";

const DashBoard = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const role = userInfo?.role || "guest";

  const handleHome = () => {
    navigate("/");
  };

  // Define links by role
  const linksByRole = {
    user: [
      { to: "/dashboard/viewPriceTrends", label: "View Price Trends" },
      { to: "/dashboard/watchList", label: "Manage Watch List" },
      { to: "/dashboard/myOrders", label: "My Orders" },
    ],
    vendor: [
      { to: "/dashboard/addProduct", label: "Add Product" },
      { to: "/dashboard/myProducts", label: "My Products" },
      { to: "/dashboard/createAd", label: "Create An Ad" },
      { to: "/dashboard/myAdvertises", label: "My Advertisements" },
    ],
    admin: [
      { to: "/dashboard/allUsers", label: "All Users" },
      { to: "/dashboard/allProducts", label: "All Products" },
      { to: "/dashboard/allOrders", label: "All Orders" },
      { to: "/dashboard/allAds", label: "All Advertisements" },
    ],
  };

  // Get links for the current role or empty array
  const menuLinks = linksByRole[role] || [];

  return (
    <div className='min-h-screen bg-[url("https://i.ibb.co/pvwjZxGk/5557528.jpg")] bg-cover bg-center'>
      <div className="min-h-screen w-full relative">
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
  {/* Navbar */}
      <div className="navbar p-3 bg-transparent w-full shadow-2xl hidden lg:flex justify-between items-center relative z-40">
        <div onClick={handleHome} className="cursor-pointer ">
          <Logo />
        </div>
        <div className=" font-semibold ">
          <p className="text-black">Logged in as : {role}</p>
        </div>
      </div>

      <div className="drawer drawer-mobile w-full min-h-screen lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Main Content Area */}
        <div className="drawer-content flex flex-col min-h-screen bg-transparent ">
          {/* Mobile Navbar */}
          <div className="navbar bg-transparent w-full lg:hidden shadow-2xl">
            <div className="flex-none">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
            <div
              onClick={handleHome}
              className="mx-2 flex-1 px-2 text-lg font-semibold flex justify-between items-center cursor-pointer"
            >
              <Logo /> 
              <p className=" font-semibold text-sm md:text-lg">
                Logged in as : {role}
              </p>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-2 md:p-5">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side min-h-screen overflow-y-auto text-white mt-3">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
{/* // bg-[#0a1e3ad9] */}
          <ul
            className="menu w-60 md:w-72 lg:w-80 min-h-full p-4
            backdrop-blur-2xl
            
            border-1 border-l-0 border-gray-300
            rounded-md
            shadow-2xl shadow-blue-400/30
            text-black space-y-2"
          >
            {/* Logo for mobile */}
            <div onClick={handleHome} className="lg:hidden cursor-pointer">
              <Logo />
            </div>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `py-2 px-4 rounded-lg hover:bg-blue-800/50 transition duration-200 ${
                    isActive ? "bg-blue-700/70 font-semibold" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            {/* Render links conditionally */}
            {menuLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `py-2 px-4 rounded-lg hover:bg-blue-800/50 transition duration-200 ${
                      isActive ? "bg-blue-700/70 font-semibold" : ""
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
      <div className="mt-4 relative z-40">
        <Footer />
      </div>

</div>
    
    </div>
  );
};

export default DashBoard;
