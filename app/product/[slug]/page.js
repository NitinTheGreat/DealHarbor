'use client';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../../context/CartContext'; // Adjust the path as necessary
import Image from 'next/image';
import Preloader from '../../../components/Preloader';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import ProtectedRoute from "../../../components/Protectedcomp";
import { Button } from '@/components/ui/button';

const Product = ({ params }) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.slug}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  const handleAddToCart = () => {
    console.log("Add to Cart button clicked"); // Debugging
    if (product) {
      const itemCode = params.slug;
      const price = product.price;
      const name = product.name;
      const productId = product.productId;
      const sellerName = product.sellerName;
      const sellerEmail = product.sellerEmail;
      const sellerPhone = product.sellerPhone;

      // Retrieve cart items from localStorage
      const storedProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

      // Check if the product already exists in cart
      const existingProductIndex = storedProducts.findIndex(item => item.itemCode === itemCode);

      if (existingProductIndex !== -1) {
        // Product already exists, increase quantity by 1
        storedProducts[existingProductIndex].qty += 1;
      } else {
        // Product doesn't exist, add it to cart with quantity 1
        storedProducts.push({
          itemCode,
          price,
          qty: 1,
          name,
          productId,
          sellerName,
          sellerEmail,
          sellerPhone,
        });
      }

      // Update localStorage with modified cart items
      localStorage.setItem('cartProducts', JSON.stringify(storedProducts));

      // Call addToCart function from context to update cart state
      addToCart(itemCode, price, 1, name);

      // Show toast notification
      toast.success('Item added to cart!');
    }
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const indexOfUnderscore = params.slug.indexOf('_');
  const Sellername =
    indexOfUnderscore !== -1 ? params.slug.substring(0, indexOfUnderscore) : params.slug;

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#f9f7fb] to-[#f0e9f4] overflow-hidden">
      <ToastContainer /> {/* Toast container to display notifications */}
      {loading ? (
        <Preloader />
      ) : (
        // <div className="absolute inset-0 -z[-1] animate-float-shapes">
        //   <div className="absolute top-[10%] left-[20%] w-[100px] h-[100px] bg-[#ce93d8] rounded-full opacity-50 animate-float-shape" />
        //   <div className="absolute bottom-[15%] right-[25%] w-[80px] h-[80px] bg-[#ba68c8] rounded-full opacity-50 animate-float-shape" />
        //   <div className="absolute top-[30%] left-[40%] w-[120px] h-[120px] bg-gradient-to-br from-[#f9f7fb] to-[#f0e9f4] rounded-full opacity-50 animate-float-shape" />
        //   <div className="absolute bottom-[20%] right-[15%] w-[90px] h-[90px] bg-[#ab47bc] rounded-full opacity-50 animate-float-shape" />
        //   <div className="absolute top-[50%] left-[10%] w-[80px] h-[80px] bg-[#ce93d8] rounded-full opacity-50 animate-float-shape" />
        //   <div className="absolute bottom-[30%] right-[5%] w-[100px] h-[100px] bg-gradient-to-br from-[#f9f7fb] to-[#f0e9f4] rounded-full opacity-50 animate-float-shape" />
        // </div>
        <div className="hello"></div>
      )}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 relative flex justify-center mt-0 md:mt-[10vh]">
          <div
            className="relative w-full max-w-md overflow-hidden group animate-slide-in-left"
            style={{ height: '60vh', width: '80vw' }}
          >
            {product ? (
              <Image
                src={product.image}
                alt="Product"
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-2 cursor-pointer"
                onClick={handleImageClick}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-gray-500">Loading...</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-6 animate-slide-in-right flex flex-col items-center md:items-start">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            Seller Name: {Sellername}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center md:text-left">
            {product ? product.name : 'Loading...'}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground text-center md:text-left">
            {product
              ? 'Discover our latest collection of premium apparel, designed to complement your modern lifestyle.'
              : 'Loading product details...'}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className='z[100]'
              onClick={handleAddToCart}
              
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="relative bg-white p-4 rounded-lg max-w-4xl w-full h-[70vh] overflow-hidden">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              &#x2715;
            </button>
            {product && (
              <div className="w-full h-full relative">
                <Image
                  src={product.image}
                  alt="Product"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg cursor-zoom-in"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute(Product);
