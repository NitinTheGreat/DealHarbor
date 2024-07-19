'use client';
import React, { useEffect, useState } from 'react';
import Preloader from '../../components/Preloader';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('email') : '';

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
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  return (
    <div className="container mx-auto p-4 mt-28">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {loading ? (
        <Preloader />
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
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
                    <tr key={index} className="border-t hover:bg-gray-50 transition duration-150">
                      <td className="py-2 px-4 border-b">{new Date(order.dateOrdered).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b">{item.name}</td>
                      <td className="py-2 px-4 border-b text-center">{item.qty}</td>
                      <td className="py-2 px-4 border-b text-right">₹{item.price}</td>
                      <td className="py-2 px-4 border-b text-right">₹{item.price * item.qty}</td>
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
