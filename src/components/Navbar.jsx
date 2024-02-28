import React, { useState, useEffect } from "react";
import "./css/Navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useTranslation } from 'react-i18next';
export const Navbar = () => {

const [menuOpen, setMenuOpen] = useState(false);
const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
const [langDropdownOpen, setLangDropdownOpen] = useState(false);
const [scrolling, setScrolling] = useState(false);
const location = useLocation();
const { t, i18n } = useTranslation();

const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
};

const handleScroll = () => {
    if (window.innerWidth > 1200) {
        if (window.scrollY > 0) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    }
};

// Define the dropdown links
const dropdownLinks = [
    { path: '/news', name: t('news') },
    { path: '/our-team', name: t('ourTeam') },
    { path: '/gallery', name: t('gallery') },
    { path: '/contact', name: t('contact')},
];

// Check if the current location's path starts with any of the dropdown link paths or is the "About Us" page
const isAboutUsActive = location.pathname === "/about" || dropdownLinks.some(link => location.pathname.startsWith(link.path));

useEffect(() => {
    window.addEventListener("scroll", handleScroll);
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
        <div className={`parent-div ${scrolling ? 'scrolling' : ''}`}>
            <div className="login-rectangle">
                <Link to="/contact" className="top_header_text">{t('apply')}</Link>
                <div className="blog_lang">
                    <div className="btn_lang_position">
                        <ul className="lang-dropdown" style={{ listStyle: "none" }}>
                            <li>
                                <div className="p-dropdown lang_drop_down" >
                                    <span className="lang_box">
                                        {t(i18n.language)}                                              
                                        <ArrowDropDownIcon className="dropdown-icon" onClick={toggleLangDropdown}/>
                                    </span>
                                    {langDropdownOpen && (
                                        <ul className="p-dropdown-content p-0 drop_content" style={{ display: langDropdownOpen ? 'block' : 'none', listStyle: "none" }}>
                                            <li onClick={() => changeLanguage('Khmer')}>{t('khmer')}  </li>
                                            <li onClick={() => changeLanguage('English')}>{t('english')}  </li>
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
                        <div className="menu" onClick={handleMenuClick}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                </div>


                <ul className={menuOpen ? "open" : ""}>
                    <li>
                        <NavLink exact to="/" activeClassName="active">{t('home')}  </NavLink>
                    </li>
                    <li onMouseEnter={toggleAboutDropdown} onMouseLeave={toggleAboutDropdown}>
                        <Link to="/about" className={`dropdown-link ${isAboutUsActive ? "active" : ""}`}>{t('about')}</Link>
                        {aboutDropdownOpen &&  
                            <ul className='dropdown-menu'>
                                {dropdownLinks.map(link => (
                                    <li key={link.path}><NavLink to={link.path} activeClassName="active">{link.name}</NavLink></li>
                                ))}
                            </ul>
                        }
                    </li>   
                    <li>
                        <NavLink to="/courses">{t('courses')}</NavLink>
                    </li>
                    <li>
                        <Button className="enroll_btn" variant="contained" component={Link} to="/contact">{t('enrollNow')}</Button>
                    </li>   
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
