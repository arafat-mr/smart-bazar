import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import LoadingSpinner from '../Optionals/LoadingSpinner';
import useUserInfo from '../Hooks/useUserInfo';
import { AuthContext } from '../Contexts/AuthContext';
import Unauthorized from '../Optionals/UnAuthorized';

const UserRoutes = ({children}) => {
    const {loading}=useContext(AuthContext)
  const {userInfo}=useUserInfo()
    
     

    if(loading){
        return <LoadingSpinner/>
    }
    if(userInfo && userInfo?.role==='user'){
        return children
    }
    return <Unauthorized/>
    
    
};

export default UserRoutes;