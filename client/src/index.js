import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Dash } from './dashboard/dashboard';
import { Home } from './homepage/home';
import { Body } from './Market/market';
import Login from './login_register/Login';
import { Signup } from './login_register/register/index.jsx';
import CryptoDetails from './Market/components/CryptoDetails';
import { Transaction } from "./transaction/components/cr2cr"
import { Fundout } from './transaction/components/fundout';
import { Details } from './transaction/components/c2c-details.js';
import { Update } from './updates/update';
 
const router = createBrowserRouter([
  {  
      path: "/",
      element: <Home />,
      
      children: [
        {
          path: "/market",
          element: <Body/>,
          children:[
          {
            path: ":coinId",
            element: <CryptoDetails/>
          }
          ],
        },
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/dashboard",
          element: <Dash/>,
        },
        {
          path: "/register",
          element: <Signup />,
        },
        {
          path: "/cr2cr",
          element: <Transaction />,
        },
        {
          path: "/fundout",
          element: <Fundout />,
        },
        {
          path: "/updates",
          element: <Update />,
        },
        {
          path: "cr2cr/details",
          element: <Details />,
        },
      ],
    },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

