import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/FireBase.init";
export const AuthContext = createContext();

import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut,
    // ✅ FIX 1: Import the function required for updating user profile
    updateProfile 
} from "firebase/auth";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    // ✅ FIX 2: Define the updateUserProfile function
    const updateUserProfile = (currentUser, name, photoUrl) => {
        // This function calls the Firebase utility to update the user's profile
        return updateProfile(currentUser, {
            displayName: name,
            photoURL: photoUrl
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
            setuser(currentUser);
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