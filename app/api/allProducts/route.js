//app/api/allProducts/route.js

import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Product from '../../../lib/models/Product';

export async function GET(request) {
  await connect();
  
  const searchParams = new URL(request.url).searchParams;
  const searchQuery = searchParams.get('search') || '';
  
  try {
    // Fetch products based on the search query
    const query = searchQuery 
      ? { name: { $regex: searchQuery, $options: 'i' } } // Case-insensitive search
      : {};
      
    const products = await Product.find(query);
    
    if (!products || products.length === 0) {
      return NextResponse.json({ message: "No products found" }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching products", error: error.message }, { status: 400 });
  }
}
