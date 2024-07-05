'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Checkout = () => {
  const [orders, setOrders] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('email') : '';
  const userName = typeof window !== 'undefined' ? localStorage.getItem('username') : '';
  const router = useRouter();

  useEffect(() => {
    const cartProducts = localStorage.getItem('cartProducts');
    if (cartProducts) {
      const parsedCartProducts = JSON.parse(cartProducts);
      setOrders(parsedCartProducts);
      calculateSubTotal(parsedCartProducts);
    }
  }, []);

  const calculateSubTotal = (orders) => {
    let total = 0;
    for (let item of orders) {
      total += item.price * item.qty;
    }
    setSubTotal(total);
  };

  const handleBuyNow = async () => {
    try {
      await axios.post('/api/Order', {
        userEmail,
        items: orders,
        subTotal
      });
      localStorage.removeItem('cartProducts');
      router.push('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-28">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Item</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition duration-150">
                <td className="py-2 px-4 border-b">{order.name}</td>
                <td className="py-2 px-4 border-b text-center">{order.qty}</td>
                <td className="py-2 px-4 border-b text-right">₹{order.price}</td>
                <td className="py-2 px-4 border-b text-right">₹{order.price * order.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <span className="text-xl font-semibold">Subtotal: ₹{subTotal}</span>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150"
          onClick={handleBuyNow}
        >
          BUY NOW
        </button>
        <Link href="/" className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-150">
          Back to Shop
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
