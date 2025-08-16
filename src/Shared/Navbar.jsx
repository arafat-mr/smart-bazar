import React from "react";
import { Link, NavLink } from "react-router";
import "./Navbar.css";
import Logo from "./Logo";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useUserInfo from "../Hooks/useUserInfo";

const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  const { userInfo, isLoading: userInfoLoading } = useUserInfo();
  
  const handleSignOut = () => {
    logOut()
      .then((res) => {
        localStorage.removeItem("access-token");
        Swal.fire({
          icon: "success",
          title: "successfully logged out",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const links = (
    <>
      <li className="">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="">
        <NavLink to="/allProductsApproved">All Products</NavLink>
      </li>
      <li className="">
        <NavLink to="/faq">FAQ</NavLink>
      </li>
      {user && (
        <>
        <li className="">
          <NavLink to="/dashBoard">DashBoard</NavLink>
        </li>
        <li className="">
          <NavLink to="/smartBazarPlanner">Spend Smartly</NavLink>
        </li>
        </>
      )}
    </>
  );

  return (
    <div className="max-w-15/16 mx-auto">
      <input type="checkbox" id="drawer-toggle" className="drawer-toggle" />
      <div className="drawer-content ">
        <div className="navbar text-black  bg-transparent ">
          <div className="navbar-start">
            <label
              htmlFor="drawer-toggle"
              tabIndex={0}
              className="btn btn-ghost lg:hidden -ml-7"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <div className="-ml-5 md:-ml-0">
              <Logo />
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end gap-2">
            {loading ? (
              <span className="loading loading-spinner text-secondary"></span>
            ) : user ? (
              <>
               
                {userInfoLoading ? (
                  <div className="w-8 md:w-10 h-8 md:h-10 rounded-full  loading loading-spinner text-secondary" />
                ) : (
                  <img
                    src={
                      userInfo?.photoURL ||
                      "https://i.ibb.co/qMCMB6Tq/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.png"
                    }
                    alt={userInfo?.name || "User"}
                    className="w-8 md:w-10 h-8 md:h-10 rounded-full object-cover"
                  />
                )}
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline btn-secondary text-black btn-sm md:btn-md  hover:bg-gray-50 "
                >
                  Logout
                </button>
                {/* <span className="text-xs text-gray-300">{userInfo?.name}</span>
<span className="text-xs text-green-400 capitalize">{userInfo?.role}</span> */}
              </>
            ) : (
              <div className="">
                <Link
                  to="/login"
                  className=" mr-2  btn btn-outline btn-secondary text-black btn-sm md:btn-md  hover:bg-gray-50 "
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-outline btn-secondary text-black btn-sm md:btn-md  hover:bg-gray-50 -mr-3 md:mr-0"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="drawer-side w-screen h-screen  ">
        <label
          htmlFor="drawer-toggle"
          className="drawer-overlay bg-black bg-opacity-50"
        ></label>
        <div className="w-1/2 h-full bg-base-100 py-7">
          <Link to="/" className="flex flex-col justify-center items-center ">
            <img
              className="h-10 w-10"
              src="https://i.ibb.co/dsmt140F/a-basket-brimming-with-vegetables-free-png-removebg-preview.png"
              alt=""
            />
            <p className="text-black text-lg">
              <span className="text-green-400">Smart</span>{" "}
              <span className="-ml-1">Bazar</span>
            </p>
          </Link>
          <ul className="menu  w-full text-base-content ">{links}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
