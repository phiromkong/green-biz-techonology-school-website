import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from 'react-i18next';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


import "./css/Navbarhook.css";

const Navbarhook = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const location = useLocation();
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const { t, i18n } = useTranslation();


  const toggleLangDropdown = (event) => {
    event.stopPropagation();
    setLangDropdownOpen(!langDropdownOpen);
};
const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
};

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuOnMobile = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };
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

  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list";
    const linkClassName = "nav__link";
    // Define the dropdown links
    const dropdownLinks = [
        { path: '/news', name: t('news') },
        { path: '/our-team', name: t('ourTeam') },
        { path: '/gallery', name: t('gallery') },
        { path: '/contact', name: t('contact')},
    ];

    // Check if the current location's path starts with any of the dropdown link paths or is the "About Us" page
    const isAboutUsActive = location.pathname === "/about" || dropdownLinks.some(link => location.pathname.startsWith(link.path));

    return (
      <ul className={listClassName}>
        <li className="nav__item">
          <NavLink
            to="/"
            className={linkClassName}
            activeClassName="active"
            onClick={closeMenuOnMobile}
          >
            Home
          </NavLink>
        </li>
        <li className="nav__item" onMouseEnter={toggleAboutDropdown} onMouseLeave={toggleAboutDropdown}>
          <Link
            to="/about"
            onClick={closeMenuOnMobile}
            className={`dropdown-link ${isAboutUsActive ? "active" : ""}`}
          >
            About
          </Link>
          {aboutDropdownOpen &&  
            <ul className='dropdown-menu'>
              {dropdownLinks.map(link => (
                <li key={link.path}>
                  <NavLink to={link.path} activeClassName="active">
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          }
        </li>   
        <li className="nav__item">
          <NavLink
            to="/courses"
            className={linkClassName}
            activeClassName="active"
            onClick={closeMenuOnMobile}
          >
            Courses
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/contact"
            className={`${linkClassName} nav__cta`}
            activeClassName="active"
            onClick={closeMenuOnMobile}
          >
            Enroll Now
          </NavLink>
        </li>   
      </ul>
    );
  };

  return (
    
    <header className="header">
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
        </div>
      <nav className="nav container">
        <Link to="/" className="title">
          <div className="logo-container">
            <img src="/logo2.png" alt="School Logo" className="logo" />
          </div>
        </Link>

        {isMobile && (
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}

        {isMobile ? (
          <div
            className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`}
            id="nav-menu"
          >
            {renderNavLinks()}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
        ) : (
          renderNavLinks()
        )}
      </nav>
    </header>
  );
};

export default Navbarhook;
