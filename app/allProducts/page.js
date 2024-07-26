'use client';
import ProductGrid from '../../components/product';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProtectedRoute from '../../components/Protectedcomp'
const AllProductsPageContent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNoResults, setShowNoResults] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/allProducts?search=${searchQuery}`); // Adjust API endpoint as per your setup
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
    
    // Set timeout to display "No results found" if no results are fetched within 10 seconds
    const timer = setTimeout(() => {
      if (loading) {
        setShowNoResults(true);
      }
    }, 10000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (showNoResults && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">No results found</p>
      </div>
    );
  }

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

export default ProtectedRoute(AllProductsPage);
