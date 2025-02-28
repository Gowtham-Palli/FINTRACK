import { useState } from "react"
import { useRouter } from "next/navigation"

import './page2.css'

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
        <div className="signin-box">
            <div className="logo-box">
                <img src="/logo1.png" className="logo-signin" alt="logo" />
                <img src="/title.png" alt="title" className="logo-title" />
            </div>
            <div className="main-signin">
            <form action="" className="form-box" onSubmit={handleSubmit}>
                {error && <p className="text-red-800">{error}</p>}
                <div className="main-content">
                    <h1 className="mainheading">Welcome to FinTrack,</h1>
                    <p className="desc">Track your money with <span className="font-semibold">FinTrack</span>. Sign in or create an account to get started.</p>
                    </div>
                  <div className="email-box">
                    <p className="email-text">Username</p>
                  <input type="name" name="name" placeholder="Name" onChange={handleChange} className="input-box" required />
                    </div> 
               
                <div className="email-box">
                <p className="email-text">Email</p>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-box" required />
                </div>
               <div className="email-box">
                <p className="email-text">Password</p>
                <input type="password" name="password"placeholder="Password" onChange={handleChange} className="input-box" required />
               </div>
               <div className="email-box">
                <p className="email-text">Confirm Password</p>
                <input type="password" name="confirmpassword"placeholder="Confirm Password" onChange={handleChange} className="input-box" required />
               </div>
               
                <button className="btn-box" >Sign Up</button>
            </form>
            </div>
            
        </div>
    )
}