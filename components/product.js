"use client";
import Image from 'next/image';

const products = [
  { id: 1, category: 'CATEGORY', title: 'The Catalyzer', price: '$16.00', image: 'https://dummyimage.com/420x260' },
  { id: 2, category: 'CATEGORY', title: 'Shooting Stars', price: '$21.15', image: 'https://dummyimage.com/421x261' },
  { id: 3, category: 'CATEGORY', title: 'Neptune', price: '$12.00', image: 'https://dummyimage.com/422x262' },
  { id: 4, category: 'CATEGORY', title: 'The 400 Blows', price: '$18.40', image: 'https://dummyimage.com/423x263' },
  { id: 5, category: 'CATEGORY', title: 'The Catalyzer', price: '$16.00', image: 'https://dummyimage.com/424x264' },
  { id: 6, category: 'CATEGORY', title: 'Shooting Stars', price: '$21.15', image: 'https://dummyimage.com/425x265' },
  { id: 7, category: 'CATEGORY', title: 'Neptune', price: '$12.00', image: 'https://dummyimage.com/427x267' },
  { id: 8, category: 'CATEGORY', title: 'The 400 Blows', price: '$18.40', image: 'https://dummyimage.com/428x268' },
];

const ProductGrid = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product) => (
            <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div className="shadow-lg p-6 rounded-lg">
                <a className="block relative h-48 rounded overflow-hidden">
                  <Image
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={product.image}
                    layout="fill"
                    objectFit="cover"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
                  <p className="mt-1">{product.price}</p>
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
