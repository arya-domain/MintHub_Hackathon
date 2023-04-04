import React from "react";
import "../home.css";
import Logo from "../assets/minthub.png"
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useLocation } from "react-router-dom";

export const NAV = () => {
  const location = useLocation()
  return (
    <div className="flex-auto header__wrapper bg-gradient-to-t from-black to-purple-500">
      <div className="header__logo">
        <a href="/"><img src={Logo} className="max-w-[10%] transform -scale-x-100 float-right" /></a>
      </div>
      <div>
        {location.pathname != "/market" ? null :
          <div class="input-group rounded-md border-gray-50 p-4" >
            <button className="px-2 text-sm duration-200 ease-in border-2 border-white rounded-md hover:bg-white hover:text-black">Find</button>
            <input type="search" class="form-control border-2 rounded-md  border-white active:outline-none focus:outline-none outline-none" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          </div>
        }
      </div>
      <div className="header__menuItems">
        <a href="/">Dashboard</a>
        <a href="/">PortFolio</a>
        <a href="/market">Market</a>
        <a href="/">Updates</a>
        <a href="/Login">Login</a>
      </div>
    </div>
  );
}