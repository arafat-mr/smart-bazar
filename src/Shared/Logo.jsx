import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <Link className="flex items-center gap-2 px-2 py-1 rounded-md ">
      <img
        className=" w-7 md:w-10 h-10 object-contain drop-shadow-sm"
        src="https://i.ibb.co/dsmt140F/a-basket-brimming-with-vegetables-free-png-removebg-preview.png"
        alt="Smart Bazar Logo"
      />
      <span className="text-lg font-semibold bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-500 bg-clip-text text-transparent -ml-2">
        SmartBazar
      </span>
    </Link>
  );
};

export default Logo;
