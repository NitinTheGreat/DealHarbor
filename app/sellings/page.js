'use client';
import React, { useEffect, useState } from 'react';
import Preloader from '../../components/Preloader';
import ProtectedRoute from "../../components/Protectedcomp"
const Sellings = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('email') : '';

  useEffect(() => {
    const fetchSales = async () => {
      try {
        if (!userEmail) {
          throw new Error('User email not found in local storage');
        }

        const response = await fetch(`/api/sales?email=${encodeURIComponent(userEmail)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sales');
        }

        const data = await response.json();
        console.log('Sales fetched:', data.sales);
        setSales(data.sales);
      } catch (error) {
        console.error('Error fetching sales:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [userEmail]);

  const totalSales = sales.reduce((acc, sale) => acc + sale.items.length, 0);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mt-4">Your Sales</h1>
          <p className="text-gray-500">Overview of all your sales transactions.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 mr-2">Total Sales</span>
            <span className="text-2xl font-bold animate-pulse">{totalSales}</span>
          </div>
        </div>
      </div>
      {loading ? (
        <Preloader />
      ) : sales.length === 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500">No sales found.</p>
        </div>
      ) : (
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="py-3 px-4 text-left">Date Sold</th>
                  <th className="py-3 px-4 text-left">Item</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-left">Product ID</th>
                  <th className="py-3 px-4 text-left">User Email</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) =>
                  sale.items.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                    >
                      <td className="py-4 px-4">{formatDate(sale.dateOrdered)}</td>
                      <td className="py-4 px-4">{item.name}</td>
                      <td className="py-4 px-4 text-center">{item.qty}</td>
                      <td className="py-4 px-4 text-right">₹{item.price.toFixed(2)}</td>
                      <td className="py-4 px-4 text-right">₹{(item.price * item.qty).toFixed(2)}</td>
                      <td className="py-4 px-4">{item.productId}</td>
                      <td className="py-4 px-4">{item.userEmail}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute(Sellings);
