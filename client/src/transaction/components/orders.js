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
    <div className="bg-gray-800 text-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div><h1 className="text-4xl">C2C Transaction</h1>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order._id} className="bg-gray-700 p-4 rounded-lg shadow-md mb-4">
          
            <p className="text-xl font-medium mb-2 cursor-pointer" onClick={() => toggleExpanded(order._id)}>Order ID: {order._id}</p>
            {expandedOrderId === order._id && (
              <div className="mt-2">
                <p className="text-lg mb-2">Sending Amount: {order.sending_amt}</p>
                <p className="text-lg mb-2">Charge: {order.charge}</p>
                <p className="text-lg mb-2">Total: {order.total}</p>
                <p className="text-lg mb-2">Account No.: {order.account_no}</p>
                <p className="text-lg mb-2">Bank Name: {order.bankname}</p>
                <p className="text-lg mb-2">IFSC: {order.ifsc}</p>
                <p className="text-lg mb-2">Address: {order.address}</p>
              </div>
            )}
            <hr className="my-2 border-gray-600"/> {/* Add a horizontal line to separate orders */}
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
    </div>
  );
}