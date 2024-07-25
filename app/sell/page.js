'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function SellProductPage() {
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

    // Validate email and phone number
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    if (!emailPattern.test(formData.sellerEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!phonePattern.test(formData.sellerPhone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const url = `/api/products/${formData.productId}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
    <>
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8 mt-[10vh]">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2 lg:col-span-1">
            <div className="grid gap-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
                <p className="text-muted-foreground">Showcase your latest offerings.</p>
              </div>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="image">Product Image</Label>
                  <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-muted px-6 pt-5 pb-6 cursor-pointer" onClick={() => document.getElementById('image').click()}>
                    {formData.image ? (
                      <div className="flex justify-center">
                        <img
                          src={formData.image}
                          alt="Selected"
                          className="max-w-full max-h-64 rounded-md object-cover"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div className="flex text-sm text-muted-foreground">
                          <p className="pl-1">Click or drag and drop</p>
                        </div>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                    <input
                      id="image"
                      type="file"
                      name="image"
                      onChange={handleChange}
                      className="sr-only"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-2">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-lg font-normal shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your product in detail"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-base shadow-sm focus:border-primary focus:ring-primary"
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-muted-foreground">₹</span>
                    </div>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      className="block w-full rounded-md border-input bg-background pl-7 pr-3 py-2 text-lg focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Select
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-base shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onValueChange={(value) => setFormData((prevData) => ({
                    ...prevData,
                    category: value,
                  }))}
                  className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-base shadow-sm focus:border-primary focus:ring-primary"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bicycle">Bicycles</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="stationary">Stationary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sellerEmail">Email</Label>
                  <Input
                    id="sellerEmail"
                    name="sellerEmail"
                    type="email"
                    placeholder="Enter email"
                    value={formData.sellerEmail}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-base shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="sellerPhone">Phone</Label>
                  <Input
                    id="sellerPhone"
                    name="sellerPhone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.sellerPhone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-base shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isAvailable"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                >
                  Available
                </Checkbox>
              </div>
              <div>
                <Button type="submit" className="w-full rounded-md bg-primary px-4 py-2 text-lg font-medium text-primary-foreground shadow-sm hover:bg-primary-foreground hover:text-primary transition-colors">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
