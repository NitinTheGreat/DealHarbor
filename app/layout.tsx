// layout.tsx
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";
import { cn } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ["latin"] });

const fontHeading = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: "Deal Harbor",
  description: "By Nitin Kumar Pandey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'antialiased',
          inter.className,
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <CartProvider>
          <Navbar />
          {children}
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
