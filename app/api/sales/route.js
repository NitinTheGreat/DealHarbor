import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Sale from '../../../lib/models/Sales';

export async function GET(request) {
  await connect();
  const { searchParams } = new URL(request.url, `http://${request.headers.get('host')}`);
  const email = searchParams.get('email');

  try {
    const sales = await Sale.find({ sellerEmail: email });

    if (!sales) {
      return NextResponse.json({ sales: [] }, { status: 200 });
    }

    return NextResponse.json({ sales }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connect();
  try {
    const { sellerEmail, items, subTotal } = await request.json();
    const newSale = new Sale({
      sellerEmail,
      items,
      subTotal,
      dateOrdered: new Date(),
    });

    await newSale.save();
    return NextResponse.json({ message: 'Sale created successfully' }, { status: 201 });
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
