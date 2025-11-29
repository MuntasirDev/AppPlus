import { useContext } from 'react';
// Import the context defined in your AuthProvider file
import { AuthContext } from '../Provider/AuthProvider'; 
// NOTE: Adjust the path to AuthProvider based on your structure

const useAuth = () => {
    // This function returns the entire value object from AuthContext
    return useContext(AuthContext);
};

export default useAuth;