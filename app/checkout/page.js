'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import ProtectedRoute from '../../components/Protectedcomp'
const Checkout = () => {
  const [orders, setOrders] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [progress, setProgress] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('email') : '';
  const router = useRouter();

  useEffect(() => {
    const cartProducts = localStorage.getItem('cartProducts');
    if (cartProducts) {
      const parsedCartProducts = JSON.parse(cartProducts);
      setOrders(parsedCartProducts);
      calculateSubTotal(parsedCartProducts);
    }
  }, []);

  const calculateSubTotal = (orders) => {
    const total = orders.reduce((sum, item) => sum + item.price * item.qty, 0);
    setSubTotal(total);
  };

  const handleBuyNow = async () => {
    setIsLoading(true);
    setProgress(75);
    try {
      await axios.post('/api/Order', {
        userEmail,
        items: orders,
        subTotal
      });

      const salesData = await Promise.all(orders.map(async (order) => {
        const response = await axios.get(`/api/products/${order.productId}`);
        const product = response.data;
        return {
          ...order,
          userEmail,
          total: order.price * order.qty,
          sellerEmail: product.sellerEmail
        };
      }));

      const sellerEmail = salesData[0]?.sellerEmail || '';

      await axios.post('/api/sales', {
        sellerEmail,
        items: salesData,
        subTotal
      });

      localStorage.removeItem('cartProducts');
      localStorage.removeItem('cart');
      setProgress(100);
      router.push('/orders');
    } catch (error) {
      console.error('Error creating order or sale:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white mt-16">
      <main className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-1 md:gap-12 lg:px-6 xl:grid-cols-1">
        <div className="grid gap-8">
          <div className="grid gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
            <p className="text-muted-foreground">Review your order and complete the checkout process.</p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Order Details</h2>
                <div className="flex items-center gap-2">
                  <PackageIcon className="h-5 w-5 text-primary animate-bounce" />
                  <span className="text-primary font-medium animate-pulse">{orders.length} items</span>
                </div>
              </div>
              <div className="grid gap-4 rounded-lg border bg-muted/40 p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order, index) => (
                      <TableRow key={index} className="group">
                        <TableCell className="font-medium">{order.name}</TableCell>
                        <TableCell>{order.qty}</TableCell>
                        <TableCell>₹{order.price.toFixed(2)}</TableCell>
                        <TableCell>₹{(order.price * order.qty).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <Progress value={progress} className="w-full max-w-[200px] animate-pulse" />
              </div>
              <div className="grid gap-4 rounded-lg border bg-muted/40 p-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subTotal.toFixed(2)}</span>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{subTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button 
            size="lg" 
            className={isLoading ? "" : "animate-bounce"} 
            onClick={handleBuyNow}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Place Order"}
          </Button>
          <Link href="/" passHref>
            <Button variant="outline">Back to Shop</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ProtectedRoute(Checkout);

function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}