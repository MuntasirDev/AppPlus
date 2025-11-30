import { createBrowserRouter } from "react-router"; // Keeping the user's requested import path
import HomeLayouts from "../Layouts/HomeLayouts";
import Home from "../Pages/Home";
import BrowseApps from "../Pages/browseApps";
import Login from "../AuthPages/Login";
import Auth from "../AuthPages/Auth";
import Register from "../AuthPages/Register";
import AppDetail from "../Pages/AppsDetails";
import MyProfile from "../Pages/MyProfile";
import Error from "../Pages/Error";
import AboutOurGoals from "../Pages/AboutOurGoals";

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
       
        index: true,
        element: <Home />,
      },
      {
       
        path: "apps",
        element: <BrowseApps />,
        loader: appsLoader,
      },
      {
        path: "/my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "app/:id",
        element: <AppDetail></AppDetail>,
        loader: appsLoader,
      },
      {
        path:"Our-Goals",
        element: <AboutOurGoals></AboutOurGoals>
      }
    ],
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },

      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "*",
    element:<Error></Error>
  }
]);
