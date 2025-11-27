import React from 'react';
import { Link } from "react-router";
// Import Lucide icons (these are standard packages, not custom UI)
import { Smartphone, Star, Download, TrendingUp, Users } from 'lucide-react';

const Home = () => {

    // Primary Brand Text Gradient Class (Indigo-600 to Teal-500)
    const textGradientClass =
        "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500";
    
    // Custom gradient background class for buttons/cards to match the brand
    const brandGradientBackground = 
        "bg-gradient-to-r from-indigo-600 to-teal-500";

    // Custom gradient class for subtle background effects on the Hero section
    const heroGradientDark = 
        "bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950";

    // Reusable Primary Button Class (mimics the style you wanted)
    const primaryButtonClass = 
        `${brandGradientBackground} text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition-opacity text-lg`;

    // Reusable Outline Button Class
    const outlineButtonClass =
        "bg-transparent text-white border-2 border-indigo-600 font-semibold py-3 px-8 rounded-lg hover:bg-indigo-600/10 transition-colors text-lg";

    // Reusable Card Class
    const cardClass = 
        "bg-gray-900 rounded-xl p-0 border border-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all hover:-translate-y-1";


    return (
        // Set main container to a dark background
        <div className="min-h-screen bg-gray-950 text-white"> 
            
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 md:py-32">
                <div className={`absolute inset-0 ${heroGradientDark} opacity-70`} /> 
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center animate-fade-in">
                        
                        {/* Status/Badge */}
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gray-800 border border-indigo-600/50">
                            <Star className={`h-4 w-4 ${textGradientClass} fill-current`} />
                            <span className="text-sm font-medium text-gray-300">Top Rated App Platform</span>
                        </div>
                        
                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-teal-500 to-indigo-400">
                            Discover Amazing Apps
                        </h1>
                        
                        {/* Subheading */}
                        <p className="text-xl md:text-2xl text-gray-400 mb-8">
                            Your gateway to thousands of incredible apps. Find, install, and review apps that make your life better.
                        </p>
                        
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/apps" className={primaryButtonClass}>
                                Browse Apps
                            </Link>
                            <Link to="/auth/register" className={outlineButtonClass}>
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Decorative Icons */}
                <div className="absolute top-20 left-10 animate-float">
                    <Smartphone className="h-16 w-16 text-indigo-600/20" />
                </div>
                <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "1s" }}>
                    <Star className="h-20 w-20 text-teal-500/20" />
                </div>
            </section>
            
            <hr className="border-gray-800"/>

            {/* Features Section */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold mb-4">Why Choose AppStore?</h2>
                    <p className="text-xl text-gray-400">Everything you need in one place</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Feature 1: Trending Apps (Replaced Card) */}
                    <div className={cardClass}>
                        <div className="p-8 text-center">
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${brandGradientBackground} mb-4`}>
                                <TrendingUp className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white">Trending Apps</h3>
                            <p className="text-gray-400">
                                Discover the hottest and most popular apps loved by millions of users worldwide.
                            </p>
                        </div>
                    </div>
                    
                    {/* Feature 2: Easy Installation (Replaced Card) */}
                    <div className="bg-gray-900 rounded-xl p-0 border border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/10 transition-all hover:-translate-y-1">
                        <div className="p-8 text-center">
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-teal-500 to-indigo-600 mb-4`}>
                                <Download className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white">Easy Installation</h3>
                            <p className="text-gray-400">
                                One-click installation process. Get your favorite apps up and running in seconds.
                            </p>
                        </div>
                    </div>
                    
                    {/* Feature 3: User Reviews (Replaced Card) */}
                    <div className="bg-gray-900 rounded-xl p-0 border border-indigo-400/30 hover:shadow-2xl hover:shadow-indigo-400/10 transition-all hover:-translate-y-1">
                        <div className="p-8 text-center">
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-indigo-400 to-teal-500 mb-4`}>
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white">User Reviews</h3>
                            <p className="text-gray-400">
                                Read honest reviews from real users to make informed decisions about apps.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            <hr className="border-gray-800"/>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    {/* CTA Card (Replaced Card) */}
                    <div className={`${brandGradientBackground} p-12 text-center rounded-xl shadow-2xl shadow-indigo-600/30`}>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                            Join thousands of users who trust AppStore for their app discovery needs.
                        </p>
                        <Link to="/auth/register">
                            {/* CTA Button (Secondary Style) */}
                            <button className="bg-white text-indigo-700 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-white/90 transition-colors text-lg">
                                Create Free Account
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;