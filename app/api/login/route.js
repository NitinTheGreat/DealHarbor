// app/api/login/route.js
import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import User from '../../../lib/models/user';

export async function POST(request) {
  await connect();

  try {
    const { email, password } = await request.json();

    // Check if a user with the provided email exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User found, now validate password (plaintext comparison)
      if (password === existingUser.password) {
        return NextResponse.json({ message: "Login successful" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    // console.error('Signup error:', error);
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}
