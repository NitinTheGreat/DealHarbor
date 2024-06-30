// app/api/user/signup.js
import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import User from '../../../lib/models/user'; // Ensure the path is correct for your User model
import CryptoJS from 'crypto-js';

export async function POST(request) {
    await connect();

    try {
        const body = await request.json();
        const { name, email, password } = body;

        // Encrypt the password using CryptoJS
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

        const user = new User({ name, email, password: encryptedPassword });
        await user.save(); // Save the user

        return NextResponse.json({ message: "Account created" }, { status: 201 });
    } catch (error) {
        // Handle duplicate key error
   
        if (error.code === 11000 && error.keyValue && error.keyValue.email) {
            return NextResponse.json({ message: "User already exists. Please login." }, { status: 400 });
        }
        // Handle other errors
        return NextResponse.json({ message: "Error creating Account", error: error.message }, { status: 400 });
    }
}
