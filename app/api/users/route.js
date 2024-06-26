import connect from '../../../lib/db';
import User from '../../../lib/models/user';
import { NextResponse } from "next/server";

// export const config = {
//     api: {
//         bodyParser: true,
//     },
// };

// export async function GET(request) {
//     await connect();

//     // Manually extract query parameters from the URL
//     const url = request.url;
//     const queryParams = new URLSearchParams(url.split('?')[1]);
//     const userId = queryParams.get('id');

//     console.log('Request URL:', request.url);
//     console.log('User ID:', userId);

//     if (userId) {
//         // Find user by ID
//         try {
//             const user = await User.findById(userId);
//             if (!user) {
//                 return NextResponse.json({ message: "User not found" }, { status: 404 });
//             }
//             return NextResponse.json(user, { status: 200 });
//         } catch (error) {
//             return NextResponse.json({ message: "Error fetching user", error: error.message }, { status: 500 });
//         }
//     } else {
//         // Find all users
//         try {
//             const users = await User.find();
//             return NextResponse.json(users, { status: 200 });
//         } catch (error) {
//             return NextResponse.json({ message: "Error fetching users", error: error.message }, { status: 500 });
//         }
//     }
// }
export async function GET(request) {
    await connect();

    try {
        const users = await User.find();
        console.log(users)
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching users", error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    await connect();

    try {
        const body = await request.json();
        const { name, email, password } = body;

        const user = new User({ name, email, password });
        await user.save();
        

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating user", error: error.message }, { status: 400 });
    }
}