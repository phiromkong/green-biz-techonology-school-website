import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";


export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <div className="login-rectangle">
                <Link to="/admin" className="login-button">
                    <button className="login-button">Login</button>
                </Link>
            </div>
            <nav>
                <div>
                    <Link to="/" className="title">
                        <div className="logo-container">
                            <img src="logo192.png" alt="School Logo" className="logo" />
                        </div>
                        <div className="title-container">
                            <div className="khmer">សាលាបច្ចេកវិទ្យា ហ្រ្គីនប៊ីស</div>
                            <div className="english">Green Biz Technology School</div>
                        </div>
                    </Link>
                </div>

                <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? "open" : ""}>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/About">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Courses">Course</NavLink>
                    </li>
                    <li>
                        <NavLink to="/News">News</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Faculty">Faculty</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Gallery">Gallery</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Contact">Contact</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
