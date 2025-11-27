import React, { useState } from "react";
import { useLoaderData , Link } from "react-router"; // Corrected import
import { ChevronLeft, ChevronRight, Star, Download } from "lucide-react";

// --- AppCard Component ---
const AppCard = ({ app }) => (
  <div
    className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300 cursor-pointer"
    onClick={() => console.log(`Navigating to details for ${app.name}`)}
  >
    <div className="flex items-center gap-4">
      <img
        src={app.thumbnail}
        alt={app.name}
        className="h-14 w-14 rounded-xl object-cover"
      />
      <div className="flex flex-col overflow-hidden">
        <h3 className="text-lg font-semibold text-white truncate">{app.name}</h3>
        {/* ADDED DEVELOPER NAME */}
        <p className="text-xs text-gray-400 truncate">By {app.developer || "Unknown"}</p>
      </div>
    </div>
    {/* Re-adding description for better context, using description from the detailed JSON */}
    <p className="text-sm text-gray-300 mt-3 line-clamp-2">
      {app.description || "No description provided."}
    </p>
    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700">
      <div className="flex items-center text-sm font-medium text-teal-400">
        <Star className="h-4 w-4 fill-teal-400 mr-1" />
        {app.rating}
      </div>
      <div className="flex items-center text-xs text-indigo-400">
        <Download className="h-3 w-3 mr-1" />
        {/* DOWNLOADS */}
        {(app.downloads / 1000000).toFixed(1)}M
      </div>
    </div>
  </div>
);

// --- Button Component ---
const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-full bg-gray-900/50 text-white shadow-lg hover:bg-gray-800/80 transition-colors active:scale-95 ${className}`}
  >
    {children}
  </button>
);

// --- BrowseApps Component ---
const BrowseApps = () => {
  // Assume useLoaderData returns the full list of detailed JSON objects
  const appsData = useLoaderData();

  if (!appsData || appsData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-20 text-center py-20">
        No app data available.
      </div>
    );
  }

  // --- SORTING & FILTERING LOGIC ---
  const trendingApps = [...appsData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const categories = ["Productivity", "Health", "Creativity"];
  const appsByCategory = categories.reduce((acc, category) => {
    acc[category] = appsData.filter((app) => app.category === category);
    return acc;
  }, {});

  // Removed staffPicksApps logic as per previous instruction
  // const trendingIds = new Set(trendingApps.map((app) => app.id));

  const brandGradientText =
    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400";

  // --- SLIDER LOGIC ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "New Launch: TaskMaster",
      description: "Boost productivity instantly!",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=400&fit=crop",
    },
    {
      title: "Trending: FitTracker Pro",
      description: "Hit your fitness goals with our top-rated app.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=400&fit=crop",
    },
    {
      title: "Editor's Choice: PixelBrush",
      description: "Unlock your creativity with powerful tools.",
      image:
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=400&fit=crop",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20">
      
      {/* 1. FULL-WIDTH HERO SLIDER SECTION */}
      <section className="relative h-[400px] overflow-hidden mb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
          
          {/* SLIDES TRACK */}
          <div
            className="flex transition-transform duration-500 ease-out h-full absolute inset-0"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="min-w-full h-full relative">
                
                {/* Image and Dark Shadow Overlay */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gray-900 opacity-60`} />

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <h2 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-xl font-light text-white/80">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* SLIDER CONTROLS AND DOTS */}
          <Button
            className="absolute left-4 top-1/2 -translate-y-1/2"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={nextSlide}
          >
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
        </div>
      </section>

      {/* 2. CONTAINED APP LIST SECTIONS */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          
          {/* 🔥 TRENDING APPS SECTION (WHERE TRENDING CARDS APPEAR) */}
          <section className="mb-16">
            <h2 className={`text-4xl font-extrabold mb-8 ${brandGradientText}`}>
              🔥 Trending Apps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </section>

          <hr className="border-gray-800 mb-16" />

          {/* CATEGORY SECTIONS */}
          {categories.map((category) => (
            <section key={category} className="mb-16">
              <h2 className="text-4xl font-extrabold mb-8 text-white">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {appsByCategory[category].map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          ))}

          <hr className="border-gray-800 mb-16" />

          {/* LOGIN REDIRECTION SECTION */}
         <section className="mb-16 p-12 rounded-2xl bg-linear-to-br from-gray-900 to-gray-800 border border-teal-500/50 text-center shadow-2xl">
            <h2 className="text-5xl font-extrabold mb-4">
              <span className={brandGradientText}>Unlock the Full Library</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Create an account to download and manage your favorite applications.
            </p>
            {/* The link to the Login page */}
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg text-gray-900 bg-teal-400 hover:bg-teal-300 transition-colors duration-200 active:scale-95"
            >
              Get Started Now
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BrowseApps;

