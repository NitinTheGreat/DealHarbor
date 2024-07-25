/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/09JKXnEerKF
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Comfortaa } from 'next/font/google'
import { Syne } from 'next/font/google'

comfortaa({
  subsets: ['latin'],
  display: 'swap',
})

syne({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { SVGProps } from "react";
export function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 overflow-hidden">
        <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6">
          <div className="z-10 space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              <span className="inline-block whitespace-nowrap overflow-hidden pr-2 border-r-4 border-white animate-type">
                Welcome to DealHarbor!
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white">
              Why WhatsApp? DealHarbor is the new way to trade at VIT!
            </p>
            <div className="flex gap-4">
              <Button size="lg">Explore Now!</Button>
              <Button variant="outline" size="lg">
                Join the Community
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/50 z-0" />
        </section>
        <section className="py-12 md:py-20 px-6 bg-white animate-fade-in">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 animate-fade-in-up">
                <h2 className="text-3xl sm:text-4xl font-bold">Discover VIT&#39;s New Hub for Buying and Selling!</h2>
                <p className="text-muted-foreground">
                  Browse through a wide range of products and services offered by your fellow VIT students. Find the
                  best deals and negotiate with sellers directly.
                </p>
                <Button size="lg">Get Started with DealHarbor!</Button>
              </div>
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl group animate-fade-in-up">
                <img
                  src="/placeholder.svg"
                  alt="Discover the Best Deals"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl group animate-fade-in-up">
                <img
                  src="/placeholder.svg"
                  alt="Connect with Sellers"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-4 animate-fade-in-up">
                <h2 className="text-3xl sm:text-4xl font-bold">Skip the Group Chats—Explore Deals Instantly!</h2>
                <p className="text-muted-foreground">
                  Directly communicate with sellers, negotiate prices, and arrange secure transactions. Build trust and
                  relationships within the VIT community.
                </p>
                <Button size="lg">Explore Now!</Button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 animate-fade-in-up">
                <h2 className="text-3xl sm:text-4xl font-bold">Sell with Confidence</h2>
                <p className="text-muted-foreground">
                  Easily list your products and services, connect with interested buyers, and manage your transactions
                  securely within the DealHarbor platform.
                </p>
                <Button size="lg">Start Selling</Button>
              </div>
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl group animate-fade-in-up">
                <img
                  src="/placeholder.svg"
                  alt="Sell with Confidence"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20 px-6 bg-[#f0f0f0] animate-fade-in">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in-up">Why Choose DealHarbor?</h2>
            <p className="text-muted-foreground animate-fade-in-up">
              DealHarbor offers a seamless and secure platform for VIT students to buy, sell, and trade with their
              peers. Discover the benefits of our community-driven marketplace.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm group animate-fade-in-up">
                <AnchorIcon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mt-4">Trusted Community</h3>
                <p className="text-muted-foreground mt-2">
                  Connect with fellow VIT students and build lasting relationships within a secure and reliable
                  platform.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm group animate-fade-in-up">
                <WalletIcon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mt-4">Fair Pricing</h3>
                <p className="text-muted-foreground mt-2">
                  Negotiate prices directly with sellers and enjoy competitive deals on a wide range of products and
                  services.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm group animate-fade-in-up">
                <ShieldIcon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mt-4">Secure Transactions</h3>
                <p className="text-muted-foreground mt-2">
                  Rest assured that your transactions are secure and protected within the DealHarbor platform.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20 px-6 bg-white animate-fade-in">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in-up">What Our Users Say</h2>
            <p className="text-muted-foreground animate-fade-in-up">
              Hear from our satisfied customers and learn how DealHarbor has transformed their VIT experience.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#f0f0f0] p-6 rounded-xl shadow-sm group animate-fade-in-up">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">John Doe</h3>
                    <p className="text-muted-foreground">VIT Student</p>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 animate-fade-in-up">
                DealHarbor has been a game-changer for me. I&#39;ve found amazing deals on textbooks and electronics, and the platform&#39;s security gives me peace of mind.

                </p>
              </div>
              <div className="bg-[#f0f0f0] p-6 rounded-xl shadow-sm group animate-fade-in-up">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">Sarah Aisha</h3>
                    <p className="text-muted-foreground">VIT Student</p>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 animate-fade-in-up">
                I love how DealHarbor connects me with fellow VIT students who have the exact items I&#39;m looking for. The negotiation process is so smooth and efficient.
                </p>
              </div>
              <div className="bg-[#f0f0f0] p-6 rounded-xl shadow-sm group animate-fade-in-up">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">Raj Kumar</h3>
                    <p className="text-muted-foreground">VIT Student</p>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 animate-fade-in-up">
                DealHarbor has made selling my old textbooks and electronics a breeze. I&#39;ve been able to connect with interested buyers quickly and securely.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20 px-6 bg-[#f0f0f0] animate-fade-in">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in-up">Connect with the Creator</h2>
            <p className="text-muted-foreground animate-fade-in-up">
              Reach out to the creator of DealHarbor, Nitin Kumar Pandey, on LinkedIn.
            </p>
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-4 py-2 group hover:scale-110 transition-transform duration-300 animate-fade-in-up">
              <LinkedinIcon className="w-6 h-6" />
              <span>@nitinkrpandey</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white py-8 px-6 shadow-lg animate-fade-in">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AnchorIcon className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">DealHarbor</span>
          </div>
          <nav className="flex flex-col md:flex-row items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
              How It Works
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
              Pricing
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CopyrightIcon className="w-4 h-4" />
            <span>2024 DealHarbor. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function AnchorIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 22V8" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
      <circle cx="12" cy="5" r="3" />
    </svg>
  );
}

function CopyrightIcon(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ShieldIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function WalletIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}