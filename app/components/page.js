"use client";

import { FaBars, FaUserCircle, FaBell, FaChartLine } from "react-icons/fa";
import { useState, useEffect } from 'react';
import './page.css';
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userEmail = localStorage.getItem('user_email'); // Get user email from storage (or replace with session)
                if (!userEmail) return;
    
                const res = await fetch(`/api/auth/user?email=${userEmail}`);
                const data = await res.json();
                if (res.ok) setUser(data.user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    const handleLogOut = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/auth/signin'); // Redirect to login page
    };

    const handleMenuBar = () => {
        setMenu(!menu);
    }

    return (
        <>
            <nav className='flex justify-between p-2 py-3 shadow-md sticky top-0'>
                <div className='flex items-center justify-center'>
                    <img src="/Logo.png" className='h-12' alt="" />
                    <img src="/Title.png" className='h-7' alt="" />
                </div>

                <div className='flex gap-4'>
                    <ul className='gap-4 items-center hidden md:flex'>
                        <li className='text-xl text-gray-700 hover:cursor-pointer py-2 px-1 hover:scale-105 transition-all ease-in-out hover:border-b-[3px] hover:border-b-gray-400 hover:rounded-md'>Dashboard</li>
                        <li className='text-xl text-gray-700 hover:cursor-pointer py-2 px-1 hover:scale-105 transition-all ease-in-out hover:border-b-[3px] hover:border-b-gray-400 hover:rounded-md'>Transactions</li>
                        <li className='text-xl text-gray-700 hover:cursor-pointer py-2 px-1 hover:scale-105 transition-all ease-in-out hover:border-b-[3px] hover:border-b-gray-400 hover:rounded-md'>Reports</li>
                        <li className='text-xl text-gray-700 hover:cursor-pointer py-2 px-1 hover:scale-105 transition-all ease-in-out hover:border-b-[3px] hover:border-b-gray-400 hover:rounded-md'>Goals</li>
                    </ul>

                    <div className='flex gap-4'>
                        <div className='flex justify-center bg-gray-300 rounded-md px-2 items-center hover:bg-gray-200'>
                            <FaBell className='w-6 h-6' />
                        </div>

                        <div className='hidden md:flex justify-center items-center'>
                            <FaUserCircle className='w-8 h-8 text-gray-800' />
                        </div>

                        <div className='flex justify-center items-center md:hidden'>
                            <FaBars onClick={handleMenuBar} className='w-6 h-8' />
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`bg-white md:hidden shadow-right h-screen w-[60%] absolute top-0 left-0 z-50 transition-transform duration-500 ease-in-out ${menu ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='flex items-center p-2 py-3 justify-center shadow-md'>
                    <img src="/Logo.png" className='h-12' alt="" />
                    <img src="/Title.png" className='h-7' alt="" />
                </div>

                <div className="py-5 flex flex-col items-start w-full">
                    <div className="flex items-center gap-3 hover:bg-gray-200 w-full p-3 pl-6">
                        <FaChartLine className="text-2xl" />
                        <p className="text-2xl">Dashboard</p>
                    </div>

                    <div className="flex items-center gap-3 hover:bg-gray-200 w-full p-3 pl-6">
                        <FaChartLine className="text-2xl" />
                        <p className="text-2xl">Transactions</p>
                    </div>

                    <div className="flex items-center gap-3 hover:bg-gray-200 w-full p-3 pl-6">
                        <FaChartLine className="text-2xl" />
                        <p className="text-2xl">Report</p>
                    </div>

                    <div className="flex items-center gap-3 hover:bg-gray-200 w-full p-3 pl-6">
                        <FaChartLine className="text-2xl" />
                        <p className="text-2xl">Goal</p>
                    </div>
                </div>

                {user? (
                    <div className="flex flex-col items-center gap-3 p-3">
                        <FaUserCircle className="text-2xl"/>
                        <p>{user.name}</p>
                    </div> ) :(
                        <div>
                            <p>Log In</p>
                            <button onClick={handleLogOut}>Log Out</button>
                        </div>
                )}
            </div>
        </>
    )
}

export default Navbar;