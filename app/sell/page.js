'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    quantity: '1',
    isAvailable: true,
    category: '',
    productId: '',
    sellerEmail: '',
    sellerPhone: '',
  });

  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      const productId = `${username}_${Math.floor(Math.random() * 900000) + 100000}`;
      setFormData((prevData) => ({
        ...prevData,
        productId: productId,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const url = `/api/products/${formData.productId}`;
      
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send formData directly in the request body
      });
  
      if (res.ok) {
        toast.success('Product created successfully!');
        const { productId } = formData;
        setTimeout(() => {
          router.push(`/product/${productId}`);
        }, 2000);
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to create product.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error creating product:', error);
    }
  };
  
  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-16">
      <h1 className="text-3xl font-bold mt-8 mb-4 text-center">Sell a Product</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <div className="mb-4">
          <label className="custum-file-upload">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-20 fill-gray-600">
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                </g>
              </svg>
            </div>
            <div className="text">
              <span>Click to upload image</span>
            </div>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
          </label>
          {formData.image && (
            <img src={formData.image} alt="Selected" className="mt-4 max-w-full max-h-64 rounded-lg" />
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 shadow-md hover:shadow-xl"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 shadow-lg hover:shadow-xl"
            placeholder="Enter product price"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity:</label>
          <select
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 shadow-lg hover:shadow-xl"
            required
          >
            {[...Array(10).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 shadow-lg hover:shadow-xl"
            required
          >
            <option value="">Select a category</option>
            <option value="bicycle">Bicycles</option>
            <option value="Electronics">Electronics</option>
            <option value="stationary">Stationary</option>
           
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="sellerEmail" className="block text-gray-700 font-bold mb-2">sellerEmail:</label>
          <input
            type="sellerEmail"
            id="sellerEmail"
            name="sellerEmail"
            value={formData.sellerEmail}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 shadow-lg hover:shadow-xl"
            placeholder="Enter your sellerEmail"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sellerPhone" className="block text-gray-700 font-bold mb-2">Phone Number:</label>
          <input
            type="tel"
            id="sellerPhone"
            name="sellerPhone"
            value={formData.sellerPhone}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 shadow-lg hover:shadow-xl"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="isAvailable" className="block text-gray-700 font-bold mb-2">Available:</label>
          <input
            type="checkbox"
            id="isAvailable"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
          >
            Sell Product
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SellProductPage;
