// pages/electronics.js
'use client'
import React, { useEffect, useState } from 'react';
import ProductGrid from '../../components/product';

const Electronics = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const response = await fetch('/api/electronics');
        if (!response.ok) {
          throw new Error('Failed to fetch electronics');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching electronics:', error);
      }
    };

    fetchElectronics();
  }, []);

  return (
    <div>
      <h1>Electronics</h1>
      <ProductGrid products={products} />
    </div>
  );
};

export default Electronics;
