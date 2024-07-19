'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductGrid = ({ products }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    const itemCode = product.productId;
    const price = product.price;
    const name = product.name;
    const productId = product.productId;
    const sellerName = product.sellerName;
    const sellerEmail = product.sellerEmail;
    const sellerPhone = product.sellerPhone;

    const storedProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const existingProductIndex = storedProducts.findIndex(item => item.itemCode === itemCode);

    if (existingProductIndex !== -1) {
      storedProducts[existingProductIndex].qty += 1;
    } else {
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

    localStorage.setItem('cartProducts', JSON.stringify(storedProducts));
    addToCart(itemCode, price, 1, name);
    toast.success('Item added to cart!');
  };

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <section className="text-gray-600 body-font mt-0">
      <ToastContainer />
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center -mx-4">
          {products.map((product, index) => (
            <div 
              key={product._id} 
              className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
              style={{ cursor: 'pointer' }}
            >
              <div className="relative m-2 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md" onClick={() => handleProductClick(product.productId)}>
                <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                  <Image
                    alt="Product Image"
                    className="object-cover object-center w-full h-full rounded-3xl"
                    src={product.image}
                    layout="fill"
                    objectFit="contain"
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                </a>
                <div className="mt-4 px-5 pb-5">
                  <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-xl font-bold text-slate-900">₹{product.price}</span>
                    </p>
                  </div>
                  <a
                    href="#"
                    className="flex items-center justify-center rounded-md bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
