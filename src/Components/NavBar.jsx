import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, LogOut, Package } from "lucide-react"; // Imported 'Package' for the new route
import logo from "../assets/appPlus_logo.png";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const textGradientClass =
    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500";

  const brandGradientBackground =
    "bg-gradient-to-r from-indigo-600 to-teal-500";

  const primaryButtonClass = `flex items-center gap-2 px-6 py-2 rounded-full font-bold shadow-xl text-white transition-opacity duration-300 hover:opacity-85 ${brandGradientBackground}`;

  return (
    <div className="sticky top-0 w-full z-50">
      <nav className="bg-gray-950/90 backdrop-blur-md text-white border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className={`p-0.5 rounded-xl ${brandGradientBackground}`}>
              <img
                src={logo}
                alt="AppPlus Logo"
                className="h-12 w-auto p-1 bg-gray-950 rounded-lg"
              />
            </div>
            <div className="flex flex-col leading-none">
              <Link to="/" className="text-2xl font-extrabold text-white">
                AppPlus
              </Link>
              <span className="text-xs font-medium text-gray-400">
                Discover Your Favorite Apps
              </span>
            </div>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <Link
              to="/apps"
              className={`text-lg font-semibold hover:text-indigo-400 transition-colors ${
                isActive("/apps") ? textGradientClass : "text-white/80"
              }`}
            >
              Apps
            </Link>

            {user && (
              <Link
                to="/Our-Goals"
                className={`text-lg font-semibold hover:text-indigo-400 transition-colors ${
                  isActive("/Our-Goals") ? textGradientClass : "text-white/80"
                }`}
              >
                About Us
              </Link>
            )}

            {user && (
              <Link
                to="/my-profile"
                className={`text-lg font-semibold hover:text-indigo-400 transition-colors ${
                  isActive("/my-profile") ? textGradientClass : "text-white/80"
                }`}
              >
                My Profile
              </Link>
            )}

            {user ? (
              <button onClick={handleLogout} className={primaryButtonClass}>
                <LogOut className="h-5 w-5" />
                Log Out
              </button>
            ) : (
              <Link to="/auth/login" className={primaryButtonClass}>
                <User className="h-5 w-5" />
                Login
              </Link>
            )}
          </div>

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

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900/90 border-t border-white/20 py-2 px-4 flex flex-col gap-1">
            <Link
              to="/apps"
              className={`text-lg py-3 block font-semibold border-b border-white/10 hover:bg-gray-800 transition-colors ${
                isActive("/apps") ? textGradientClass : "text-white/80"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Apps
            </Link>
            {user && (
              <Link
                to="/my-apps"
                className={`text-lg py-3 block font-semibold border-b border-white/10 hover:bg-gray-800 transition-colors ${
                  isActive("/my-apps") ? textGradientClass : "text-white/80"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                My Apps
              </Link>
            )}
            {user && (
              <Link
                to="/my-profile"
                className={`text-lg py-3 block font-semibold border-b border-white/10 hover:bg-gray-800 transition-colors ${
                  isActive("/my-profile") ? textGradientClass : "text-white/80"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                My Profile
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className={`mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-white ${brandGradientBackground}`}
              >
                <LogOut className="h-5 w-5" />
                Log Out
              </button>
            ) : (
              <Link
                to="/auth/login"
                className={`mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-white transition-opacity duration-300 hover:opacity-90 ${brandGradientBackground}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
