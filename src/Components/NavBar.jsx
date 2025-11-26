import React, { useState } from "react";

import { Link, useLocation } from "react-router";
import { User } from "lucide-react"; 
import logo from "../assets/appPlus_logo.png"; 

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

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
        // Dark, semi-transparent background (bg-gray-900/70 for a bit more opacity if needed)
        // Backdrop blur for the "glass" effect
        // Border-b and text-white for styling
        className="bg-gray-900 backdrop-blur-lg text-white border-b border-white/10" // Increased opacity slightly to /70
      >
        <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          
          {/* Logo Section: Fixed spacing and style to match the image */}
          <div className="flex items-center gap-3">
            
            {/* Gradient bordered container for the logo image */}
            <div className={`p-0.5 rounded-xl ${brandGradientBackground}`}> {/* Smaller padding to act as a border */}
                <img src={logo} alt="AppPlus Logo" className="h-12 w-auto p-1 bg-gray-950 rounded-lg"/> {/* Dark inner background */}
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
            
            {/* Apps Link - Highlighted with gradient */}
            <Link
              to="/apps"
              className={`text-lg font-semibold hover:text-indigo-400 transition-colors ${
                isActive("/apps") ? textGradientClass : "text-white/80" // Default text is slightly transparent white
              }`}
            >
              Apps
            </Link>
            
            {/* My Profile Link - Default white text */}
            <Link
              to="/my-profile"
              className={`text-lg font-semibold hover:text-indigo-400 transition-colors ${
                isActive("/my-profile") ? textGradientClass : "text-white/80" // Default text is slightly transparent white
              }`}
            >
              My Profile
            </Link>

            {/* Login Button (Gradient Background) */}
            <Link
              to="/login"
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
              to="/login"
              className="mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold bg-linear-to-r from-indigo-600 to-teal-500 text-white transition-opacity duration-300 hover:opacity-90"
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