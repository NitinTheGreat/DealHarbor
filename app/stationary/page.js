'use client';
import React, { useEffect, useState } from 'react';
import ProductGrid from '../../components/product';
import Preloader from '../../components/Preloader'; // Ensure the path is correct
import styles from '../../styles/Preloader.module.css'; // Ensure the path is correct

const Stationary = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading

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
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchStationary();
  }, []);

  if (loading) {
    return (
      <div className={styles.body}>
        <Preloader /> {/* Show preloader while loading */}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Stationary Products</h1>
      <ProductGrid products={products} />
    </div>
  );
};

export default Stationary;
