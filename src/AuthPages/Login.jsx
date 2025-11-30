import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { AuthContext } from "../Provider/AuthProvider";

const textGradientClass =
  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500";

const brandGradientBackground = "bg-gradient-to-r from-indigo-600 to-teal-500";

const Login = () => {
  const navigate = useNavigate();

  const { signIn, signInWithGoogle } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    signIn(email, password)
      .then((result) => {
        const user = result.user;
       

        navigate("/");

        form.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/invalid-credential") {
          alert(
            "Login Failed: Incorrect email or password. Please try again or reset your password."
          );
        } else {
          alert(`Login Failed: ${errorCode} - ${errorMessage}`);
        }
      });
  };

  const handleGoogleClick = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        // console.log("Google user logged in:", user);
        navigate("/");
      })
      .catch((error) => {
        // console.error("Google Sign-In Failed:", error);
        alert(`Google Sign-In Failed: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 text-white">
           {" "}
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl shadow-2xl">
               {" "}
        <header className="p-6 space-y-2 text-center border-b border-gray-800">
                   {" "}
          <h1 className="text-3xl font-extrabold tracking-tight">
                        Welcome Back          {" "}
          </h1>
                   {" "}
          <p className="text-gray-400">
                        Sign in to your account to continue          {" "}
          </p>
                 {" "}
        </header>
               {" "}
        <div className="p-6 space-y-6">
                   {" "}
          <form onSubmit={handleSubmit} className="space-y-4">
                       {" "}
            <div className="space-y-2">
                           {" "}
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none block text-gray-300"
              >
                                Email              {" "}
              </label>
                           {" "}
              <input
                name="email"
                type="email"
                placeholder="you@appplus.com"
                required
                className="flex h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              />
                         {" "}
            </div>
                       {" "}
            <div className="space-y-2">
                           {" "}
              <div className="flex items-center justify-between">
                               {" "}
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none block text-gray-300"
                >
                                    Password                {" "}
                </label>
                               {" "}
                <Link
                  to="/auth/forgot-password"
                  className={`text-sm hover:underline font-medium ${textGradientClass}`}
                >
                                    Forgot password?                {" "}
                </Link>
                             {" "}
              </div>
                           {" "}
              <input
                name="password"
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="flex h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              />
                         {" "}
            </div>
                       {" "}
            <button
              type="submit"
              className={`w-full h-10 inline-flex items-center justify-center rounded-lg text-sm font-medium text-white shadow-lg transition-all duration-200 ${brandGradientBackground} hover:opacity-90 active:scale-[0.98]`}
            >
                            Sign In            {" "}
            </button>
                     {" "}
          </form>
                   {" "}
          <div className="relative">
                       {" "}
            <div className="absolute inset-0 flex items-center">
                           {" "}
              <div className="w-full border-t border-gray-700"></div>           {" "}
            </div>
                       {" "}
            <div className="relative flex justify-center text-sm">
                           {" "}
              <span className="bg-gray-900 px-2 text-gray-500">
                                Or continue with              {" "}
              </span>
                         {" "}
            </div>
                     {" "}
          </div>
                   {" "}
          <button
            type="button"
            className="w-full h-10 inline-flex items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-800 transition-colors duration-200 active:scale-[0.98]"
            onClick={handleGoogleClick}
          >
                        <BsGoogle className="mr-2 h-5 w-5 " />            Sign
            in with Google          {" "}
          </button>
                   {" "}
          <p className="text-center text-sm text-gray-500">
                        Don't have an account?            {" "}
            <Link
              to="/auth/register"
              className={`hover:underline font-medium ${textGradientClass}`}
            >
                            Sign up            {" "}
            </Link>
                     {" "}
          </p>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default Login;
