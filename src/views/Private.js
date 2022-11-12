import React from "react";
import { useAuthContext, logout } from "../contexts/authContext";
import NavBar from './PrivateNavbar'
import '../assets/NavBar.css'
import '../assets/Private.css'


export default function Private() {
    const { logout } = useAuthContext();


    return (

        <div className="">
           {/*   <img className="backgroundImage" src={backImage}></img> */}
            <div className="fatherPrivateDiv">
                <NavBar />
               

            </div>
         {/*    <NewMap />
 */}

        </div>
    )



}