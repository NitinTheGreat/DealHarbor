'use client'
import ProductGrid from '../../components/product';
import { useEffect, useState } from 'react';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/allProducts'); // Adjust API endpoint as per your setup
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">All Products</h1>
      <ProductGrid products={products} />
    </div>
  );
};

export default AllProductsPage;
