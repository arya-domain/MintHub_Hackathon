import React, { useState, useEffect } from "react";
import Web3 from "web3";


export const Fundout = () => {
  const [balance, setBalance] = useState(null);
  const [cryptoName, setCryptoName] = useState("ETH");
  const [connected, setConnected] = useState(false);
  const [receiver, setData] = useState({ account_no: "", bankname: "", ifsc: "", address: "" })
  const [currency, setCurr] = useState();
  const crval = { INR: 100, USD: 200, EUR: 300, JPY: 400, AED: 500 }

  const handleSetChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setCurr(value);
  };
  

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="text-2xl text-white bg-black ">
      <div className="mr-6 mb-6 text-right">
        <h1> {balance} : {cryptoName} Balance</h1>
        <button onClick={connected ? disconnectWallet : connectWallet} className="text-[20px] font-bold border-[1px] border-white rounded-lg px-2 hover:bg-gradient-to-t from-black to-purple-600 focus:bg-gradient-to-t">
          {connected ? "Connected" : "Connect To Wallet"}
        </button>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <div class="card ml-6 mr-2">
            <div class="card-body bg-black border-white border-2 rounded-lg">
              <div>
                <label className="my-1  px-0" htmlFor="sender-currency">
                  Receiving Currency
                </label>
                <select
                  value={currency}
                  className="custom-select my-1 mr-sm-2 rounded-md bg-gray-700 px-5 py-2 ml-6 text-xl"
                  id="sender-currency"
                  name="scr"
                  onChange={handleSetChange}
                >
                  <option value="INR" >INR</option>
                  <option value="JPY">JPY</option>
                  <option value="USD">USD</option>
                  <option value="AED">AED</option>
                  <option value="EUR">EUR</option>
                </select>
                <p>MAX Available Amount : {crval[currency]}</p>
              </div>
              <p class="card-text">Coin 1</p>
              <p class="card-text">Coin 2</p>
              <p class="card-text">Coin 3</p>
              <p class="card-text">Coin 4</p>
              <p class="card-text">Coin 5</p>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="card ml-2 mr-6">
            <div class="card-body bg-black border-white border-2 rounded-lg">
              <h5 class="card-title">Special title treatment</h5>
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
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


