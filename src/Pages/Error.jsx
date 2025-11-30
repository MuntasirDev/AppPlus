import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  const textGradientClass =
    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500";

  const brandGradientBackground =
    "bg-gradient-to-r from-indigo-600 to-teal-500";

  const heroGradientDark =
    "bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950";

  const primaryButtonClass = `${brandGradientBackground} text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition-opacity text-lg inline-block`;

  return (
    <div
      className={`${heroGradientDark} min-h-screen flex flex-col items-center justify-center px-4 text-center`}
    >
      <h1 className={`${textGradientClass} text-9xl font-extrabold mb-2`}>
        404
      </h1>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Page Not Found
      </h2>

      <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
        Oops! The page you are looking for doesn't exist, has been removed, or
        is temporarily unavailable.
      </p>

      <Link to="/" className={primaryButtonClass}>
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
