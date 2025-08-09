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
      {/* Navbar */}
      <div className="navbar p-3 bg-transparent w-full shadow-2xl hidden lg:flex justify-between items-center">
        <div onClick={handleHome} className="cursor-pointer">
          <Logo />
        </div>
        <div className="text-blue-400 font-semibold">
          <p>Logged in as : {role}</p>
        </div>
      </div>

      <div className="drawer drawer-mobile w-full min-h-screen lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Main Content Area */}
        <div className="drawer-content flex flex-col min-h-screen bg-transparent text-white">
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
              <p className="text-blue-400 font-semibold text-sm md:text-lg">
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

          <ul
            className="menu w-60 md:w-72 lg:w-80 min-h-full p-4
            backdrop-blur-2xl
            bg-[#0a1e3ad9]
            border-2 border-l-0 border-blue-500
            rounded-md
            shadow-2xl shadow-blue-400/30
            text-white space-y-2"
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
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
};

export default DashBoard;
