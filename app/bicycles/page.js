'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

import ProductGrid from '../../components/product';

const BicyclesPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBicycles = async () => {
      try {
        const response = await axios.get('/api/bicycles'); // Use axios.get for GET requests
        console.log(response);
        
        if (!response || response.status !== 200) {
          throw new Error('Failed to fetch bicycles');
        }
        
        setProducts(response.data); // Use response.data to get the JSON data
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
