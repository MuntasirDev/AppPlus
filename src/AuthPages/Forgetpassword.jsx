import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
const brandGradientBackground =
  "bg-gradient-to-r from-indigo-600 to-teal-500";

const primaryButtonClass = `w-full py-3 rounded-xl text-lg font-bold transition shadow-md text-white ${brandGradientBackground} hover:opacity-90`;

const outlineButtonClass =
  "bg-transparent text-white border-2 border-indigo-600 font-semibold py-3 px-8 rounded-lg hover:bg-indigo-600/10 transition-colors text-lg";

const useAuth = () => ({
  
  resetPassword: async (email) => {
    console.log(`Sending reset email to: ${email}`);
    
    return new Promise((resolve) => setTimeout(resolve, 1500));
  },
  
});

const Forgetpassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (err) {
     
      setError(err?.message || "Failed to send reset email. Please try again.");
      setLoading(false);
    }
  };

  
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white py-12 px-4">
        <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-8 space-y-6 text-center">
          <CheckCircle className={`w-16 h-16 mx-auto text-teal-400`} />
          <h2 className="text-3xl font-extrabold text-white">Check Your Email</h2>
          <p className="text-gray-400">
            We've sent password reset instructions to{" "}
            <strong className="text-indigo-400">{email}</strong>. Please check your spam folder.
          </p>
          <Link to="/auth/login" className="inline-block w-full">
            <button className={primaryButtonClass}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white py-12 px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-extrabold text-indigo-400">Reset Password</h2>
          <p className="text-gray-400">
            Enter your email and we'll send instructions to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-500" />
              <input
                id="email"
                type="email"
                placeholder="you@appplus.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
          
          {error && (
            <p className="text-sm text-red-400 text-center font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`${primaryButtonClass} ${loading ? 'opacity-50 cursor-not-allowed flex items-center justify-center' : ''}`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Send Reset Instructions"
            )}
          </button>
        </form>

        <Link to="/auth/login" className="inline-block w-full">
          <button className={`${outlineButtonClass} w-full flex items-center justify-center`}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Forgetpassword;