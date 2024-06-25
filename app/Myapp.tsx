'use client';
import { useState, useEffect } from "react";

export function MyApp({ Component, pageProps, children }: { Component: React.ComponentType<any>, pageProps: any, children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, { qty: number; price: number; name: string }>>({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    console.log("useEffect triggered");
  }, []); // Ensure this component is mounted and rendered

  const saveCart = (newCart: Record<string, any>) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (itemCode: string, price: number, qty: number, name: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (itemCode in prevCart) {
        newCart[itemCode].qty += qty;
      } else {
        newCart[itemCode] = { qty: 1, price, name };
      }
      saveCart(newCart);
      return newCart;
    });
  };

  const removeFromCart = (itemCode: string, qty: number) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (itemCode in prevCart) {
        newCart[itemCode].qty -= qty;
        if (newCart[itemCode].qty <= 0) {
          delete newCart[itemCode];
        }
        saveCart(newCart);
        return newCart;
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  return (
    <>
      {children}
    </>
  );
}
