import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import  { app } from '../Firebase/Firebase.init'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
     const auth=getAuth(app)
const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const login=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
     const logOut=()=>{
    setLoading(true)
    return signOut(auth)
  }
  const googleLogin=()=>{
    setLoading(true)
    return signInWithPopup(auth,provider)
  }
    const authinfo={
        user,
        loading,
        setLoading,
        createUser,
        login,
        logOut,
        googleLogin
    }
    useEffect(()=>{
    const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setLoading(false)
    })
    return ()=>{
        unSubscribe()
    }
  },[auth])
    return (
        <AuthContext value={authinfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;