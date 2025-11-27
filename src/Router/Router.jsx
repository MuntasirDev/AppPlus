import { createBrowserRouter } from "react-router"; // Keeping the user's requested import path
import HomeLayouts from "../Layouts/HomeLayouts";
import Home from "../Pages/Home";
import BrowseApps from "../Pages/browseApps";
import Login from "../AuthPages/Login";
import Auth from "../AuthPages/Auth";
import Register from "../AuthPages/Register";

// The loader function remains unchanged
const appsLoader = async () => {
    const response = await fetch("/Apps.json");
    if (!response.ok) {
        throw new Error("Failed to load Apps data.");
    }
    return response.json();
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayouts />,
        children: [
            {
                // Root path of the application when using HomeLayouts
                index: true,
                element: <Home />,
            },
            {
                // Full path: /apps
                path: "apps",
                element: <BrowseApps />,
                loader: appsLoader,
            },
        ],
    },
    {
        // Top-level route for authentication views
        path: "auth",
        element: <Auth />,
        children: [
            {
                // ✅ FIX: Path must be "login" (relative) or "/auth/login" (absolute).
                // Using the relative path "login" here. Full path is /auth/login.
                path: "/auth/login", 
                element: <Login></Login>,
            },

            {
              path: "/auth/register",
              element: <Register></Register>
            }
        ],
    },
]);