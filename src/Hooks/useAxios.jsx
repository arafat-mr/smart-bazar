import axios from 'axios';
import React from 'react';

const axiosOp=axios.create({
    // baseURL:`https://smart-bazar-server-side-h1u3dmkdu.vercel.app`
    // baseURL:`http://localhost:3000`
    baseURL:`https://smart-bazar-server-new.vercel.app` 
})

const useAxios = () => {
    return axiosOp
};

export default useAxios;