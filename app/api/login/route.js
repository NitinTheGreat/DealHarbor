// app/api/login/route.js
import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import User from '../../../lib/models/user';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await connect();

  try {
    const { email, password } = await request.json();
    console.log('Email:', email);

    // Check if a user with the provided email exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Decrypt the stored password
      const decryptedPasswordBytes = CryptoJS.AES.decrypt(existingUser.password, process.env.SECRET_KEY);
      const decryptedPassword = decryptedPasswordBytes.toString(CryptoJS.enc.Utf8);

      // Validate the provided password with the decrypted password
      if (password === decryptedPassword) {
        // Create a JWT token
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token:', token);

        // Return response with token, user's name, and email
        return NextResponse.json({ message: "Login successful", token, name: existingUser.name, email: existingUser.email }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}
