import axios from 'axios';
import React from 'react';

const axiosSecure=axios.create({
    // baseURL:`https://smart-bazar-server-side-h1u3dmkdu.vercel.app`
    // baseURL:`http://localhost:3000`
    baseURL: `https://smart-bazar-server-new.vercel.app`
})
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


const useAxiosSecure = () => {
    return axiosSecure
};


export default useAxiosSecure;