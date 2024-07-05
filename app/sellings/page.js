'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SellerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const sellerEmail = typeof window !== 'undefined' ? localStorage.getItem('email') : '';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/seller/orders?sellerEmail=${encodeURIComponent(sellerEmail)}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (sellerEmail) {
      fetchOrders();
    }
  }, [sellerEmail]);

  return (
    <div className="container mx-auto p-4 mt-28">
      <h1 className="text-2xl font-bold mb-4">Your Sellings</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Date Ordered</th>
                <th className="py-2 px-4 border-b">User Email</th>
                <th className="py-2 px-4 border-b">Item</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.items.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition duration-150">
                    <td className="py-2 px-4 border-b">{new Date(order.dateOrdered).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{order.userEmail}</td>
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b text-center">{item.qty}</td>
                    <td className="py-2 px-4 border-b text-right">₹{item.price}</td>
                    <td className="py-2 px-4 border-b text-right">₹{item.price * item.qty}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SellerOrdersPage;
