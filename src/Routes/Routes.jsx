import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Layout/Dashboard";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ResisterPage from "../Pages/ResisterPage/ResisterPage";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
           path:'/',
           element:<Home></Home>
        },
        {
          path:'/login',
          element:<LoginPage></LoginPage>
        },
        {
          path:'/resister',
          element:<ResisterPage></ResisterPage>
        }
      ]
    },
    {
        path:'dashboard',
        element:<Dashboard></Dashboard>
    }
  ]);