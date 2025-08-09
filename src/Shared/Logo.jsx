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
      <span className="text-lg font-semibold text-green-600 -ml-2">
        Smart<span className="text-[#1cd0dd]">Bazar</span>
      </span>
    </Link>
  );
};

export default Logo;
