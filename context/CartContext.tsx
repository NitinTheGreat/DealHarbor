'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  qty: number;
  price: number;
  name: string;
}

interface CartContextType {
  cart: Record<string, CartItem>;
  subTotal: number; // changed
  addToCart: (itemCode: string, price: number, qty: number, name: string) => void;
  removeFromCart: (itemCode: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Record<string, CartItem>>(
    () => {
      // Check if localStorage is available (client-side)
      if (typeof window !== 'undefined') {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : {};
      } else {
        // Return an empty cart for server-side rendering
        return {};
      }
    }
  );

  const [subTotal, setSubTotal] = useState(0); // changed

  useEffect(() => {
    // Calculate subtotal whenever cart changes
    let total = 0;
    for (const item of Object.values(cart)) {
      total += item.qty * item.price;
    }
    const roundedTotal = parseFloat(total.toFixed(2)); // changed
    setSubTotal(roundedTotal);

    // Update localStorage whenever cart changes (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (itemCode: string, price: number, qty: number, name: string) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (itemCode in prevCart) {
        newCart[itemCode] = {
          ...newCart[itemCode],
          qty: newCart[itemCode].qty + qty
        };
      } else {
        newCart[itemCode] = { qty, price, name };
      }
      return newCart;
    });
  };

  const removeFromCart = (itemCode: string, qty: number) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (itemCode in prevCart) {
        newCart[itemCode].qty -= qty;
        if (newCart[itemCode].qty <= 0) {
          delete newCart[itemCode];
        }
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
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
