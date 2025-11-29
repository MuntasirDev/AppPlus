import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { Star, Download, CheckCircle, User } from "lucide-react";

const useToast = () => ({
  toast: ({ title, description }) => {
    console.log(`TOAST - ${title}: ${description}`);
  },
});
const useAuth = () => ({
  user: {
    uid: "guest_user",
    displayName: "AppReviewer",
  },
});

const formatDownloads = (downloads) => {
  if (downloads >= 1000000) {
    return `${(downloads / 1000000).toFixed(1)}M`;
  }
  if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(1)}K`;
  }
  return downloads.toString();
};

const DisplayStars = ({ rating }) => (
  <div className="flex items-center gap-1 text-amber-400">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${
          star <= rating ? "fill-amber-400" : "text-gray-500"
        }`}
      />
    ))}
  </div>
);

const InteractiveStars = ({ rating, setRating }) => (
  <div className="flex">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        onClick={() => setRating(star)}
        className={`h-6 w-6 cursor-pointer transition ${
          star <= rating
            ? "fill-amber-400 text-amber-400"
            : "text-gray-500 hover:text-amber-300"
        }`}
      />
    ))}
  </div>
);

const CustomCard = ({ children, className = "" }) => (
  <div
    className={`bg-gray-800 rounded-xl shadow-md border border-gray-700 ${className}`}
  >
    {children}
  </div>
);

const CustomCardHeader = ({ children }) => (
  <div className="p-6 border-b border-gray-700">{children}</div>
);

const CustomCardTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-indigo-400">{children}</h2>
);

const CustomCardContent = ({ children, className = "p-6" }) => (
  <div className={className}>{children}</div>
);

const AppDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const loadedAppsData = useLoaderData() || [];
  const app = loadedAppsData.find((a) => String(a.id) === id);

  const [isInstalled, setIsInstalled] = useState(false);
  const [hasEverInstalled, setHasEverInstalled] = useState(false);
  const [newReviews, setNewReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (id && user) {
      const installKey = `app_installed_${id}_${user.uid}`;
      const everInstalledKey = `app_ever_installed_${id}_${user.uid}`;
      setIsInstalled(localStorage.getItem(installKey) === "true");
      setHasEverInstalled(localStorage.getItem(everInstalledKey) === "true");
    }
  }, [id, user]);

  if (!app) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">404 - App Not Found</h1>
      </div>
    );
  }

  const handleInstallToggle = useCallback(() => {
    const newInstallState = !isInstalled;
    setIsInstalled(newInstallState);

    if (newInstallState) {
      setHasEverInstalled(true);
      if (user && id) {
        localStorage.setItem(`app_installed_${id}_${user.uid}`, "true");
        localStorage.setItem(`app_ever_installed_${id}_${user.uid}`, "true");
      }
    } else {
      if (user && id) {
        localStorage.setItem(`app_installed_${id}_${user.uid}`, "false");
      }
    }

    toast({
      title: newInstallState ? "App Installed" : "App Uninstalled",
      description: newInstallState
        ? `${app.name} has been installed successfully!`
        : `${app.name} has been uninstalled.`,
    });
  }, [isInstalled, app.name, id, user, toast]);

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!hasEverInstalled) {
      toast({
        title: "Cannot Submit Review",
        description: "You must install the app before submitting a review.",
      });
      return;
    }

    if (reviewRating < 1 || reviewRating > 5) {
      toast({
        title: "Invalid Rating",
        description: "Please select a star rating between 1 and 5.",
      });
      return;
    }

    if (reviewText.trim().length === 0) {
      toast({
        title: "Review Required",
        description: "Please write your review comment.",
      });
      return;
    }

    const newReview = {
      user: user?.displayName || "Anonymous User",
      rating: reviewRating,
      comment: reviewText,
    };

    setNewReviews((prev) => [newReview, ...prev]);
    setReviewText("");
    setReviewRating(0);

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
  };

  const allReviews = [...newReviews, ...app.reviews];

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative h-[300px] rounded-2xl overflow-hidden mb-8">
          <img
            src={app.banner}
            alt={app.name}
            className="w-full h-full object-cover brightness-75"
          />

          <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-800">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={app.thumbnail}
                  alt={app.name}
                  className="w-24 h-24 rounded-2xl shadow-lg border-2 border-indigo-500 shrink-0"
                />
                <div className="flex-1">
                  <h1 className="text-4xl font-extrabold mb-1">{app.name}</h1>
                  <p className="text-gray-400 mb-4">{app.developer}</p>
                  <div className="flex gap-6 text-sm font-medium">
                    <div className="flex items-center gap-2 text-teal-400">
                      <Star className="h-5 w-5 fill-teal-400" />
                      <span className="font-semibold">{app.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Download className="h-5 w-5" />
                      <span>{formatDownloads(app.downloads)} downloads</span>
                    </div>
                  </div>
                </div>
                <button
                  className={`px-6 py-3 rounded-xl text-lg font-bold transition shadow-lg whitespace-nowrap shrink-0 
                                        ${
                                          isInstalled
                                            ? "bg-red-600 hover:bg-red-700"
                                            : "bg-indigo-600 hover:bg-indigo-700"
                                        }`}
                  onClick={handleInstallToggle}
                >
                  {isInstalled ? "Uninstall" : "Install"}
                </button>
              </div>
            </div>

            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle>About this app</CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {app.description}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                    {app.category}
                  </span>
                </div>
              </CustomCardContent>
            </CustomCard>

            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle>Features</CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent>
                <ul className="space-y-3 text-gray-300">
                  {app.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-400 mt-1 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CustomCardContent>
            </CustomCard>

            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle>User Reviews</CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent className="p-6 space-y-4">
                {allReviews.length > 0 ? (
                  allReviews.map((review, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-700 pb-4 last:border-0"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold text-teal-300">
                          {review.user}
                        </span>
                        <div className="flex items-center gap-1 ml-auto">
                          <DisplayStars rating={review.rating} />
                        </div>
                      </div>
                      <p className="text-gray-400 italic">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic">
                    No reviews yet. Be the first!
                  </p>
                )}
              </CustomCardContent>
            </CustomCard>
          </div>

          <div className="lg:col-span-1">
            <CustomCard className="sticky top-20">
              <CustomCardHeader>
                <CustomCardTitle>Submit a Review</CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent>
                <form onSubmit={handleSubmitReview} className="space-y-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Rating (1-5)
                    </label>
                    <InteractiveStars
                      rating={reviewRating}
                      setRating={setReviewRating}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="review"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Review
                    </label>
                    <textarea
                      id="review"
                      placeholder="Share your experience with this app..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full p-3 h-28 bg-gray-700 rounded-lg text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-indigo-500 border border-gray-600"
                      required
                      rows={4}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 rounded-xl text-lg font-bold transition shadow-md ${
                      hasEverInstalled
                        ? "bg-indigo-600 hover:bg-indigo-700" // gradient-primary replacement
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!hasEverInstalled}
                  >
                    Post Review
                  </button>

                  {!hasEverInstalled && (
                    <p className="text-sm text-gray-400 text-center">
                      Install the app to submit a review
                    </p>
                  )}
                </form>
              </CustomCardContent>
            </CustomCard>
          </div>
        </div>
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default AppDetail;
