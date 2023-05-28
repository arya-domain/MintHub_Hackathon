import React from "react";
import "../home.css";
import Logo from "../assets/minthub.png"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useLocation } from "react-router-dom";
import { Col, Dropdown, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

const token = localStorage.getItem("authtoken");

export const NAV = () => {
  const location = useLocation()
  const token = localStorage.getItem("authtoken");
  const fname = localStorage.getItem("fname");
  const lname = localStorage.getItem("lname");
  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("fname");
    localStorage.removeItem("lname");
    localStorage.removeItem("email");
    window.location.assign("/dashboard");
  }

  return (
    <div >
      <Row className="header__wrapper flex bg-gradient-to-t from-black to-purple-500  mr-0">
        <Col>
          <div className="header__logo">
            <Link to="/"><img src={Logo} alt="logo" className="max-w-[10%] transform -scale-x-100 float-right" /></Link>
          </div>
        </Col>
        <Col className="text-2xl align-baseline duration-300 ease-in-out rounded-md header__menuItems ">
          <Link to="/dashboard" className={`hover:text-2xl active:text-2xl focus:text-2xl opacity-${location.pathname === "/dashboard" ? '100' : '70'} hover:opacity-100`}>
            Dashboard</Link>
          <Link to="/mintswap" className={`hover:text-2xl active:text-2xl focus:text-2xl opacity-${location.pathname === "/mintswap" ? '100' : '70'} hover:opacity-100`}>
            MintSwap</Link>
          <Link to="/market" className={`hover:text-2xl active:text-2xl focus:text-2xl opacity-${location.pathname === "/market" ? '100' : '70'} hover:opacity-100`}>
            Market</Link>
          <Dropdown className="ease-in-out delay-300 ">
            <Dropdown.Toggle className={`py-0 text-[23px] font-bold text-white  bg-opacity-0 ${location.pathname.match(/\/(market|cr2cr|fundout|c2c\/details|orders)/) ? 'opacity-100' : 'opacity-70'} border-0 hover:bg-transparent active:bg-transparent focus:bg-transparent hover:text-2xl btnid hover:opacity-100`} >
              Transactions
            </Dropdown.Toggle>
            <Dropdown.Menu className="text-white bg-opacity-100 bg-gradient-to-t from-black to-purple-500 active:bg-opacity-100 focus:bg-opacity-100">
              <Dropdown.Item href="/cr2cr" className="ml-2 text-xl hover:opacity-100 hover:bg-transparent">C2C</Dropdown.Item>
              <Dropdown.Item href="/fundout" className="ml-2 text-xl hover:opacity-100 hover:bg-transparent">Fund Out</Dropdown.Item>
              <Dropdown.Item href="/orders" className="ml-2 text-xl hover:opacity-100 hover:bg-transparent">Orders</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {token ?
            (
              <Dropdown className="ease-in-out delay-300 ">
                <Dropdown.Toggle className="py-0 text-[23px] font-bold text-white  bg-opacity-0 opacity-70 border-0 hover:bg-transparent active:bg-transparent focus:bg-transparent hover:text-2xl btnid hover:opacity-100" >
                  {fname} {lname}
                </Dropdown.Toggle>
                <Dropdown.Menu className="text-white bg-opacity-100 opacity-100 bg-gradient-to-t from-black to-purple-500 active:bg-opacity-100 focus:bg-opacity-100">
                  <Dropdown.Item className="ml-2 text-xl hover:opacity-100 hover:bg-transparent" href="/dashboard">Account Details</Dropdown.Item>
                  <Dropdown.Item className="ml-2 text-xl hover:opacity-100 hover:bg-transparent" onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/Login" className={`hover:text-2xl active:text-2xl focus:text-2xl opacity-${location.pathname === "/login" ? '100' : '70'} hover:opacity-100`}>
                Login</Link>
            )}
        </Col>
      </Row>
    </div >
  );
}