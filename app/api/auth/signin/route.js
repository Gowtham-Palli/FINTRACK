import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
    await connectDB();
    try {
        const { email, password } = await req.json();
        console.log("🔍 Received Email:", email);
        console.log("🔍 Received Password:", password);

        if (!email || !password) {
            return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400 });
        }

        const user = await User.findOne({ email });
        console.log("🛠 Found User:", user);

        if (!user) {
            return new Response(JSON.stringify({ error: "No user exists with this email, please signup" }), { status: 400 });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return new Response(JSON.stringify({ error: "Incorrect Password" }), { status: 401 });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return new Response(JSON.stringify({ message: "Login Successful", token }), { status: 200 });
    } catch (error) {
        console.error("Error during login:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}