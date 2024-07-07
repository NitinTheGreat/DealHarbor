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

    // Send email notification to the buyer
    const mailOptions = {
      from: 'dealharborind@gmail.com',
      to: userEmail,
      subject: 'Order Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="text-align: center; color: #333;">Order Confirmation</h2>
          <p style="text-align: center;">Dear Buyer,</p>
          <p style="text-align: center;">Your order has been successfully placed. Below are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #f9f9f9; border: 1px solid #ddd;">
            <thead style="background: #333; color: #fff;">
              <tr>
                <th style="text-align: left; padding: 12px;">Item</th>
                <th style="text-align: center; padding: 12px;">Quantity</th>
                <th style="text-align: right; padding: 12px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr style="border-bottom: 1px solid #ddd;">
                  <td style="text-align: left; padding: 10px;">${item.name}</td>
                  <td style="text-align: center; padding: 10px;">${item.qty}</td>
                  <td style="text-align: right; padding: 10px;">₹${item.price}</td>
                </tr>
              `).join('')}
              <tr>
                <td colspan="2" style="text-align: right; padding: 12px;"><strong>Subtotal:</strong></td>
                <td style="text-align: right; padding: 12px;"><strong>₹${subTotal}</strong></td>
              </tr>
            </tbody>
          </table>
          <p style="text-align: center;">Thank you for shopping with us.</p>
          <p style="text-align: center;">Sincerely,<br/>The Deal Harbor Team</p>
        </div>
      `,
    };

    // Send email using nodemailer
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
