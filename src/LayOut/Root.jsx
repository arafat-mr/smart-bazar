import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Shared/Footer';
import ProductsCardSection from '../Components/ProductsSection';

const Root = () => {
    return (
        <div className='rubik min-h-screen bg-gradient-to-r from-white to-green-100   text-white  '>
            <Navbar/>
            <Outlet/>
            
            <Footer/>
        </div>
    );
};

export default Root;