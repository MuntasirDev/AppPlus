import React, { useState } from "react";
import { useLoaderData , Link } from "react-router-dom"; 
import { ChevronLeft, ChevronRight, Star, Download } from "lucide-react";
import Icon from "../assets/icon.png"
const TESTIMONIALS = [
    {
        id: 1,
        user: "John Marston",
        app: "FocusFLow",
        comment: "This is the best place to discover new tools. The 'FocusFLow' app I found here boosted my productivity immediately!",
        rating: 5,
       
        avatarSrc: "https://via.placeholder.com/40/004d99/FFFFFF?text=A", 
        borderColor: "border-indigo-500",
    },
    {
        id: 2,
        user: "Arthur Morgan",
        app: "FitTracker Pro",
        comment: "Finding reliable open-source apps used to be a headache. The curated collection here, especially 'FitTracker Pro', is fantastic.",
        rating: 5,
        
        avatarSrc: "https://via.placeholder.com/40/009688/FFFFFF?text=C", 
        borderColor: "border-teal-500",
    },
    {
        id: 3,
        user: "Jack Marston",
        app: "DesignGenie",
        comment: "Great platform! The app descriptions and user reviews helped me choose the perfect Design tool, 'DesignGenie'.",
        rating: 4,
        
        avatarSrc: Icon, 
        borderColor: "border-violet-500",
    },
];
const AppCard = ({ app }) => (
 <Link
    to={`/app/${app.id}`} 
    className="block bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300 cursor-pointer group"
   
  >
    <div className="flex items-center gap-4">
      <img
        src={app.thumbnail}
        alt={app.name}
        className="h-14 w-14 rounded-xl object-cover"
      />
      <div className="flex flex-col overflow-hidden">
        <h3 className="text-lg font-semibold text-white truncate group-hover:text-indigo-400 transition-colors">
            {app.name}
        </h3>
        <p className="text-xs text-gray-400 truncate">By {app.developer || "Unknown"}</p>
      </div>
    </div>
    
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
        {(app.downloads / 1000000).toFixed(1)}M
      </div>
    </div>
 </Link>
);
const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-full bg-gray-900/50 text-white shadow-lg hover:bg-gray-800/80 transition-colors active:scale-95 ${className}`}
  >
    {children}
  </button>
);
const BrowseApps = () => {
const appsData = useLoaderData();
if (!appsData || appsData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-20 text-center py-20">
        No app data available.
      </div>
    );
}
const brandGradientText ="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400";
const cardClass ="bg-gray-900 rounded-xl p-0 border border-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all hover:-translate-y-1";
const trendingApps = [...appsData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
const categories = ["Productivity", "Health", "Creativity"];
const appsByCategory = categories.reduce((acc, category) => {acc[category] = appsData.filter((app) => app.category === category);
    return acc;
  }, {});
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
const nextSlide = () => {setCurrentSlide((prev) => (prev + 1) % slides.length);};
const prevSlide = () => {setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);};
return (
<div className="min-h-screen bg-gray-950 text-white pt-20">
<section className="relative h-[400px] overflow-hidden mb-16">
<div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
  <div className="flex transition-transform duration-500 ease-out h-full absolute inset-0" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>

            {slides.map((slide, index) => (
              <div key={index} className="min-w-full h-full relative">
              <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gray-900 opacity-60`} /> 
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
     <Button className="absolute left-4 top-1/2 -translate-y-1/2"onClick={prevSlide}>
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
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <section className="mb-16">
            <h2 className={`text-4xl font-extrabold mb-8 ${brandGradientText}`}>
               Trending Apps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </section>
<hr className="border-gray-800 mb-16" />{categories.map((category) => (
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
          ))}<hr className="border-gray-800 mb-16" />
<section className="py-16"><div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold mb-4">
                            <span className={brandGradientText}>What Users Are Saying</span>
                        </h2>
                        <p className="text-xl text-gray-400">
                            Trusted by developers and creators worldwide.
                        </p>
                    </div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((review) => (
                            <div key={review.id} className={cardClass}>
                                <div className="p-6">
                                  <div className="flex text-teal-400 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`h-5 w-5 mr-1 ${
                                                    i < review.rating 
                                                        ? "fill-teal-400 text-teal-400" 
                                                        : "fill-gray-700 text-gray-700"
                                                }`} 
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-200 italic mb-4">
                                        "{review.comment}"
                                    </p>
                                   <div className="flex items-center pt-4 border-t border-gray-800">
                                        <img src={`${Icon}`}className={`w-10 bg-white h-10 rounded-full mr-3 border-2 ${review.borderColor}`} 
                                        />
                                        <div><p className="font-semibold text-white">{review.user}</p><p className="text-sm text-indigo-400">Reviewing: {review.app}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default BrowseApps;