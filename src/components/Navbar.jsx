import React, { useState } from "react";
import Dropdown from './Dropdown'; // Import the Dropdown component
import "./css/Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown

    const handleDropdown = () => setDropdownOpen(!dropdownOpen); // Handler for dropdown

    return (
        <div>
            <div className="login-rsectangle">
            </div>
            <nav>
                <div>
                    <Link to="/" className="title">
                        <div className="logo-container">
                            <img src="/logo2.png" alt="School Logo" className="logo" />
                        </div>
                    </Link>
                </div>

                <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? "open" : ""}>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li onClick={handleDropdown}>
                        <NavLink to="/about">About</NavLink>
                        {dropdownOpen && <Dropdown />} {/* Render Dropdown if dropdownOpen is true */}
                    </li>
                    <li>
                        <NavLink to="/courses">Course</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contact</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;