'use client'
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
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    // Load cart from localStorage on component mount
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Calculate subtotal whenever cart changes
    let total = 0;
    for (const item of Object.values(cart)) {
      total += item.qty * item.price;
    }
    setSubTotal(total);
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
