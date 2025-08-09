import React from 'react';
import Navbar from '../Shared/Navbar';
import { Link, Outlet } from 'react-router';
import Footer from '../Shared/Footer';
import Logo from '../Shared/Logo';

const AuthLayOut = () => {
    return (
        <div className='w-full  bg-[url("https://i.ibb.co/qLydTBzd/peter-rovder-X-5k-MOSx-Lzw-unsplash.jpg")] text-white  '>
            <div className='p-5  lg:w-11/12 w-full mx-auto '>

         <div className=' flex justify-between items-center bg-trasnparent  shadow-2xl px-3 rounded-sm'>
           <Link className='flex justify-center items-center '> <img className='w-15 h-15' src="https://i.ibb.co/dsmt140F/a-basket-brimming-with-vegetables-free-png-removebg-preview.png" alt="" /> <p className='text-xl font-semibold'>Smart Bazar</p></Link>
          


         </div>
            <Outlet/>
            <Footer/>
        </div>
            </div>
    );
};

export default AuthLayOut;