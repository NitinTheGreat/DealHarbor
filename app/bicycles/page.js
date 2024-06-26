// pages/bicycles/index.js

'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductGrid from '../../components/product';
import BikeLoader from '../../components/bicyclePreloader'

const BicyclesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBicycles = async () => {
      try {
        const response = await axios.get('/api/bicycles');
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          throw new Error('Failed to fetch bicycles');
        }
      } catch (error) {
        console.error('Error fetching bicycles:', error);
      } finally {
        setLoading(false); // Set loading to false whether successful or not
      }
    };

    fetchBicycles();
  }, []);

  return (
    <div>
      <h1>Bicycles</h1>
      {loading ? (
        <BikeLoader /> // Show the loader while fetching data
      ) : (
        <ProductGrid products={products} /> // Show product grid when data is fetched
      )}
    </div>
  );
};

export default BicyclesPage;
