/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/AtAm3Hvnbbm
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { IBM_Plex_Sans } from 'next/font/google'
import { Rubik } from 'next/font/google'

ibm_plex_sans({
  subsets: ['latin'],
  display: 'swap',
})

rubik({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
export function order page() {
  const orders = [
    {
      id: 1,
      dateOrdered: "2023-06-01",
      item: "Wireless Headphones",
      quantity: 2,
      price: 99.99,
      total: 199.98,
      sellerEmail: "seller@example.com",
      sellerPhone: "+1 (123) 456-7890",
    },
    {
      id: 2,
      dateOrdered: "2023-05-15",
      item: "Smartwatch",
      quantity: 1,
      price: 249.99,
      total: 249.99,
      sellerEmail: "seller2@example.com",
      sellerPhone: "+1 (987) 654-3210",
    },
    {
      id: 3,
      dateOrdered: "2023-04-20",
      item: "Gaming Mouse",
      quantity: 1,
      price: 59.99,
      total: 59.99,
      sellerEmail: "seller3@example.com",
      sellerPhone: "+1 (456) 789-0123",
    },
    {
      id: 4,
      dateOrdered: "2023-03-30",
      item: "Laptop Sleeve",
      quantity: 3,
      price: 29.99,
      total: 89.97,
      sellerEmail: "seller4@example.com",
      sellerPhone: "+1 (321) 654-9870",
    },
    {
      id: 5,
      dateOrdered: "2023-02-10",
      item: "Bluetooth Speaker",
      quantity: 1,
      price: 79.99,
      total: 79.99,
      sellerEmail: "seller5@example.com",
      sellerPhone: "+1 (789) 123-4567",
    },
  ]
  const totalOrders = orders.length
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-gray-500">View and manage your recent orders.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 mr-2">Total Orders</span>
            <span className="text-2xl font-bold animate-pulse">{totalOrders}</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                <th className="py-3 px-4 text-left">Date Ordered</th>
                <th className="py-3 px-4 text-left">Item</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Seller Email</th>
                <th className="py-3 px-4 text-left">Seller Phone</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 animate-fade-in"
                >
                  <td className="py-4 px-4">{order.dateOrdered}</td>
                  <td className="py-4 px-4">{order.item}</td>
                  <td className="py-4 px-4">{order.quantity}</td>
                  <td className="py-4 px-4">${order.price.toFixed(2)}</td>
                  <td className="py-4 px-4">${order.total.toFixed(2)}</td>
                  <td className="py-4 px-4">{order.sellerEmail}</td>
                  <td className="py-4 px-4">{order.sellerPhone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
