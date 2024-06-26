import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Product from '../../../lib/models/Product';

export async function GET(request) {
    await connect();
  
    try {
      // Fetch all products where category is 'bicycle'
      const products = await Product.find({ category: 'stationary' });
  
      if (!products || products.length === 0) {
        return NextResponse.json({ message: "No products found in category 'Stationary'" }, { status: 404 });
      }
  
      return NextResponse.json(products, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching products", error: error.message }, { status: 400 });
    }
  }
  
  