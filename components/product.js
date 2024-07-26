'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { useCallback, memo } from 'react';

const ProductGrid = memo(({ products }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleProductClick = useCallback((productId) => {
    router.push(`/product/${productId}`);
  }, [router]);

  const handleAddToCart = useCallback((e, product) => {
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
  }, [addToCart]);

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <section className="text-gray-600 body-font mt-0">
      <ToastContainer />
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center -mx-4">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
              style={{ cursor: 'pointer' }}
            >
              <div 
                className="bg-background rounded-lg shadow-lg overflow-hidden w-full max-w-[400px] mx-auto sm:max-w-[350px] relative flex flex-col"
                onClick={() => handleProductClick(product.productId)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt="Product Image"
                    width={600}
                    height={400}
                    objectFit='contain'
                    className=" w-full h-full transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-muted-foreground text-sm truncate">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">₹{product.price}</span>
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
