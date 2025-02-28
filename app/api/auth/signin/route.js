import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from 'next/server';

export async function POST(req) {
    await connectDB();
    try {
        const { email, password } = await req.json();
        console.log("🔍 Received Email:", email);
        console.log("🔍 Received Password:", password);

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        console.log("🛠 Found User:", user);

        if (!user) {
            return NextResponse.json({ error: "No user exists with this email, please signup" }, { status: 400 });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Incorrect Password" }, { status: 401 });
        }
        
        const response = NextResponse.json({ message: 'Login successful', user }, { status: 200 });
            response.cookies.set('user_email', email, { httpOnly: true, path: '/' });
            return response;
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}