'use client';
import React, { useEffect, useState } from 'react';
import Preloader from '../../components/Preloader';
import ProtectedRoute from '../../components/Protectedcomp'
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

  const totalOrders = orders.length;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mt-4">Orders</h1>
          <p className="text-gray-500">View and manage your recent orders.</p>
        </div>
        <div className="bg-white  rounded-lg shadow-md p-6 transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 mr-2">Total Orders</span>
            <span className="text-2xl font-bold animate-pulse">{totalOrders}</span>
          </div>
        </div>
      </div>
      {loading ? (
        <Preloader />
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="mt-8">
  <div className="mt-8">
  <div className="bg-white rounded-lg shadow-md overflow-x-auto">
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-100 text-gray-600">
          <th className="py-3 px-4 text-left">Date Ordered</th>
          <th className="py-3 px-4 text-left">Item</th>
          <th className="py-3 px-4 text-left">Quantity</th>
          <th className="py-3 px-4 text-left">Price</th>
          <th className="py-3 px-4 text-left">Total</th>
          <th className="py-3 px-4 text-left">Seller Email</th>
          <th className="py-3 px-4 text-left">Seller Phone</th>
        </tr>
      </thead>
      <tbody>
        {orders.flatMap((order) =>
          order.items.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300"
            >
              <td className="py-4 px-4">{new Date(order.dateOrdered).toLocaleDateString()}</td>
              <td className="py-4 px-4">{item.name}</td>
              <td className="py-4 px-4 text-center">{item.qty}</td>
              <td className="py-4 px-4 text-right">₹{item.price.toFixed(2)}</td>
              <td className="py-4 px-4 text-right">₹{(item.price * item.qty).toFixed(2)}</td>
              <td className="py-4 px-4">{item.sellerEmail}</td>
              <td className="py-4 px-4">{item.sellerPhone}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

</div>

      )}
    </div>
  );
};

export default ProtectedRoute(Orders);
