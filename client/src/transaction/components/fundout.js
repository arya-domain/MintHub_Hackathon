import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Col, Row } from "react-bootstrap";

export const Fundout = () => {
  const [balance, setBalance] = useState(null);
  const [currentAccount, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);
  const [receiver, setData] = useState({ upi_id: "", symval: "", symbol: "BTC" })
  const [currency, setCurr] = useState("INR");
  const crval = { INR: 100, USD: 200, EUR: 300, JPY: 400, AED: 500 }
  const [prices, setPrices] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${receiver.symbol}&tsyms=USD,INR,JPY,AED,EUR`
      );
      const data = await response.json();
      setPrices(data);
    }
    fetchData();
  }, [receiver.symbol]);

  const handleSetChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleClick = () => {
    const textToCopy = '0xe845f8786533E0d380E6b5e3f3BA56fcC599D9Bd';
    navigator.clipboard.writeText(textToCopy);
  };

  // Metamask wallet connection portion start
  useEffect(() => {
    if (connected) {
      const getBalance = async () => {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
            const accounts = await web3.eth.getAccounts();
            const balanceInWei = await web3.eth.getBalance(accounts[0]);
            const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
            setBalance(balanceInEther);
          } catch (error) {
            console.error(error);
          }
        }
      };
      getBalance();
      async function loadWeb3() {
        if (window.ethereum) {
          await window.ethereum.enable();
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
        }
      }
      loadWeb3();
    }
  }, [connected]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        setConnected(!connected);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setBalance(null);
  };
  // Metamask wallet connection portion end



  return (
    <div className="text-2xl text-white bg-gradient-to-b from-black via-purple-600 to-black  mr-0 ">
      <div class="row mr-0 py-[13.5%]">
        <div class="col-sm-4 ">
          <div class="card ml-6 mr-0 h-[350px] ">
            <div class="card-body  border-white border-2 rounded-lg  bg-gradient-to-b from-black to-purple-600 ">
              <h5 class="card-title text-center text-5xl font-extrabold bg-clip-text bg-gradient-to-t from-gray-200 to-purple-800 text-transparent">Details</h5>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">
                      <p className="text-2xl whitespace-nowrap"> Balance : {balance}</p>
                      <p>
                        <button onClick={connected ? disconnectWallet : connectWallet} className="text-[16px] font-bold border-[1px] border-white rounded-lg px-2 hover:bg-gradient-to-t from-black to-purple-600 focus:bg-gradient-to-t">
                          {connected ? "Connected" : "Connect To Wallet"}
                        </button>
                      </p>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="whitespace-nowrap">Receiving Currency :</td>
                    <td className="my-1  rounded-lg bg-transparent px-2 py-1 text-xl ">
                      INR
                    </td>
                  </tr>
                  <tr>
                    <td>Available Amount (INR):</td>
                    <td className="mx-2">{crval[currency]}</td>
                  </tr>
                  <tr>
                    <td>Crypto Selected :</td>
                    <td className="mx-2">{receiver.symbol}</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowarp">Crypto Value (INR) :</td>
                    <td className="mx-2">{(receiver.symval * prices[currency]).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td> {(balance >= receiver.symval) && (receiver.symval) && (receiver.symval > 0) ? 'Wallet Address :' : null} </td>
                    <td className="mx-2">
                      {(balance >= receiver.symval) && (receiver.symval) && (receiver.symval > 0) ? (
                        <div className="whitespace-nowrap border-2 border-white px-2 rounded-lg py-1 text-justify " onClick={handleClick} style={{ cursor: 'pointer' }}>
                          Copy Address
                        </div>
                      ) : (
                        <div className=" text-red-600 font-bold whitespace-nowrap relative right-[69%]">Transaction Not Possible Yet</div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="card ml-2 mr-6 h-[350px]">
            <div class="card-body bg-black border-white border-2 rounded-lg space-y-4">
              <h5 class="card-title text-center text-5xl font-extrabold bg-clip-text bg-gradient-to-t from-gray-200 to-purple-800 text-transparent">Fund Out</h5>
              <div className=" mx-40">
                <Row>
                  <Col><label className="py-2 px-4 font-bold text-2xl whitespace-nowrap">Your UPI ID </label></Col>
                  <Col>
                    <input
                      value={receiver.upi_id}
                      onChange={handleSetChange}
                      type="text"
                      className="form-control "
                      placeholder="UPI ID"
                      aria-describedby="basic-addon1"
                      name="upi_id"
                      onInput={event => event.target.value = event.target.value.toLowerCase()}
                      required
                    />
                  </Col>
                </Row>
              </div>
              <div className=" mx-40">
                <Row>
                  <Col><label className="py-2 px-4 font-bold text-2xl whitespace-nowrap">Crypto Id For Funding Out</label></Col>
                  <Col>
                    <select
                      value={receiver.symbol}
                      className="custom-select  rounded-md bg-gray-700 py-2 px-4 text-xl items-center mb-2"
                      id="symbol"
                      name="symbol"
                      onChange={handleSetChange}
                    >
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="USDT">USDT</option>
                    </select>
                  </Col>
                </Row>
              </div>
              <div className=" mx-40">
                <Row>
                  <Col><label className="py-2 px-4 font-bold text-2xl whitespace-nowrap">Amount Of Crytpo To FundOut</label></Col>
                  <Col>
                    <input
                      value={receiver.symval}
                      onChange={handleSetChange}
                      type="number"
                      className="form-control"
                      placeholder="Cypto Amount"
                      aria-describedby="basic-addon1"
                      name="symval"
                      required
                    />
                  </Col>
                </Row>
              </div>
              <a class="btn btn-primary relative left-[90%] " href="/orders">Submit</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


