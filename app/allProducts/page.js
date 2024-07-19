'use client'
import ProductGrid from '../../components/product';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const AllProductsPageContent = () => {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/allProducts?search=${searchQuery}`); // Adjust API endpoint as per your setup
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
  }, [searchQuery]);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 mt-28 ml-6">All Results...</h1>
      <ProductGrid products={products} />
    </div>
  );
};

const AllProductsPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AllProductsPageContent />
  </Suspense>
);

export default AllProductsPage;
