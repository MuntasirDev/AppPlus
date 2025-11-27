import React from "react";
import { Link } from "react-router"; // Keeping user's requested import
import { BsGoogle } from "react-icons/bs";

// Primary Brand Text Gradient Class (Indigo-600 to Teal-500)
const textGradientClass =
  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500";

// Custom gradient background class (used for the Login button)
const brandGradientBackground =
  "bg-gradient-to-r from-indigo-600 to-teal-500";

const Login = () => {
  // 🚫 LOGIC REMOVED: useState, useEffect, useAuth, handleEmailLogin, handleGoogleLogin

  // Placeholder functions for form handlers to prevent errors
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted - Logic disabled");
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
            Welcome Back
          </h1>
          
          {/* CardDescription Simulation */}
          <p className="text-gray-400">
            Sign in to your account to continue
          </p>
        </header>

        {/* CardContent Simulation */}
        <div className="p-6 space-y-6">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              {/* Label Simulation */}
              <label htmlFor="email" className="text-sm font-medium leading-none block text-gray-300">
                Email
              </label>
              {/* Input Simulation */}
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="flex h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                {/* Label Simulation */}
                <label htmlFor="password" className="text-sm font-medium leading-none block text-gray-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className={`text-sm hover:underline font-medium ${textGradientClass}`}
                >
                  Forgot password?
                </Link>
              </div>
              {/* Input Simulation */}
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
              Sign In
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-900 px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Button Simulation (Google Login) */}
          <button
            type="button"
            className="w-full h-10 inline-flex items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-800 transition-colors duration-200 active:scale-[0.98]"
            onClick={handleGoogleClick}
          >
            <BsGoogle className="mr-2 h-5 w-5 " />
            Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/auth/register" // ✅ FIX: Must link to the absolute path /auth/register
              className={`hover:underline font-medium ${textGradientClass}`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Login;