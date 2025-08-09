import axios from 'axios';
import React from 'react';

const axiosOp=axios.create({
    baseURL:`https://smart-bazar-server.vercel.app`
    // baseURL:`http://localhost:3000`
})

const useAxios = () => {
    return axiosOp
};

export default useAxios;