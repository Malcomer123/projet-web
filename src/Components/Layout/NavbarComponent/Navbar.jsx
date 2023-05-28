import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import "./Navbar.css"
import {ReactComponent as Brand} from "../../../assets/logo.svg";
import {GiHamburgerMenu} from "react-icons/gi";
import {axiosConfig} from "../../../config";
import Cookies from 'js-cookie';


export const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    const handleLogout = () => {
        Cookies.remove('token');
        axiosConfig.get('http://localhost:3030/auth/logout').then(()=>{
            window.location.href='/login';
        })
    }

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Brand/> <div className="logo-name">Projet Web Daaif</div>
                </div>
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <GiHamburgerMenu/>
                </div>
                <div className={`nav-elements  ${showNavbar && 'active'}`}>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={handleLogout} to="/login">Deconnecter</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
