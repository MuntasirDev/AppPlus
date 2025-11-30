import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/FireBase.init";
export const AuthContext = createContext();

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const updateUserProfile = (currentUser, name, photoUrl) => {
    if (!currentUser) {
      return Promise.reject(new Error("User not logged in."));
    }
    return updateProfile(currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => { 
    return sendPasswordResetEmail(auth, email);
};

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const UnSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      UnSubscribe();
    };
  }, []);
  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    updateUserProfile,
    signInWithGoogle,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
