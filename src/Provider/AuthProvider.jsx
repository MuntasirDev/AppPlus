// AuthProvider.jsx

import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/FireBase.init";
export const AuthContext = createContext();

import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut,
    updateProfile 
} from "firebase/auth";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const updateUserProfile = (name, photoUrl) => {
        if (!user) {
            return Promise.reject(new Error("User not logged in."));
        }
        
        return updateProfile(user, {
            displayName: name,
            photoURL: photoUrl
        })
        .then(() => {
            setUser(currentUser => ({
                ...currentUser,
                displayName: name,
                photoURL: photoUrl
            }));
        });
    };
    
    const createUser = (email,password) => {
        return createUserWithEmailAndPassword( auth,email,password);
    };

    const signIn = ( email, password ) =>
    {
        return signInWithEmailAndPassword ( auth,email,password);
    }

    const logOut= () => {
        return signOut(auth)
    }

    useEffect(()=> { 
        const UnSubscribe =
        onAuthStateChanged(auth, (currentUser)=>
        {
            setUser(currentUser);
        });
        return ()=> {
            UnSubscribe();
        }
    }, []);
    
    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        updateUserProfile, 
    };
    
    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;