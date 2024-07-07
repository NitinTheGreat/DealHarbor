import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Order from '../../../lib/models/Order';
import nodemailer from 'nodemailer';

// Configure nodemailer transporter using your Gmail account
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'dealharborindia@gmail.com',
    pass: process.env.nodemailer_password,
  }
});

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

    const mailOptions = {
      from: 'dealharborindia@gmail.com',
      to: userEmail,
      subject: 'Order Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="text-align: center; color: #0044cc;">Order Confirmation</h2>
          <p style="text-align: center;">Dear Customer,</p>
          <p style="text-align: center;">Thank you for your order with Deal Harbor.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead style="background-color: #f0f0f0;">
              <tr>
                <th style="padding: 10px; border: 1px solid #dddddd; text-align: left;">Item Name</th>
                <th style="padding: 10px; border: 1px solid #dddddd; text-align: left;">Quantity</th>
                <th style="padding: 10px; border: 1px solid #dddddd; text-align: left;">Price</th>
                <th style="padding: 10px; border: 1px solid #dddddd; text-align: left;">Seller Email</th>
                <th style="padding: 10px; border: 1px solid #dddddd; text-align: left;">Seller Phone</th>
                <th style="padding: 10px; border: 1px solid #dddddd; text-align: left;">Product ID</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #dddddd;">${item.name}</td>
                  <td style="padding: 10px; border: 1px solid #dddddd;">${item.qty}</td>
                  <td style="padding: 10px; border: 1px solid #dddddd;">₹${item.price}</td>
                  <td style="padding: 10px; border: 1px solid #dddddd;">${item.sellerEmail}</td>
                  <td style="padding: 10px; border: 1px solid #dddddd;">${item.sellerPhone}</td>
                  <td style="padding: 10px; border: 1px solid #dddddd;">${item.productId}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <p style="text-align: left; margin-top: 20px;">Thank you for shopping with us.</p>
          <p style="text-align: left;">Sincerely,<br/>The Deal Harbor Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Order created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error); // Log the error for debugging
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
