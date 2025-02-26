"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const router = useRouter();
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.error);
        } else {
            router.push("/dashboard");
        }
    };

    const handleSignUp = () => {
        router.push("/auth/signup");
    };

    const handleForgotPassword =()=>{
        router.push("/auth/createpassword")
    }

    return (
        <div className="h-screen bg-blue-400 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-[40%] min-h-[40vh] p-4 bg-red-400 gap-4">
                {error && <p className="text-red-800">{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-[50%] p-1 px-2 rounded-sm border-none outline-none"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-[50%] p-1 px-2 rounded-sm border-none outline-none"
                    required
                />
                <div className="w-[50%]" onClick={handleForgotPassword}> Forgot Password?</div>
                <button className="bg-black text-white w-[50%] p-1 px-2 rounded-sm">Sign In</button>
                <div className="w-[50%] h-[2px] bg-black"></div>
                <div className="w-[50%] -mt-3">
                    <div className="text-sm text-center mb-2">Don't Have An Account?</div>
                    <button  className="bg-black text-white p-1 w-[100%] px-2 rounded-sm" onClick={handleSignUp}>Sign Up</button>
                </div>
            </form>
        </div>
    );
}