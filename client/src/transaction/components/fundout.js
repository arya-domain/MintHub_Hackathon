import React, { useState, useEffect } from "react";
import Web3 from "web3";

export const Fundout = () => {
  const [balance, setBalance] = useState(null);
  const [connected, setConnected] = useState(false);
  const [receiver, setData] = useState({ account_no: "", bankname: "", ifsc: "", address: "", symval: "", symbol: "" })
  const [currency, setCurr] = useState("INR");
  const crval = { INR: 100, USD: 200, EUR: 300, JPY: 400, AED: 500 }

  const handleSetChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSetChange2 = (event) => {
    const { name, value } = event.target;
    setCurr(value);
  }

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
    <div className="text-2xl text-white bg-black ">
      <div class="row">
        <div class="col-sm-4">
          <div class="card ml-6 mr-2">
            <div class="card-body bg-black border-white border-2 rounded-lg h-[600px] bg-gradient-to-b from-black to-purple-600">
              <div className=" py-2">
                <h1> Balance : {balance}</h1>
                <button onClick={connected ? disconnectWallet : connectWallet} className="text-[16px] font-bold border-[1px] border-white rounded-lg px-2 hover:bg-gradient-to-t from-black to-purple-600 focus:bg-gradient-to-t">
                  {connected ? "Connected" : "Connect To Wallet"}
                </button>
              </div>
              <div className="space-y-3">
                <label className="my-1 " htmlFor="sender-currency">
                  Receiving Currency :
                </label>
                <select
                  value={currency}
                  className="custom-select my-1 mr-sm-2 rounded-md bg-gray-700 px-4 py-2 ml-6 text-xl"
                  id="sender-currency"
                  name="scr"
                  onChange={handleSetChange2}
                >
                  <option value="INR">INR</option>
                  <option value="JPY">JPY</option>
                  <option value="USD">USD</option>
                  <option value="AED">AED</option>
                  <option value="EUR">EUR</option>
                </select>
                <p>Available Amount : {crval[currency]}</p>
                <p>Crypto Selected : {receiver.symbol}</p>
                <p>Crypto Amount : {receiver.symval}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="card ml-2 mr-6">
            <div class="card-body bg-black border-white border-2 rounded-lg">
              <h5 class="card-title text-center text-5xl font-extrabold bg-clip-text bg-gradient-to-t from-gray-200 to-purple-800 text-transparent">Fund Out</h5>
              <div className="space-y-2 mx-40">
                <label className="py-2 px-4 font-bold text-2xl">Your Bank Name </label>
                <input
                  value={receiver.bankname}
                  onChange={handleSetChange}
                  type="text"
                  className="form-control "
                  placeholder="Bank Name"
                  aria-describedby="basic-addon1"
                  name="bankname"
                  onInput={event => event.target.value = event.target.value.toUpperCase()}
                  required
                />
              </div>
              <div className="space-y-2 mx-40">
                <label className="py-2 px-4 font-bold text-2xl">IFSC Code Of Bank</label>
                <input
                  value={receiver.ifsc}
                  onChange={handleSetChange}
                  type="text"
                  className="form-control"
                  placeholder="IFSC Code"
                  aria-describedby="basic-addon1"
                  name="ifsc"
                  onInput={event => event.target.value = event.target.value.toUpperCase()}
                  required
                />
              </div>
              <div className="space-y-2 mx-40">
                <label className="py-2 px-4 font-bold text-2xl">Enter Your Account Number </label>
                <input
                  value={receiver.account_no}
                  onChange={handleSetChange}
                  type="number"
                  className="form-control"
                  placeholder="Account Number"
                  aria-describedby="basic-addon1"
                  name="account_no"
                  required
                />
              </div>
              <div className="space-y-2 mx-40">
                <label className="py-2 px-4 font-bold text-2xl">Your Bank Address</label>
                <input
                  value={receiver.address}
                  onChange={handleSetChange}
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  aria-describedby="basic-addon1"
                  name="address"
                  onInput={event => event.target.value = event.target.value.toUpperCase()}
                  required
                />
              </div>
              <div className="space-y-2 mx-40">
                <label className="py-2 px-4 font-bold text-2xl">Crypto Id For Funding Out</label>
                <select
                  value={receiver.symbol}
                  className="custom-select my-3 mr-sm-2 rounded-md bg-gray-700 px-4 py-1  ml-6 text-xl"
                  id="symbol"
                  name="symbol"
                  onChange={handleSetChange}
                >
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>
              <div className="space-y-2 mx-40">
                <label className="py-2 px-4 font-bold text-2xl">
                  Amount Of Crytpo To FundOut
                </label>
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
              </div>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


