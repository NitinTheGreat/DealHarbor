'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  qty: number;
  price: number;
  name: string;
}

interface CartContextType {
  cart: Record<string, CartItem>;
  subTotal: number;
  addToCart: (itemCode: string, price: number, qty: number, name: string) => void;
  removeFromCart: (itemCode: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Record<string, CartItem>>(() => {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('cart');
      return cartData ? JSON.parse(cartData) : {};
    } else {
      return {};
    }
  });

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    for (const item of Object.values(cart)) {
      total += item.qty * item.price;
    }
    setSubTotal(parseFloat(total.toFixed(2)));

    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (itemCode: string, price: number, qty: number, name: string) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (itemCode in newCart) {
        newCart[itemCode].qty += 1;
      } else {
        newCart[itemCode] = { qty, price, name };
      }

      // Update localStorage cartProducts
      const storedProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');
      const existingProductIndex = storedProducts.findIndex((item: CartItem & { itemCode: string }) => item.itemCode === itemCode);
      if (existingProductIndex !== -1) {
        storedProducts[existingProductIndex].qty = newCart[itemCode].qty;
      } else {
        storedProducts.push({ itemCode, price, qty, name });
      }

      localStorage.setItem('cartProducts', JSON.stringify(storedProducts));

      return newCart;
    });
  };

  const removeFromCart = (itemCode: string, qty: number) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (itemCode in newCart) {
        newCart[itemCode].qty -= 1;
        if (newCart[itemCode].qty <= 0) {
          delete newCart[itemCode];
        }

        // Update localStorage cartProducts
        const storedProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');
        const existingProductIndex = storedProducts.findIndex((item: CartItem & { itemCode: string }) => item.itemCode === itemCode);
        if (existingProductIndex !== -1) {
          if (newCart[itemCode]) {
            storedProducts[existingProductIndex].qty = newCart[itemCode].qty;
          } else {
            storedProducts.splice(existingProductIndex, 1);
          }
        }

        localStorage.setItem('cartProducts', JSON.stringify(storedProducts));
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cartProducts');
      localStorage.removeItem('cart');
    }
  };

  return (
    <CartContext.Provider value={{ cart, subTotal, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
