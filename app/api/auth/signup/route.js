import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from 'next/server';

export async function POST(req) {
    await connectDB();
    try {
        const { name, email, password, confirmpassword } = await req.json();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        if (password !== confirmpassword) {
            return NextResponse.json({ error: "Password Mismatch" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}