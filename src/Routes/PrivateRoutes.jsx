import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import LoadingSpinner from '../Optionals/LoadingSpinner';

const PrivateRoutes = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location=useLocation()
  
    
     

    if(loading){
        return <LoadingSpinner/>
    }
    if(user && user?.email){
        return children
    }
    return <Navigate state={location?.pathname} to='/login'/>
    
    
};

export default PrivateRoutes;