import React from "react";
import { useState } from 'react'
import { useAuthContext, logout } from "../contexts/authContext";
import NavBar from './PrivateNavbar'
import '../assets/NavBar.css'
import '../assets/Private.css'

import BottomNavigation from './BottomNavigation'

export default function Private() {
    const { logout } = useAuthContext();


    return (

        <div className="fatherPrivateDiv">
            <NavBar />
            <BottomNavigation/>

        </div>
    )



}