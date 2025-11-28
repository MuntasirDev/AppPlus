// src/pages/AppDetail.jsx (Refactored to match Template Layout)

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom'; 
// Note: ChevronLeft is no longer used but kept in imports
import { Star, Download, ChevronLeft, CheckCircle, MessageSquare } from 'lucide-react'; 

// Placeholder for useToast and useAuth if you haven't defined them:
const useToast = () => ({
  toast: ({ title, description }) => alert(`${title}: ${description}`),
});
const useAuth = () => ({ user: { uid: 'guest_user' } }); 

// Helper function (outside component)
const formatDownloads = (downloads) => { 
    if (downloads >= 1000000) {
        return `${(downloads / 1000000).toFixed(1)}M`;
    }
    if (downloads >= 1000) {
        return `${(downloads / 1000).toFixed(1)}K`;
    }
    return downloads.toString();
};

const AppDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const loadedAppsData = useLoaderData();
  const app = loadedAppsData.find(a => String(a.id) === id); 

  // --- STATE MANAGEMENT ---
  const [isInstalled, setIsInstalled] = useState(false);
  const [hasEverInstalled, setHasEverInstalled] = useState(false); 
  const [newReviews, setNewReviews] = useState([]); 
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false); // Used to toggle review form visibility

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  // Load install status from localStorage on mount
  useEffect(() => {
    if (id && user) {
      const installKey = `app_installed_${id}_${user.uid}`;
      const everInstalledKey = `app_ever_installed_${id}_${user.uid}`;
      setIsInstalled(localStorage.getItem(installKey) === "true");
      setHasEverInstalled(localStorage.getItem(everInstalledKey) === "true");
    }
  }, [id, user]);

  if (!app) { /* ... 404 block ... */ }

  const allReviews = [...newReviews, ...app.reviews];
  
  // --- HANDLERS (Unchanged logic) ---
  const handleInstallToggle = () => { /* ... */ };
  const handleSubmitReview = (e) => { /* ... */ };
  const renderStars = (rating) => { /* ... */ };


  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-gray-950 text-white pt-16 md:pt-20">
      
      {/* 1. BANNER (Full Width) */}
      {/* The template uses h-[300px] and a gradient overlay for styling */}
      <div className="relative w-full h-[300px] overflow-hidden"> 
        <img
          src={app.banner}
          alt={`${app.name} banner`}
          className="w-full h-full object-cover brightness-50" 
        />
        {/* Gradient overlay emulating the template's Card/background blending */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/50 to-transparent" />
      </div>
      

      {/* 2. MAIN CONTENT WRAPPER */}
      {/* Note: Template uses 'container mx-auto' which is typically fixed/max-width. We use max-w-4xl and fixed the negative margin. */}
      <div className="max-w-4xl mx-auto mt-32 md:mt-20 px-4"> 
        
        {/* 3. GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/*       LEFT COLUMN: App Info, Description, Features, Reviews (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 3.1 APP INFO (Emulating Card) */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-800">
              <div className="flex items-start gap-6">
                <img
                  src={app.thumbnail}
                  alt={app.name}
                  className="h-24 w-24 md:h-32 md:w-32 rounded-2xl object-cover shadow-lg border-2 border-indigo-500 shrink-0"
                />
                
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-1">{app.name}</h1>
                  <p className="text-md text-gray-400 mb-4">By {app.developer} - {app.category}</p>
                  
                  <div className="flex items-center gap-6 text-sm font-medium">
                    <div className="flex items-center text-teal-400 gap-2">
                      {renderStars(app.rating)}
                      <span className="font-semibold">{app.rating}</span>
                    </div>
                    <div className="text-gray-400 flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      <span>{formatDownloads(app.downloads)} downloads</span>
                    </div>
                  </div>
                </div>
                
                {/* Install/Uninstall Button (Moved to align with template) */}
                <div className="shrink-0 flex flex-col items-end">
                  <button
                    onClick={handleInstallToggle}
                    className={`px-6 py-3 rounded-full text-lg font-bold transition shadow-lg whitespace-nowrap ${
                      isInstalled 
                        ? "bg-red-600 hover:bg-red-700" 
                        : "bg-indigo-600 hover:bg-indigo-700" // Emulating 'gradient-primary'
                    }`}
                  >
                    {isInstalled ? "Uninstall" : "Install App"}
                  </button>
                  
                  {/* Toggle Review Button is removed here, as the form is now a dedicated sticky sidebar item */}
                </div>
              </div>
            </div>
            
            {/* 3.2 DESCRIPTION (Emulating Card) */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-indigo-400">About this App</h2>
              <p className="text-gray-300 leading-relaxed mb-4">{app.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                  {app.category}
                </span>
              </div>
            </div>

            {/* 3.3 FEATURES (Emulating Card) */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-indigo-300">Key Features</h3>
              <ul className="space-y-2 text-gray-300">
                {app.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-teal-400 mr-2 shrink-0 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3.4 USER REVIEWS (Emulating Card) */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-indigo-400">User Reviews</h2>
              
              <div className="space-y-4">
                {allReviews.length > 0 ? (
                  allReviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-700 pb-4 last:border-0"> 
                      <div className="flex items-center gap-2 mb-2">
                        {/* Note: Template uses User icon, we use MessageSquare if imported, or just the name */}
                        <p className="font-medium text-teal-300">{review.user}</p>
                        <div className="flex items-center gap-1 ml-auto">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm italic">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No reviews yet. Be the first!</p>
                )}
              </div>
            </div>
          </div>


          {/*       RIGHT COLUMN: Submit Review (lg:col-span-1) */}
          <div className="lg:col-span-1">
            {/* Review Form (Emulating Sticky Card) */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 sticky top-20"> 
              <h4 className="text-lg font-bold mb-4 text-white">Submit a Review</h4>
              
              <form onSubmit={handleSubmitReview} className="space-y-4">
                
                {/* Rating Input (Star Picker) */}
                <div className="space-y-2">
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-300">Rating (1-5)</label>
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
                
                {/* Review Textarea */}
                <div className="space-y-2">
                  <label htmlFor="review" className="block text-sm font-medium text-gray-300">Review</label>
                  <textarea
                    id="review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this app..."
                    className="w-full p-3 h-28 bg-gray-700 rounded-lg text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-indigo-500"
                    required
                    rows={4}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={!hasEverInstalled} // Disable if never installed
                  className={`w-full py-2 rounded-lg font-semibold transition ${
                    hasEverInstalled ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  Post Review
                </button>
                
                {/* Installation Requirement Message */}
                {!hasEverInstalled && (
                  <p className="text-sm text-gray-400 text-center mt-2">
                    Install the app to submit a review
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
        
        <div className="h-16"></div> {/* Spacer */}
      </div>
    </div>
  );
};

export default AppDetail;