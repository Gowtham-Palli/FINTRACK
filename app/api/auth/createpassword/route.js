import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(req) {
    await connectDB();
    try {
        const { email, createpassword, createconfirmpassword } = await req.json();
        console.log("🔍 Received Email:", email);
        console.log("🔍 Received Password:", createpassword);
        console.log("🔍 Received ConfirmPassword:", createconfirmpassword);

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return new Response(JSON.stringify({ error: "User doesn't exist, please signup" }), { status: 400 });
        }

        if (createpassword !== createconfirmpassword) {
            return new Response(JSON.stringify({ error: "Password Mismatch" }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(createpassword, 10);
        existingUser.password = hashedPassword;
        await existingUser.save();

        return new Response(JSON.stringify({ message: "Password updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error updating password:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}