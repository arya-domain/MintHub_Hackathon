import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './homepage/home';
import { Body } from './Market/body';
import Login from './login_register/Login';
import Index from './login_register/register';
import CryptoDetails from './Market/context/CryptoDetails';
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
          path: ":coinid",
          element: <CryptoDetails/>
        }
        ],
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Index/>,
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

