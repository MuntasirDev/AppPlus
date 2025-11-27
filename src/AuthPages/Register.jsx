import React from "react";
import { Link } from "react-router";
import { Chrome } from "lucide-react";

// Primary Brand Text Gradient Class (Indigo-600 to Teal-500)
const textGradientClass =
  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500";

// Custom gradient background class (used for the Register button)
const brandGradientBackground =
  "bg-gradient-to-r from-indigo-600 to-teal-500";

const Register = () => {
  // 🚫 LOGIC REMOVED: useState, useEffect, useAuth, handleEmailRegister, handleGoogleRegister

  // Placeholder functions for form handlers to prevent errors
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration form submitted - Logic disabled");
  };
  const handleGoogleClick = () => {
    console.log("Google button clicked - Logic disabled");
  };

  return (
    // Main dark background container
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 text-white">
      
      {/* Card Component Simulation */}
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl shadow-2xl">
        
        {/* CardHeader Simulation */}
        <header className="p-6 space-y-2 text-center border-b border-gray-800">
          
          {/* CardTitle Simulation */}
          <h1 className="text-3xl font-extrabold tracking-tight">
            Create Your Account
          </h1>
          
          {/* CardDescription Simulation */}
          <p className="text-gray-400">
            Enter your details below to get started
          </p>
        </header>

        {/* CardContent Simulation */}
        <div className="p-6 space-y-6">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              {/* Name Label/Input */}
              <label htmlFor="name" className="text-sm font-medium leading-none block text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                className="flex h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              {/* Email Label/Input */}
              <label htmlFor="email" className="text-sm font-medium leading-none block text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="flex h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              {/* Password Label/Input */}
              <label htmlFor="password" className="text-sm font-medium leading-none block text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="flex h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              />
            </div>

            {/* Button Simulation (Primary Gradient) */}
            <button
              type="submit"
              className={`w-full h-10 inline-flex items-center justify-center rounded-lg text-sm font-medium text-white shadow-lg transition-all duration-200 ${brandGradientBackground} hover:opacity-90 active:scale-[0.98]`}
            >
              Sign Up
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-900 px-2 text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Button Simulation (Google Register) */}
          <button
            type="button"
            className="w-full h-10 inline-flex items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-800 transition-colors duration-200 active:scale-[0.98]"
            onClick={handleGoogleClick}
          >
            <Chrome className="mr-2 h-5 w-5 text-red-500" />
            Sign up with Google
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className={`hover:underline font-medium ${textGradientClass}`}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;