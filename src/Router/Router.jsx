import { createBrowserRouter } from "react-router-dom";
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
import Privateroute from "../Provider/Privateroute";
import Forgetpassword from "../AuthPages/Forgetpassword";

const appsLoader = async () => {
  // ... (unchanged)
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
        path: "my-profile",
        element: (
          <Privateroute>
            <MyProfile />
          </Privateroute>
        ),
      },
      {
        path: "app/:id",
        element: (
          <Privateroute>
            <AppDetail />
          </Privateroute>
        ),
        loader: appsLoader,
      },
      {
        path: "Our-Goals",
        element: <AboutOurGoals />,
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <Forgetpassword></Forgetpassword>
      }
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
