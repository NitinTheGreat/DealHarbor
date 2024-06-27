'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ProductGrid = ({ products }) => {
  const router = useRouter();

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center -m-4">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="p-4 w-full sm:w-1/2 lg:w-1/4"
              style={{ cursor: 'pointer' }} // Apply cursor pointer here
              onClick={() => handleProductClick(product.productId)}
            >
              <div className="w-full">
                <div className="shadow-lg p-6 rounded-xl">
                  <a className="block relative h-48 rounded overflow-hidden">
                    <Image
                      alt="Product Image"
                      className="object-cover object-center w-full h-full rounded-3xl" // Rounded corners added here
                      src={product.image}
                      layout="fill"
                      objectFit="contain"
                      sizes="100vw"
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                    <p className="mt-1">{product.price}</p>
                  </div>
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
