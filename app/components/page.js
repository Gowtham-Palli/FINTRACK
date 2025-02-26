"use client"

import React from 'react'
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav>
        <FaBars />
        <ul>
            <li>Dashboard</li>
            <li>Transactions</li>
            <li>Cards</li>
            <li>Bank Account</li>
        </ul>
    </nav>
  )
}

export default Navbar

