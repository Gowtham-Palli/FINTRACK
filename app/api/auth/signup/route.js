import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(req) {
    await connectDB();
    try {
        const { name, email, password, confirmpassword } = await req.json();
        const existingUser = await User.findOne({ email });
        if (existingUser) return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });

        if (password !== confirmpassword) return new Response(JSON.stringify({ error: "Password Mismatch" }), { status: 400 });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}