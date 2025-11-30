import React from "react";
import { Link } from "react-router-dom";

const AboutOurGoals = () => {
  const textGradientClass =
    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500";

  const brandGradientBackground =
    "bg-gradient-to-r from-indigo-600 to-teal-500";

  const heroGradientDark =
    "bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950";

  const primaryButtonClass = `${brandGradientBackground} text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition-opacity text-lg inline-block`;

  const goals = [
    {
      title: "Seamless Distribution",
      description:
        "We are reimagining how software is delivered. No more broken links or complex wizards—just one click to get the tools you need.",
      icon: (
        <svg
          className="w-8 h-8 text-teal-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Ironclad Security",
      description:
        "Trust is our currency. Every application on appPlus undergoes rigorous automated scanning to ensure your device stays clean and secure.",
      icon: (
        <svg
          className="w-8 h-8 text-indigo-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Developer First",
      description:
        "We bridge the gap between creators and users. We provide developers with the analytics and infrastructure to reach millions instantly.",
      icon: (
        <svg
          className="w-8 h-8 text-teal-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className={`${heroGradientDark} min-h-screen text-white`}>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
        <div className="text-center max-w-3xl mb-16">
          <h2 className="text-indigo-500 font-semibold tracking-wide uppercase text-sm mb-3">
            Our Mission
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Building the Future of{" "}
            <span className={textGradientClass}>App Discovery</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            At <strong>appPlus</strong>, we believe installing software should
            be as exciting as using it. We are building a centralized ecosystem
            where convenience meets security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl hover:border-indigo-500/50 transition-colors duration-300"
            >
              <div className="bg-gray-800/50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                {goal.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{goal.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {goal.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/" className={primaryButtonClass}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutOurGoals;
