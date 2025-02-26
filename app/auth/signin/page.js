"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import './page.css'

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
        
        <div className="signin-box">
            <div className="logo-box">
            <img src="/logo1.png"  className="logo-signin" alt="logo" />
            <img src="/title.png" alt="title" className="logo-title" />
            </div>
            <div className="main-signin">
            <form onSubmit={handleSubmit} className="form-box">
                {error && <p className="text-red-800">{error}</p>}
                <h1 className="mainheading">Welcome to FinTrack</h1>
                <p className="desc">Track your money with FinTrack.Sign in or create an account to get started.</p>
                <div className="email-box">
                  <p className="email-text">Email</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    onChange={handleChange}
                    className="input-box"
                    required
                  />
                </div>
               <div className="password-box">
                 <p className="email-text">Password</p>
                 <input
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    onChange={handleChange}
                    className="input-box"
                    required
                 />
               </div>
               
                <div className="w-[50%] text-[#b4b4b4]" onClick={handleForgotPassword}> Forgot Password?</div>
                <button className="btn-box">Sign In</button>
                <div className="line-box"></div>
                <div className="w-[100%] -mt-3">
                    <div className="text-sm text-[#b4b4b4] mb-2">Don't Have An Account?</div>
                    <button  className="btn-box-2" onClick={handleSignUp}>Create an account</button>
                </div>
            </form>
            </div>
           
        </div>
    );
}