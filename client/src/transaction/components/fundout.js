import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Fundout = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const email = localStorage.getItem("email")
  const [balance, setBalance] = useState(null);
  const [currentAccount, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);
  const [receiver, setData] = useState({
    upi_id: "",
    symval: "",
    symbol: "BTC",
    txnid: "",
  });
  const [currency, setCurr] = useState("INR");
  const crval = { INR: 10000 };
  const [prices, setPrices] = useState({});
  const cryptoval = receiver.symval * prices[currency];
  const totalamt =
    receiver.symval * prices[currency] -
    (0.02 * cryptoval < cryptoval + 300 ? 0.02 * cryptoval : cryptoval + 300);

  const allValues = {
    currentAccount,
    ...receiver,
    currency,
    available_INR: crval[currency],
    cryptoval: cryptoval,
    totalamt: totalamt,
    email: email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if ((balance >= receiver.symval) && (receiver.symval) && (receiver.symval > 0) && (crval[currency] >= receiver.symval * prices[currency]) && (receiver.symval * prices[currency] >= 500)) {
        const url = "http://localhost:8080/api/fundout";
        const { data: res } = await axios.post(url, allValues);
        setTimeout(() => {
          alert("Transaction completed successfully!");
        }, 10000);
        navigate("/orders");
        console.log(res.message);
      }
      else {
        alert("Conditions Not Satisfied");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

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
    const textToCopy = "0xe845f8786533E0d380E6b5e3f3BA56fcC599D9Bd";
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
      <h1 className="text-center text-transparent bg-clip-text bg-gradient-to-t from-slate-100 to-purple-700 font-extrabold text-2xl">
        {" "}
        * Note : Transaction Will Not Be Possible If The The Crypto Withdrawing
        Amount Is Less Than 500 (INR){" "}
      </h1>
      <div class="row mr-0 py-[7.5%]">
        <div class="col-sm-4 ">
          <div class="card ml-6 mr-0 h-[500px] ">
            <div class="card-body  border-white border-2 rounded-lg  bg-gradient-to-b from-black to-purple-600 ">
              <h5 class="card-title text-center text-5xl font-extrabold bg-clip-text bg-gradient-to-t from-gray-200 to-purple-800 text-transparent">
                Details
              </h5>
              <table>
                <tbody>
                  <tr>
                    <th colSpan="2" className="pb-4">
                      <p className="text-2xl whitespace-nowrap">
                        {" "}
                        Balance : {balance}
                      </p>
                      <p>
                        <button
                          onClick={connected ? disconnectWallet : connectWallet}
                          className="text-[16px] font-bold border-[1px] border-white rounded-lg px-2 hover:bg-gradient-to-t from-black to-purple-600 focus:bg-gradient-to-t"
                        >
                          {connected ? "Connected" : "Connect To Wallet"}
                        </button>
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap pb-2 font-bold">Receiving Currency </td>
                    <td>:</td>
                    <td className="my-1 py-1 text-xl font-bold pb-2 relative left-[-30%]">
                      INR
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-2 font-bold">Available Amount </td>
                    <td>:</td>
                    <td className="my-1 py-1 text-xl font-bold pb-2 relative left-[-30%]">{crval[currency]}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Crypto Selected</td>
                    <td>:</td>
                    <td className="my-1 py-1 text-xl font-bold pb-2 relative left-[-30%]">{receiver.symbol}</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowarp font-bold">Crypto Value (INR)</td>
                    <td>:</td>
                    <td className="my-1 py-1 text-xl font-bold pb-2 relative left-[-30%]">
                      {(receiver.symval * prices[currency]).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="font-bold">
                        Service Charge <br />
                        <small className="text-sm  whitespace-nowrap font-bold">
                          Whichever is Lower
                        </small>{" "}
                      </div>{" "}
                    </td>
                    <td>:</td>
                    <td className="my-1 py-1 text-xl font-bold pb-2 relative left-[-30%] whitespace-nowrap"> 2% or ₹ 300</td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className="whitespace-nowarp font-bold inline">Receiving Amount</td>
                    <td>:</td>
                    <td className="mx-2 text-green-500 font-bold my-1 py-1 text-xl pb-2 relative left-[-30%]">
                      {totalamt.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-2xl font-bold">
                      {(balance >= receiver.symval) &&
                        (receiver.symval) &&
                        (receiver.symval > 0) &&
                        (crval[currency] >= receiver.symval * prices[currency]) &&
                        (receiver.symval * prices[currency] >= 500)
                        ? "Wallet Address"
                        : null}{" "}
                    </td>
                    <td className="mx-2">
                      {balance >= receiver.symval &&
                        (receiver.symval) &&
                        (receiver.symval > 0) &&
                        (crval[currency] >= receiver.symval * prices[currency]) &&
                        (receiver.symval * prices[currency] >= 500) ? (
                        <p
                          className="whitespace-nowrap border-2 border-green-500 px-2 rounded-lg py-1 text-justify text-green-500 font-bold"
                          onClick={handleClick}
                          style={{ cursor: "pointer" }}
                        >
                          Copy Address
                        </p>
                      ) : (
                        <p className=" text-red-600 font-bold whitespace-nowrap relative right-[50%]">
                          Transaction Not Possible Yet
                        </p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="card ml-2 mr-6 h-[500px]">
            <div class="card-body bg-black border-white border-2 rounded-lg space-y-4">
              <h5 class="card-title text-center text-5xl font-extrabold bg-clip-text bg-gradient-to-t from-gray-200 to-purple-800 text-transparent">
                Fund Out
              </h5>
              <div className=" mx-40 py-2">
                <Row>
                  <Col>
                    <label className="py-2 px-4 font-bold text-2xl whitespace-nowrap">
                      Your UPI ID{" "}
                    </label>
                  </Col>
                  <Col>
                    <input
                      value={receiver.upi_id}
                      onChange={handleSetChange}
                      type="text"
                      className="form-control "
                      placeholder="UPI ID"
                      aria-describedby="basic-addon1"
                      name="upi_id"
                      onInput={(event) =>
                        (event.target.value = event.target.value.toLowerCase())
                      }
                      required
                    />
                  </Col>
                </Row>
              </div>
              <div className=" mx-40 py-2 -pb-2">
                <Row>
                  <Col>
                    <label className="py-2 px-4 font-bold text-2xl whitespace-nowrap">
                      Crypto Id For Funding Out
                    </label>
                  </Col>
                  <Col>
                    <select
                      value={receiver.symbol}
                      className="custom-select  rounded-md bg-gray-700 py-2 px-4 text-xl font-bold items-center mb-2"
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
              <div className=" mx-40 py-2">
                <Row>
                  <Col>
                    <label className="py-2 px-4 font-bold text-2xl whitespace-nowrap">
                      Amount Of Crytpo To FundOut
                    </label>
                  </Col>
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
              <div className=" mx-40 py-2">
                <Row>
                  <Col>
                    <label className="py-2 px-4 font-bold text-2xl whitespace-nowrap">
                      Transaction ID
                    </label>
                  </Col>
                  <Col>
                    <input
                      value={receiver.txnid}
                      onChange={handleSetChange}
                      type="text"
                      className="form-control"
                      placeholder="Txn Id"
                      aria-describedby="basic-addon1"
                      name="txnid"
                      required
                    />
                  </Col>
                </Row>
              </div>
              <a
                class="btn btn-primary relative left-[90%] "
                href="/orders"
                onClick={handleSubmit}
              >
                Submit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
