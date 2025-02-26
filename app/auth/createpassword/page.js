"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";

export default function CreatePassword(){
    const [formData, setFormData] = useState();
    const [error, setError] = useState(null);
    const router = useRouter();
    const handleChangePassword = async(e)=>{
        e.preventDefault();
        setError(null);

        const res = await fetch("/api/auth/createpassword",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })

        const data = await res.json();
        if(!res.ok) setError(data.error);
        else router.push("/auth/signin");
    }
    const handleChange=(e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    return(
        <div className="h-screen bg-blue-400 items-center justify-center flex">
            <form action="" onSubmit={handleChangePassword} className="flex flex-col items-center justify-center w-[40%] min-h-[40vh] p-4 bg-red-400 gap-4">
                <h1>Create New Password</h1>
                {error && <p>{error}</p>}
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-[50%] p-1 px-2 rounded-sm border-none outline-none" required />
                <input type="password" name="createpassword" placeholder="New Password" onChange={handleChange} className="w-[50%] p-1 px-2 rounded-sm border-none outline-none" required />
                <input type="password" name="createconfirmpassword" placeholder="Confirm Password" onChange={handleChange} className="w-[50%] p-1 px-2 rounded-sm border-none outline-none" required/>
                <button className="bg-black text-white p-1 w-[50%] px-2 rounded-sm" >Change Password</button>
            </form>
        </div>
    )
}