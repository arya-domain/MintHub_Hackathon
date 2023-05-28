import React from "react";
import Eth from "../eth.svg";
import { Link } from "react-router-dom";

function Header(props) {

  const { address, isConnected, connect } = props;

  return (
    <header>
      <div className=" position-relative left-[45%] text-4xl font-black opacity-80">MintSwap</div>
      <div className="rightH">
        <div className="connectButton" onClick={connect}>
          {isConnected ? (address.slice(0, 4) + "..." + address.slice(38)) : "Connect"}
        </div>
      </div>
    </header>
  );
}

export default Header;
