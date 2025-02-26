"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Signup(){
    const [formData, setFormData] = useState({name:"", email:"", password:""});
    const router = useRouter();
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null);

        const res = await fetch("/api/auth/signup",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })

        const data = await res.json();
        if(!res.ok) setError(data.error);
        else router.push("/auth/signin");
    }

    return (
        <div className="bg-blue-400 h-screen flex items-center justify-center ">
            <form action="" className="flex flex-col items-center justify-center w-[40%] h-[40vh] p-4 bg-red-400 gap-4" onSubmit={handleSubmit}>
                {error && <p className="text-red-800">{error}</p>}
                <input type="name" name="name" placeholder="Name" onChange={handleChange} className="w-[50%]  p-1 px-2 rounded-sm border-none outline-none" required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-[50%] p-1 px-2 rounded-sm border-none outline-none" required />
                <input type="password" name="password"placeholder="Password" onChange={handleChange} className="w-[50%] p-1 px-2 rounded-sm border-none outline-none" required />
                <input type="password" name="confirmpassword"placeholder="Confirm Password" onChange={handleChange} className="w-[50%] p-1 px-2 rounded-sm border-none outline-none" required />
                <button className="bg-black text-white w-[50%]  p-1 px-2 rounded-sm" >Sign Up</button>
            </form>
        </div>
    )
}