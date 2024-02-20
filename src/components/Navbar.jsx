import React, { useState, useEffect } from "react";
import "./css/Navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();

    // Define the dropdown links
    const dropdownLinks = [
        { path: '/news', name: 'NEWS' },
        { path: '/our-team', name: 'OUR TEAM' },
        { path: '/gallery', name: 'GALLERY' },
        { path: '/contact', name: 'CONTACT'},
        // Add more links here as needed
    ];

   // Check if the current location's path starts with any of the dropdown link paths or is the "About Us" page
    const isAboutUsActive = location.pathname === "/about" || dropdownLinks.some(link => location.pathname.startsWith(link.path));



    useEffect(() => {
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
        if (!menuOpen) {
            setDropdownOpen(true);
        }
    };
    
    const handleDropdownClick = (e) => {
        if (menuOpen) {
            setDropdownOpen(!dropdownOpen);
        }
    };

    return (
        <>
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
                            <Link to="/about" className={`dropdown-link ${isAboutUsActive ? "active" : ""}`}>ABOUT US</Link>
                            {dropdownOpen && 
                                <ul className='dropdown-menu'>
                                    {dropdownLinks.map(link => (
                                        <li key={link.path}><NavLink to={link.path} activeClassName="active">{link.name}</NavLink></li>
                                    ))}
                                </ul>
                            }
                            <span className="dropdown-arrow" onClick={handleDropdownClick}></span>
                        </li>   
                        <li>
                            <NavLink to="/courses">COURSES</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">ENROLL NOW</NavLink>
                        </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;