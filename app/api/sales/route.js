import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Sale from '../../../lib/models/Sales';
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

    const itemsTableRows = items.map(item => `
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="text-align: left; padding: 10px;">${item.name}</td>
        <td style="text-align: center; padding: 10px;">${item.qty}</td>
        <td style="text-align: center; padding: 10px;">${item.userEmail}</td>
        <td style="text-align: center; padding: 10px;">${item.productId}</td>
        <td style="text-align: right; padding: 10px;">₹${item.price}</td>
        <td style="text-align: right; padding: 10px;">₹${item.price * item.qty}</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: 'dealharborindia@gmail.com',
      to: sellerEmail,
      subject: 'Sale Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="text-align: center; color: #333;">Sale Confirmation</h2>
          <p style="text-align: center;">Dear Seller,</p>
          <p style="text-align: center;">You have successfully made a sale. Below are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #f9f9f9; border: 1px solid #ddd;">
            <thead style="background: #333; color: #fff;">
              <tr>
                <th style="text-align: left; padding: 12px;">Item</th>
                <th style="text-align: center; padding: 12px;">Quantity</th>
                <th style="text-align: center; padding: 12px;">User Email</th>
                <th style="text-align: center; padding: 12px;">Product ID</th>
                <th style="text-align: right; padding: 12px;">Price</th>
                <th style="text-align: right; padding: 12px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsTableRows}
              <tr>
                <td colspan="4" style="text-align: right; padding: 12px;"><strong>Subtotal:</strong></td>
                <td colspan="2" style="text-align: right; padding: 12px;"><strong>₹${subTotal}</strong></td>
              </tr>
              <tr>
                <td colspan="4" style="text-align: right; padding: 12px;"><strong>Date Ordered:</strong></td>
                <td colspan="2" style="text-align: right; padding: 12px;"><strong>${newSale.dateOrdered.toLocaleDateString()}</strong></td>
              </tr>
            </tbody>
          </table>
          <p style="text-align: center;">Thank you for your business.</p>
          <p style="text-align: center;">Sincerely,<br/>The Deal Harbor Team</p>
        </div>
      `,
    };

    // Send email using nodemailer
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Sale created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating sale:', error); // Log the error for debugging
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
