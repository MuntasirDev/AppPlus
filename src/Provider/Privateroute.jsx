import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Privateroute = ({ children }) => {

    const { user } = useContext(AuthContext); 
    const location = useLocation(); 
    if (user && user?.email) {
        return children;
    }

    return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default Privateroute;