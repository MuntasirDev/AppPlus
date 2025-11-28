// src/pages/AppDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Download, ChevronLeft, CheckCircle, MessageSquare } from 'lucide-react';

// 💡 Import the data source
import { appsData } from '../data/appsData'; 

const AppDetail = () => {
  // 1. Get the 'id' parameter from the URL
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 2. State for the application data
  // Note: Since 'id' is a string from useParams(), we use it to find the match
  const app = appsData.find(a => a.id === id); 

  // 3. Component state for user actions
  const [isInstalled, setIsInstalled] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Handle case where app is not found
  if (!app) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-24 text-center p-8">
        <h1 className="text-3xl font-bold mb-4">404 App Not Found</h1>
        <p className="text-gray-400">The application with ID "{id}" could not be located.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  // --- HANDLERS ---
  const handleInstallClick = () => {
    setIsInstalled(true);
    // In a real app, you'd trigger an API call here
    alert(`Installing ${app.name}... Download started!`); 
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewRating > 0 && reviewText.trim()) {
      // In a real app, this would be an API call to save the review.
      console.log(`Submitting review for ${app.name}: Rating ${reviewRating}, Comment: "${reviewText}"`);
      
      alert(`Review submitted successfully! Thank you.`);
      
      // Reset form state
      setReviewText('');
      setReviewRating(0);
      setIsReviewing(false);
    } else {
      alert('Please provide a rating and a comment.');
    }
  };

  // --- RENDER FUNCTIONS ---

  // Function to render star rating 
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex text-amber-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-5 w-5 fill-amber-400" />
        ))}
        {hasHalfStar && <Star key="half" className="h-5 w-5 fill-amber-400 opacity-50" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-5 w-5 stroke-amber-400 fill-transparent" />
        ))}
      </div>
    );
  };


  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-gray-950 text-white pt-16 md:pt-20">
      
      {/* --- Back Button and Banner --- */}
      <div className="relative w-full h-48 md:h-64 overflow-hidden">
        <img
          src={app.banner}
          alt={`${app.name} banner`}
          className="w-full h-full object-cover brightness-50"
        />
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 p-2 bg-gray-800/80 rounded-full text-white hover:bg-gray-700/90 transition z-10"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto -mt-16 md:-mt-20 px-4">
        
        {/* --- App Header (Thumbnail, Title, Action Button) --- */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-start gap-6">
            <img
              src={app.thumbnail}
              alt={app.name}
              className="h-24 w-24 md:h-32 md:w-32 rounded-2xl object-cover shadow-lg border-2 border-indigo-500"
            />
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-1">{app.name}</h1>
              <p className="text-md text-gray-400 mb-4">By {app.developer} - {app.category}</p>
              
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center text-teal-400">
                  {renderStars(app.rating)}
                  <span className="ml-2">{app.rating}</span>
                </div>
                <div className="text-gray-400">
                  <Download className="h-4 w-4 inline mr-1" />
                  {(app.downloads / 1000000).toFixed(1)}M downloads
                </div>
              </div>
            </div>
            
            {/* --- Install/Uninstall/Review Button --- */}
            <div className="flex-shrink-0">
              {!isInstalled ? (
                <button
                  onClick={handleInstallClick}
                  className="px-6 py-3 bg-indigo-600 rounded-full text-lg font-bold hover:bg-indigo-700 transition shadow-lg whitespace-nowrap"
                >
                  Install App
                </button>
              ) : (
                <div className="flex flex-col items-center">
                  <button
                    className="px-6 py-3 bg-green-600 rounded-full text-lg font-bold transition shadow-lg flex items-center mb-2"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" /> Installed
                  </button>
                  <button
                    onClick={() => setIsReviewing(!isReviewing)}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition flex items-center"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" /> 
                    {isReviewing ? 'Cancel Review' : 'Write a Review'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Main Content Sections --- */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Column 1 & 2: Description and Features --- */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-indigo-400">About this App</h2>
            <p className="text-gray-300 leading-relaxed mb-6">{app.description}</p>

            <h3 className="text-xl font-bold mb-3 text-indigo-300">Key Features</h3>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              {app.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-teal-400 mr-2 flex-shrink-0 mt-1" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 3: Reviews and User Input --- */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-indigo-400">User Reviews</h2>

            {/* --- Review Form (Visible when isReviewing is true) --- */}
            {isInstalled && isReviewing && (
                <div className="bg-gray-800 p-4 rounded-xl mb-6 shadow-md">
                    <h4 className="text-lg font-semibold mb-2">Submit Your Review</h4>
                    <form onSubmit={handleSubmitReview}>
                        <div className="flex items-center mb-3">
                            <span className="mr-2">Your Rating:</span>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                        key={star}
                                        onClick={() => setReviewRating(star)}
                                        className={`h-6 w-6 cursor-pointer transition ${
                                            star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-gray-500 hover:text-amber-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Share your thoughts on the app..."
                            className="w-full p-2 h-20 bg-gray-700 rounded-lg text-white placeholder-gray-400 resize-none mb-3 focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Post Review
                        </button>
                    </form>
                </div>
            )}

            {/* --- Existing Reviews List --- */}
            <div className="space-y-4">
              {app.reviews.length > 0 ? (
                app.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-teal-300">{review.user}</p>
                      <div className="flex items-center text-sm">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm italic">"{review.comment}"</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">No reviews yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-16"></div> {/* Spacer */}
    </div>
  );
};

export default AppDetail;