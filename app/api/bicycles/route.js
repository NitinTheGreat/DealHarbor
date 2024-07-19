import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Product from '../../../lib/models/Product';

export async function GET(request) {
  await connect();
  
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const limit = parseInt(searchParams.get('limit'), 10) || 16; // Change limit to 16
  const skip = (page - 1) * limit;
  
  try {
    // Fetch paginated products where category is 'bicycle'
    const products = await Product.find({ category: 'bicycle' })
                                  .skip(skip)
                                  .limit(limit);
    const total = await Product.countDocuments({ category: 'bicycle' });

    if (!products || products.length === 0) {
      return NextResponse.json({ message: "No products found in category 'bicycle'" }, { status: 404 });
    }

    return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching products", error: error.message }, { status: 400 });
  }
}
