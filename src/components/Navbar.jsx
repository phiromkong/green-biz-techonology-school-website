import React, { useState, useEffect } from "react";
import "./css/Navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
export const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const location = useLocation();

    // Define the dropdown links
    const dropdownLinks = [
        { path: '/news', name: 'NEWS' },
        { path: '/our-team', name: 'OUR TEAM' },
        { path: '/gallery', name: 'GALLERY' },
        { path: '/contact', name: 'CONTACT'},
    ];

    // Check if the current location's path starts with any of the dropdown link paths or is the "About Us" page
    const isAboutUsActive = location.pathname === "/about" || dropdownLinks.some(link => location.pathname.startsWith(link.path));

    useEffect(() => {
        function handleClickOutside(event) {
            if (aboutDropdownOpen && !event.target.closest(".about-dropdown-link")) {
                setAboutDropdownOpen(false);
            }
            if (langDropdownOpen && !event.target.closest(".lang-dropdown-link")) {
                setLangDropdownOpen(false);
            }
        }
        document.body.addEventListener("click", handleClickOutside);
        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [aboutDropdownOpen, langDropdownOpen]);

    const toggleAboutDropdown = () => {
        setAboutDropdownOpen(!aboutDropdownOpen);
    };

    const toggleLangDropdown = (event) => {
        event.stopPropagation();
        console.log("toggleLangDropdown called");
        setLangDropdownOpen(!langDropdownOpen);
    };

const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
        setAboutDropdownOpen(true);
    }
};

    return (
        <div className="parent-div">
            <div className="login-rectangle">
                <Link to="/contact" className="top_header_text">Apply for admission to study</Link>
                <div className="blog_lang">
                    <div className="btn_lang_position">
                        <ul className="lang-dropdown" style={{ listStyle: "none" }}>
                            <li>
                                <div className="p-dropdown lang_drop_down" >
                                    <a className="lang_box">
                                        ENGLISH                                                
                                        <ArrowDropDownIcon className="dropdown-icon" onClick={toggleLangDropdown}/>
                                    </a>
                                    {langDropdownOpen && (
                                        <ul className="p-dropdown-content p-0 drop_content" style={{ display: langDropdownOpen ? 'block' : 'none', listStyle: "none" }}>
                                            <li>KHMER</li>
                                            <li>ENGLISH</li>
                                        </ul>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

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
                    <li onMouseEnter={toggleAboutDropdown} onMouseLeave={toggleAboutDropdown}>
                        <Link to="/about" className={`dropdown-link ${isAboutUsActive ? "active" : ""}`}>ABOUT US</Link>
                        {aboutDropdownOpen &&  
                            <ul className='dropdown-menu'>
                                {dropdownLinks.map(link => (
                                    <li key={link.path}><NavLink to={link.path} activeClassName="active">{link.name}</NavLink></li>
                                ))}
                            </ul>
                        }
                    </li>   
                    <li>
                        <NavLink to="/courses">COURSES</NavLink>
                    </li>
                    <li>
                        <Button className="enroll_btn" variant="contained" component={Link} to="/contact">ENROLL NOW</Button>
                    </li>   
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
