'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductGrid from '../../components/product';

const BicyclesPage = () => {
  const [products, setProducts] = useState([]);

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
      }
    };

    fetchBicycles();
  }, []);

  return (
    <div>
      <h1>Bicycles</h1>
      <ProductGrid products={products} />
    </div>
  );
};

export default BicyclesPage;
