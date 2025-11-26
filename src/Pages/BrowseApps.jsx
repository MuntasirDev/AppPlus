

import React, { useState } from 'react';

import { useLoaderData } from 'react-router'; 
import { ChevronLeft, ChevronRight, Star, Download } from "lucide-react";




const AppCard = ({ app }) => (
    <div 
        className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300 cursor-pointer"
        onClick={() => console.log(`Navigating to details for ${app.name}`)}
    >
        <div className="flex items-center gap-4">
            <img src={app.thumbnail} alt={app.name} className="h-14 w-14 rounded-xl object-cover" />
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-white">{app.name}</h3>
                <p className="text-sm text-gray-400">{app.category}</p>
            </div>
        </div>
        <p className="text-sm text-gray-300 mt-3 line-clamp-2">{app.description || "No description provided."}</p>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700">
            <div className="flex items-center text-sm font-medium text-teal-400">
                <Star className="h-4 w-4 fill-teal-400 mr-1" />
                {app.rating}
            </div>
            <div className="flex items-center text-xs text-indigo-400">
                <Download className="h-3 w-3 mr-1" />
                {(app.downloads / 1000000).toFixed(1)}M
            </div>
        </div>
    </div>
);



const Button = ({ children, onClick, className = '' }) => (
    <button 
        onClick={onClick} 
        className={`p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 transition-colors active:scale-95 ${className}`}
    >
        {children}
    </button>
);



const BrowseApps = () => {
   
    const appsData = useLoaderData(); 
    
   
    if (!appsData || appsData.length === 0) {
        return <div className="min-h-screen bg-gray-950 text-white pt-20 text-center py-20">No app data available.</div>;
    }

   
    const trendingApps = [...appsData].sort((a, b) => b.rating - a.rating).slice(0, 4);
    const categories = ["Productivity", "Health", "Creativity"];
    const appsByCategory = categories.reduce((acc, category) => {
        acc[category] = appsData.filter(app => app.category === category);
        return acc;
    }, {});
    const trendingIds = new Set(trendingApps.map(app => app.id));
    const highDownloadApps = [...appsData]
        .filter(app => !trendingIds.has(app.id))
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, 4);

    const brandGradientText = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400";


    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { title: "New Launch: TaskMaster", description: "Boost productivity instantly!", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=400&fit=crop", color: "from-indigo-600 to-teal-500" },
        { title: "Trending: FitTracker Pro", description: "Hit your fitness goals with our top-rated app.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=400&fit=crop", color: "from-teal-500 to-indigo-600" },
        { title: "Editor's Choice: PixelBrush", description: "Unlock your creativity with powerful tools.", image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=400&fit=crop", color: "from-indigo-600 to-teal-500" }
    ];
    
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
    
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };




    return (
        <div className="min-h-screen bg-gray-950 text-white pt-20"> 
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
            
                <section className=" relative w-auto h-[400px] overflow-hidden mb-16"> 
                    <div
                        className="flex transition-transform duration-500 ease-out h-full"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div key={index} className="min-w-full h-full relative">
                          
                                <div className={`absolute inset-0  ${slide} opacity-80`} /> 
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    
                                    className="w-full h-full object-cover opacity-70" 
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                    <h2 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">{slide.title}</h2>
                                    <p className="text-xl font-light text-white/80">{slide.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                  
                    <Button className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/50 hover:bg-gray-800/80 p-2.5 rounded-full text-white" onClick={prevSlide}>
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/50 hover:bg-gray-800/80 p-2.5 rounded-full text-white" onClick={nextSlide}>
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    currentSlide === index ? "w-8 bg-teal-400" : "w-2 bg-white/30"
                                }`}
                            />
                        ))}
                    </div>
                </section>

                
                
                <div className="py-8">
                    {/* Trending Apps Section */}
                    <section className="mb-16">
                        <h2 className={`text-4xl font-extrabold mb-8 ${brandGradientText}`}>🔥 Trending Apps</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {trendingApps.map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </section>

                    <hr className="border-gray-800 mb-16" />

             
                    {categories.map((category) => (
                        <section key={category} className="mb-16">
                            <h2 className="text-4xl font-extrabold mb-8 text-white">{category}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {appsByCategory[category].map((app) => (
                                    <AppCard key={app.id} app={app} />
                                ))}
                            </div>
                        </section>
                    ))}

                    <hr className="border-gray-800 mb-16" />
                    
                   
                    <section className="mb-16 p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-indigo-700/50">
                        <h2 className="text-4xl font-extrabold mb-8 text-white">🏆 Highly Downloaded</h2>
                        <p className="text-gray-400 mb-6">Apps that have proven their value with millions of users worldwide.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {highDownloadApps.map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BrowseApps;