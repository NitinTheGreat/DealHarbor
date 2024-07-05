import { NextResponse } from 'next/server';
import connect from '../../../../lib/db';
import Product from '../../../../lib/models/Product';

export async function GET(request, params) {
    await connect();
  
    try {
      const { productid } = params.params; // Access 'productid' from nested params object
      
  
      const product = await Product.findOne({ productId: productid });
  
      if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }
  
      return NextResponse.json(product, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching product", error: error.message }, { status: 400 });
    }
  }
  
  


  export async function POST(request) {
    await connect();
  
    try {
      const body = await request.json();
      const { name, description, price, image, quantity, isAvailable, category, productId, sellerEmail, sellerPhone } = body;
  
      const product = new Product({
        name,
        description,
        price,
        image,
        quantity,
        isAvailable,
        category,
        productId,
        sellerEmail,
        sellerPhone,
      });
  
      await product.save();
      // console.log('Product saved:', product);
  
      return NextResponse.json({ message: 'Product created', product }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: 'Error creating product', error: error.message }, { status: 400 });
    }
  }