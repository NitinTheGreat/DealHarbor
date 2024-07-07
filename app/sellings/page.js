'use client';
import React, { useEffect, useState } from 'react';

const Sellings = () => {
  const [sales, setSales] = useState([]);
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
      }
    };

    fetchSales();
  }, [userEmail]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto p-4 mt-28">
      <h1 className="text-2xl font-bold mb-4">Your Sales</h1>
      {sales.length === 0 ? (
        <p>No sales found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Date Sold</th>
                <th className="py-2 px-4 border-b">Item</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Product ID</th>
                <th className="py-2 px-4 border-b">User Email</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <React.Fragment key={sale._id}>
                  {sale.items.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50 transition duration-150">
                      <td className="py-2 px-4 border-b">{formatDate(sale.dateOrdered)}</td>
                      <td className="py-2 px-4 border-b">{item.name}</td>
                      <td className="py-2 px-4 border-b text-center">{item.qty}</td>
                      <td className="py-2 px-4 border-b text-right">₹{item.price}</td>
                      <td className="py-2 px-4 border-b text-right">₹{item.total}</td>
                      <td className="py-2 px-4 border-b">{item.productId}</td>
                      <td className="py-2 px-4 border-b">{item.userEmail}</td>
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

export default Sellings;
