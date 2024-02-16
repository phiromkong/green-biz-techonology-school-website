import React, { useState, useEffect } from "react";
import "./css/Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Add event listener to close dropdown on click outside
        function handleClickOutside(event) {
            if (dropdownOpen && !event.target.closest(".dropdown-link")) {
                setDropdownOpen(false);
            }
        }
        document.body.addEventListener("click", handleClickOutside);
        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [dropdownOpen]);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
        setDropdownOpen(true); // Close dropdown when menu is clicked
    };

    const handleDropdownClick = (e) => {
        toggleDropdown();
    };

    return (
        <div>
            <div className="login-rectangle"></div>
            <nav>
                <div>
                    <Link to="/" className="title">
                        <div className="logo-container">
                            <img src="/logo2.png" alt="School Logo" className="logo" />
                        </div>
                    </Link>
                </div>

                <div className="menu" onClick={handleMenuClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? "open" : ""}>
                    <li>
                        <NavLink exact to="/" activeClassName="active">HOME</NavLink>
                    </li>
                    <li onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                        <NavLink to="/about" className="dropdown-link" activeClassName="active">ABOUT US</NavLink>
                        {dropdownOpen && 
                            <ul className='dropdown-menu'>
                                <li><NavLink to='/news' activeClassName="active">NEWS</NavLink></li>
                                <li><NavLink to='/our-team' activeClassName="active">OUR TEAM</NavLink></li>
                                <li><NavLink to='/gallery' activeClassName="active">GALLERY</NavLink></li>
                            </ul>
                        }
                        <span className="dropdown-arrow" onClick={handleDropdownClick}></span>
                    </li>
                    <li>
                        <NavLink to="/courses">COURSES</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">CONTACT</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
