import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Order from '../../../lib/models/Order';

export async function GET(request) {
  await connect();
  const { searchParams } = new URL(request.url, `http://${request.headers.get('host')}`);
  const email = searchParams.get('email');

  try {
    const orders = await Order.find({ userEmail: email });

    if (!orders) {
      return NextResponse.json({ orders: [] }, { status: 200 });
    }

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connect();
  try {
    const { userEmail, items, subTotal } = await request.json();
    const newOrder = new Order({
      userEmail,
      items,
      subTotal,
    });
    
    await newOrder.save();
    return NextResponse.json({ message: 'Order created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export function OPTIONS() {
  const methods = ['GET', 'POST'];
  return new Response(null, {
    headers: {
      Allow: methods.join(', '),
    },
  });
}
