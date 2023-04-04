import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './homepage/home';
import { Body } from './Market/body';
import Login from './login_register/Login';
import { Signup } from './login_register/register/index.jsx';
import CryptoDetails from './Market/context/CryptoDetails';
import {Main} from "./login_register/Main/index.jsx"
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
        path: "/Main",
        element: <Main/>,
      },
      {
        path: "/register",
        element: <Signup />,
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

