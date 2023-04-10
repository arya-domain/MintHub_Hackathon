import React from "react";
import "../home.css";
import Logo from "../assets/minthub.png"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useLocation } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';

export const NAV = () => {
  const location = useLocation()
  return (
    <div className="flex header__wrapper bg-gradient-to-t from-black to-purple-500  ">
      <div className="header__logo">
        <a href="/"><img src={Logo} alt="logo" className="max-w-[10%] transform -scale-x-100 float-right" /></a>
      </div>
      <div className="align-middle" >
        {location.pathname !== "/market" ? null :
          <div class="input-group rounded-md border-gray-50 p-4" >
            <button className="px-2 text-sm duration-200 ease-in border-2 border-white rounded-md hover:bg-white hover:text-black">Find</button>
            <input type="search" class="-ml-20 form-control border-2 rounded-md  border-white active:outline-none focus:outline-none outline-none" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          </div>
        }
      </div>
      <div className="text-2xl align-baseline duration-300 ease-in-out header__menuItems">
        <a href="/dashboard" className={`hover:text-2xl active:text-2xl focus:text-2xl opacity-${location.pathname === "/dashboard" ? '100' : '70'} hover:opacity-100`}>
          Dashboard</a>
        <a href="/" className={`hover:text-2xl active:text-2xl focus:text-2xl opacity-${location.pathname === "/portfolio" ? '100' : '70'} hover:opacity-100`}>
          PortFolio</a>
        <a href="/market" className={`hover:text-2xl active:text-2xl focus:text-2xl opacity-${location.pathname === "/market" ? '100' : '70'} hover:opacity-100`}>
          Market</a>
        <a href="/" className={`hover:text-2xl active:text-2xl focus:text-2xl opacity-${location.pathname === "/updates" ? '100' : '70'} hover:opacity-100`}>
          Updates</a>
        <Dropdown className="ease-in-out delay-300  ">
          <Dropdown.Toggle className="py-0 text-[23px] font-bold text-white  bg-opacity-0 opacity-70 border-0 hover:bg-transparent active:bg-transparent focus:bg-transparent hover:text-2xl btnid hover:opacity-100" > 
            Transactions 
          </Dropdown.Toggle>
          <Dropdown.Menu className="text-white bg-opacity-100 bg-gradient-to-t from-black to-purple-500 active:bg-opacity-100 focus:bg-opacity-100">
            <Dropdown.Item href="/cr2cr" className="text-xl hover:opacity-100 hover:bg-transparent ml-2">C2C</Dropdown.Item>
            <Dropdown.Item href="/fundout" className="text-xl hover:opacity-100 hover:bg-transparent ml-2">Fund Out</Dropdown.Item>
            <Dropdown.Item href="/orders" className="text-xl hover:opacity-100 hover:bg-transparent ml-2">Orders</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <a href="/Login" className={`hover:text-2xl active:text-2xl focus:text-2xl opacity-${location.pathname === "/login" ? '100' : '70'} hover:opacity-100`}>
          Login</a>
      </div>

    </div>
  );
}