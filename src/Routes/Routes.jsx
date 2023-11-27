import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Layout/Dashboard";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ResisterPage from "../Pages/ResisterPage/ResisterPage";
import AllSurvey from "../Pages/AllSurveys/allSurvey";
import SurveyDetails from "../Pages/AllSurveys/SurveyDetails";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import SurveyorHome from "../Pages/Dashboard/SurveyorHome/SurveyorHome";
import SurveyCreation from "../Pages/Dashboard/SurveyCreation/SurveyCreation";
import AllVoter from "../Pages/Dashboard/AllVoters/AllVoter";
import Payment from "../Pages/proUser/payment/Payment";
import ProUser from "../Pages/proUser/proUser/ProUser";
import ProUserHome from "../Pages/Dashboard/ProUserHome/ProUserHome";
import PrivateRoute from "./PrivateRoute";


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
        },
        {
          path:'/allSurveys',
          element:<AllSurvey></AllSurvey>
        },
        {
          path:'/surveyDetails/:id',
          element:<PrivateRoute><SurveyDetails></SurveyDetails></PrivateRoute>
          // loader:({params})=>fetch(`http://localhost:5000/surveys/${params.id}`)
        },
        {
          path:'/proUser',
          element:<PrivateRoute><ProUser></ProUser></PrivateRoute>
        },
        {
          path:'/payment',
          element:<Payment></Payment>
        }
      ]
    },
    {
        path:'dashboard',
        element:<Dashboard></Dashboard>,
        children:[
          {
            path:'adminHome',
            element:<AdminHome></AdminHome>
          },
          {
            path:'allUsers',
            element:<AllUsers></AllUsers>
          },
          {
            path:'surveyorHome',
            element:<SurveyorHome></SurveyorHome>
          },
          {
             path:'proUserHome',
             element:<ProUserHome></ProUserHome>
          },
          {
            path:'addSurvey',
            element:<SurveyCreation></SurveyCreation>
          },
          {
            path:'allVoters',
            element:<AllVoter></AllVoter>
          },
          {
            path:'userHome',
            element:<AllVoter></AllVoter>
          }
        ]

    }
  ]);