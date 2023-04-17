import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem("authtoken");

    axios.post('http://localhost:8080/api/auth/getuser', {}, {
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

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpanded = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  }

  return (
    <div className="text-white text-xl text-center min-h-screen justify-content-center align-items-center bg-gradient-to-b from-black via-purple-700 to-black pt-4">
      <div className=""><h1 className="text-4xl font-extrabold">C2C Transactions</h1><br></br>
        {orders.length > 0 ? (
          orders.map(order => (

            <div key={order._id} className="card bg-black border-white w-1/2 mx-auto">
              <p className="text-xl font-medium mb-2 cursor-pointer" onClick={() => toggleExpanded(order._id)}>Order ID: {order._id}</p>
              {expandedOrderId === order._id && (

                <table className="mt-2">
                  <tbody>
                    <tr>
                      <td><p className="text-lg mb-2 text-left px-5">Sending Amount:</p></td>
                      <td><p className="text-lg mb-2 text-left px-5">{order.sending_amt}</p></td>
                    </tr>
                    <tr>
                      <td><p className="text-lg mb-2 text-left px-5">Charge:</p></td>
                      <td><p className="text-lg mb-2 text-left px-5">{order.charge}</p></td>
                    </tr>
                    <tr>
                      <td><p className="text-lg mb-2 text-left px-5">Total:</p></td>
                      <td><p className="text-lg mb-2 text-left px-5">{order.total}</p></td>
                    </tr>
                    <tr>
                      <td><p className="text-lg mb-2 text-left px-5">Account No.:</p></td>
                      <td><p className="text-lg mb-2 text-left px-5">{order.account_no}</p></td>
                    </tr>
                    <tr>
                      <td><p className="text-lg mb-2 text-left px-5">Bank Name:</p></td>
                      <td><p className="text-lg mb-2 text-left px-5">{order.bankname}</p></td>
                    </tr>
                    <tr>
                      <td><p className="text-lg mb-2 text-left px-5">IFSC:</p></td>
                      <td><p className="text-lg mb-2 text-left px-5">{order.ifsc}</p></td>
                    </tr>
                    <tr>
                      <td><p className="text-lg mb-2 text-left px-5">Address:</p></td>
                      <td><p className="text-lg mb-2 text-left px-5">{order.address}</p></td>
                    </tr>
                  </tbody>
                </table>

              )}
              <hr className="my-2 border-l-white" /> {/* Add a horizontal line to separate orders */}
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}