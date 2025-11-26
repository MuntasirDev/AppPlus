import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts";
import Home from "../Pages/Home";
import BrowseApps from "../Pages/browseApps";



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
    children:[
      {
        path:"/",
        element: <Home></Home>
      },
      {
        path:"/apps", 
        element: <BrowseApps></BrowseApps>,
        loader: appsLoader 
      }
    ]
  },
]);