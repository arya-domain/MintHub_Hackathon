import React, { useState, useEffect } from "react";

import axios from 'axios';
import { Col, Row } from "antd";
export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem("authtoken");

    axios.post('http://localhost:8080/api/auth/getorder', {}, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${authToken}`
      }
    })
      .then(response => {
        const ordersData = response.data.uData;
        console.log(ordersData); // Print orders to the console or do something else with the data
        setOrders(ordersData); // Store orders in state
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("authtoken");

    axios.post('http://localhost:8080/api/auth/getfund', {}, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${authToken}`
      }
    })
      .then(response => {
        const fundsData = response.data.uData;
        console.log(fundsData); // Print orders to the console or do something else with the data
        setFunds(fundsData); // Store orders in state
      })
      .catch(error => console.error(error));
  }, []);

  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [expandedFundId, setExpandedFundId] = useState(null);

  const toggleExpanded = (orderId, fundId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    setExpandedFundId(expandedFundId === fundId ? null : fundId);
  }

  const [checked, setChecked] = useState(true);
  const handleToggle = val => {
    setChecked(val)
  };

  return (
    <div className="text-white text-xl text-center min-h-screen justify-content-center align-items-center bg-gradient-to-b from-black via-purple-700 to-black pt-4">
      <Row className="mx-20">
        <div className="position-relative left-[20%]"><h1 className="text-4xl font-extrabold">C2C Transactions</h1><br></br>
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order._id} className="card bg-black border-white w-1/2 mx-auto mb-4 rounded-xl py-2">
                <p className="text-xl font-medium mb-2 cursor-pointer" onClick={() => toggleExpanded(order._id)}>Order ID: {order._id}</p>
                {expandedOrderId === order._id && (

                  <table className="mt-2">
                    <tbody>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">Sending Amount:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">{order.sending_amt}</p></td>
                      </tr>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">Charge:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">{order.charge}</p></td>
                      </tr>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">Total:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">{order.total}</p></td>
                      </tr>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">Account No.</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">{order.account_no}</p></td>
                      </tr>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">Bank Name:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">{order.bankname}</p></td>
                      </tr>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">IFSC:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">{order.ifsc}</p></td>
                      </tr>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">Address:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">:</p></td>
                        <td><p className="text-lg mb-2 text-left px-5">{order.address}</p></td>
                      </tr>
                    </tbody>
                  </table>

                )}

              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>

        <div className="position-relative left-[40%]"><h1 className="text-4xl font-extrabold ">Fundout Transactions</h1><br></br>
          {funds.length > 0 ? (
            funds.map(fund => (

              <div key={fund._id} className="card bg-black border-white w-1/2 mx-auto mb-4 rounded-xl py-2">
                <p className="text-xl font-medium mb-2 cursor-pointer" onClick={() => toggleExpanded(fund._id)}>Order ID: {fund._id}</p>
                {expandedOrderId === fund._id && (

                  <table className="mt-2">
                    <tbody>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">Available INR:</p></td>
                        <td><p className="text-lg mb-2 text-left">{fund.available_INR}</p></td>
                      </tr>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">Crypto Value:</p></td>
                        <td><p className="text-lg mb-2 text-left">{fund.cryptoval}</p></td>
                      </tr>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">Currency:</p></td>
                        <td><p className="text-lg mb-2 text-left">{fund.currency}</p></td>
                      </tr>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">Current Account:</p></td>
                        <td><p className="text-lg mb-2 text-left">{fund.currentAccount}</p></td>
                      </tr>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">Symbol:</p></td>
                        <td><p className="text-lg mb-2 text-left">{fund.symbol}</p></td>
                      </tr>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">Crypto Sending Amount:</p></td>
                        <td><p className="text-lg mb-2 text-left">{fund.symval}</p></td>
                      </tr>
                      <tr>
                        <td><p className="text-lg mb-2 text-left px-5">UPI ID:</p></td>
                        <td><p className="text-lg mb-2 text-left">{fund.upi_id}</p></td>
                      </tr>
                    </tbody>
                  </table>
                )}

              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </Row>
    </div>
  );
}