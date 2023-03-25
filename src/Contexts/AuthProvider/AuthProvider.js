import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'



export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    const updateUser = (userInfo) =>{
        return updateProfile(auth.currentUser, userInfo)
    }

    const logOut = () =>{
        return signOut(auth)
    }

    const signInWithGoogle = () =>{
        return signInWithPopup(auth, googleProvider);
    }

    const forgetPassword = (email) =>{
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log('User state changed', currentUser)
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe()

    },[])



    const authInfo = {
        user,
        loading,
        createUser,
        updateUser,
        signIn,
        logOut,
        signInWithGoogle,
        forgetPassword,
        

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;