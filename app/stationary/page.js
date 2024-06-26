// pages/stationary.js
'use client'
import React, { useEffect, useState } from 'react';
import ProductGrid from '../../components/product';

const Stationary = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchStationary = async () => {
      try {
        const response = await fetch('/api/stationary');
        if (!response.ok) {
          throw new Error('Failed to fetch stationary products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching stationary products:', error);
      }
    };

    fetchStationary();
  }, []);

  return (
    <div>
      <h1>Stationary Products</h1>
      <ProductGrid products={products} />
    </div>
  );
};

export default Stationary;
