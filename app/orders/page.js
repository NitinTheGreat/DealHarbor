'use client';
import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!userEmail) {
          throw new Error('User email not found in local storage');
        }

        const response = await fetch(`/api/Order?email=${encodeURIComponent(userEmail)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        console.log('Orders fetched:', data.orders);
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userEmail]);

  return (
    <div className="container mx-auto p-4 mt-28">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date Ordered</th>
                <th className="py-2 px-4 border-b">Item</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Seller Email</th>
                <th className="py-2 px-4 border-b">Seller Phone</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2 px-4 border-b">{new Date(order.dateOrdered).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b">{item.name}</td>
                      <td className="py-2 px-4 border-b text-center">{item.quantity}</td>
                      <td className="py-2 px-4 border-b text-right">₹{item.price}</td>
                      <td className="py-2 px-4 border-b text-right">₹{item.total}</td>
                      <td className="py-2 px-4 border-b">{item.sellerEmail}</td>
                      <td className="py-2 px-4 border-b">{item.sellerPhone}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;