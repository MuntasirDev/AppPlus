import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/FireBase.init";
export const AuthContext = createContext();
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const createUser = (email,password) => {
    return createUserWithEmailAndPassword( auth,email,password);

  };

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
    setuser,
    createUser,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
