'use client';

import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import Preloader from '../../components/Preloader';

// Lazy load the ProductGrid component
const ProductGrid = React.lazy(() => import('../../components/product'));

const Electronics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElectronics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/electronics', {
          params: { page, limit: 16 } // Change limit to 16
        });

        if (response.status === 200) {
          setProducts(response.data.products);
          setTotalPages(response.data.pages);
        } else {
          throw new Error('Failed to fetch electronics');
        }
      } catch (error) {
        console.error('Error fetching electronics:', error);
        setError('Error fetching electronics');
      } finally {
        setLoading(false); // Set loading to false whether successful or not
      }
    };

    fetchElectronics();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setProducts([]); // Reset products for new page
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Electronics</h1>
      {loading ? (
        <Preloader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p>No products found in this category</p>
      ) : (
        <>
          <Suspense fallback={<Preloader />}>
            <ProductGrid products={products} />
          </Suspense>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-8 mb-4">
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-2 mb-4 border rounded ${
            page === currentPage ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Electronics;
