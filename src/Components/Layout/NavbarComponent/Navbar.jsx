import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import "./Navbar.css"
import {ReactComponent as Brand} from "../../../assets/logo.svg";
import {GiHamburgerMenu} from "react-icons/gi";


export const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
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
                            <NavLink to="/blog">Blog</NavLink>
                        </li>
                        <li>
                            <NavLink to="/projects">Projects</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
