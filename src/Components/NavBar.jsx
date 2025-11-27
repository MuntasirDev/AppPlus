import React, { useState } from "react";

// 💡 FIX 1: Import Link and useLocation from 'react-router'
import { Link, useLocation } from "react-router"; 
import { User } from "lucide-react"; 
import logo from "../assets/appPlus_logo.png"; 

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper function to determine if a link is active
  const isActive = (path) => location.pathname.startsWith(path); // Use startsWith for paths like /auth/login

  // Primary Brand Text Gradient Class (Indigo-600 to Teal-500)
  const textGradientClass =
    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500";

  // Custom gradient background class (used for the Login button)
  const brandGradientBackground =
    "bg-gradient-to-r from-indigo-600 to-teal-500";

  return (
    // Set to sticky top-0, full width, and high z-index
    <div className="sticky top-0 w-full z-50"> 
      
      {/* Navigation Container: Dark Glass Effect */}
      <nav 
        className="bg-gray-950 backdrop-blur-lg text-white border-b border-white/10"
      >
        <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            
            {/* Gradient bordered container for the logo image */}
            <div className={`p-0.5 rounded-xl ${brandGradientBackground}`}> 
                <img src={logo} alt="AppPlus Logo" className="h-12 w-auto p-1 bg-gray-950 rounded-lg"/>
            </div>

            {/* App Title and Tagline */}
            <div className="flex flex-col leading-none">
              <Link
                to="/"
                className="text-2xl font-extrabold text-white" 
              >
                AppPlus
              </Link>
              <span className="text-xs font-medium text-gray-400">
                Discover Your Favorite Apps
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex gap-8 items-center">
            
            {/* Apps Link */}
            <Link
              to="/apps"
              className={`text-lg font-semibold hover:text-indigo-400 transition-colors ${
                isActive("/apps") ? textGradientClass : "text-white/80" 
              }`}
            >
              Apps
            </Link>
            
            {/* My Profile Link */}
            <Link
              to="/my-profile"
              className={`text-lg font-semibold hover:text-indigo-400 transition-colors ${
                isActive("/my-profile") ? textGradientClass : "text-white/80" 
              }`}
            >
              My Profile
            </Link>

            {/* Login Button (Desktop) */}
            <Link
              to="/auth/login" // ✅ FIX 1: Updated path to match router config
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold shadow-xl ${brandGradientBackground} text-white transition-opacity duration-300 hover:opacity-85`}
            >
              <User className="h-5 w-5" />
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white transition-transform duration-300 active:scale-95"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className={`${mobileMenuOpen ? "hidden" : "block"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
                <path
                  className={`${mobileMenuOpen ? "block" : "hidden"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900/90 border-t border-white/20 py-2 px-4 flex flex-col gap-1">
            <Link
              to="/apps"
              className={`text-lg py-3 block font-semibold border-b border-white/10 hover:bg-gray-800 transition-colors ${textGradientClass}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Apps
            </Link>
            <Link
              to="/my-profile"
              className={`text-lg py-3 block font-semibold border-b border-white/10 hover:bg-gray-800 transition-colors ${textGradientClass}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              My Profile
            </Link>
            <Link
              to="/auth/login" // ✅ FIX 1: Updated path to match router config
              className={`mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-white transition-opacity duration-300 hover:opacity-90 ${brandGradientBackground}`} // ✅ FIX 2: Used the variable
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              Login
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;