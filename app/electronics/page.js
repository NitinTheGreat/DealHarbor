// pages/electronics.js
'use client'
import React, { useEffect, useState } from 'react';
import ProductGrid from '../../components/product';
import Preloader from '../../components/Preloader';

const Electronics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchElectronics();
  }, []);

  return (
    <div>
      <h1>Electronics</h1>
      {loading ? (
        <Preloader />
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default Electronics;
