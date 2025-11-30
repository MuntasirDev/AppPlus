import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { AuthContext } from "../Provider/AuthProvider";

const textGradientClass =
  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500";

const brandGradientBackground = "bg-gradient-to-r from-indigo-600 to-teal-500";

const Register = () => {
  const navigate = useNavigate();

  const { createUser, setUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log("User created successfully:", user);

        updateUserProfile(user, name, photo)
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
            form.reset();
          })
          .catch((profileError) => {
            // console.error("Profile update error:", profileError);
            alert(`Profile Update Failed: ${profileError.message}`);
            navigate("/");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(`Registration Failed: ${errorMessage} (${errorCode})`);
      });
  };

  const handleGoogleClick = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        // console.log("Google Sign-In successful:", user);
        navigate("/");
      })
      .catch((error) => {
        // console.error("Google Sign-In failed:", error);
        alert(`Google Sign-In Failed: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 text-white">
                         {" "}
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl shadow-2xl">
                                 {" "}
        <header className="p-6 space-y-2 text-center border-b border-gray-800">
                                         {" "}
          <h1 className="text-3xl font-extrabold tracking-tight">
                                      Create Your Account                      {" "}
          </h1>
                                         {" "}
          <p className="text-gray-400">
                                      Enter your details below to get started  
                               {" "}
          </p>
                                     {" "}
        </header>
                                 {" "}
        <div className="p-6 space-y-6">
                                         {" "}
          <form onSubmit={handleSubmit} className="space-y-4">
                                                 {" "}
            <div className="space-y-2">
                                                         {" "}
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none block text-gray-300"
              >
                                                  Full Name                    
                         {" "}
              </label>
                                                         {" "}
              <input
                name="name"
                type="text"
                placeholder="Enter Your Name"
                required
                className="flex h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              />
                                                     {" "}
            </div>
                                                 {" "}
            <div className="space-y-2">
                                                         {" "}
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none block text-gray-300"
              >
                                                  Email                        
                     {" "}
              </label>
                                                         {" "}
              <input
                name="email"
                type="email"
                placeholder="you@appplus.com"
                required
                className="flex h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              />
                                                     {" "}
            </div>
                                                 {" "}
            <div className="space-y-2">
                                                         {" "}
              <label
                htmlFor="Photo"
                className="text-sm font-medium leading-none block text-gray-300"
              >
                                                  Photo URL                    
                         {" "}
              </label>
                                                         {" "}
              <input
                name="photo"
                type="text"
                placeholder=" upload Phot URL"
                required
                className="flex h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              />
                                                     {" "}
            </div>
                                                 {" "}
            <div className="space-y-2">
                                                         {" "}
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none block text-gray-300"
              >
                                                  Password                      
                       {" "}
              </label>
                                                         {" "}
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="flex h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              />
                                                     {" "}
            </div>
                                                 {" "}
            <button
              type="submit"
              className={`w-full h-10 inline-flex items-center justify-center rounded-lg text-sm font-medium text-white shadow-lg transition-all duration-200 ${brandGradientBackground} hover:opacity-90 active:scale-[0.98]`}
            >
                                            Sign Up                          {" "}
            </button>
                                             {" "}
          </form>
                                       {" "}
          <div className="relative">
                                               {" "}
            <div className="absolute inset-0 flex items-center">
                                                       {" "}
              <div className="w-full border-t border-gray-700"></div>           {" "}
                         {" "}
            </div>
                                               {" "}
            <div className="relative flex justify-center text-sm">
                                                       {" "}
              <span className="bg-gray-900 px-2 text-gray-500">
                                                Or sign up with                
                           {" "}
              </span>
                                                   {" "}
            </div>
                                           {" "}
          </div>
                                       {" "}
          <button
            type="button"
            className="w-full h-10 inline-flex items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-800 transition-colors duration-200 active:scale-[0.98]"
            onClick={handleGoogleClick}
          >
                                    <BsGoogle className="mr-2 h-5 w-5 " />     
                  Sign             up with Google                    {" "}
          </button>
                                       {" "}
          <p className="text-center text-sm text-gray-500">
                                    Already have an account?                    
               {" "}
            <Link
              to="/auth/login"
              className={`hover:underline font-medium ${textGradientClass}`}
            >
                                          Sign in                        {" "}
            </Link>
                                           {" "}
          </p>
                                   {" "}
        </div>
                           {" "}
      </div>
                   {" "}
    </div>
  );
};

export default Register;
