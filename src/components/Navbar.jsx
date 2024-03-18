import React, { useState, useEffect } from "react";
import "./css/Navbar.css";
import {  Link, NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive"; 
import { IoClose, IoMenu } from "react-icons/io5";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: "1150px" });

  const toggleMenu = (event) => {
    event.stopPropagation();
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

  const toggleAboutDropdown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("About dropdown state before toggle:", aboutDropdownOpen);
    setAboutDropdownOpen(!aboutDropdownOpen);
    console.log("About dropdown state after toggle:", !aboutDropdownOpen);
  };

  const toggleLangDropdown = (event) => {
    event.stopPropagation();
    setLangDropdownOpen(!langDropdownOpen);
};
  

  const dropdownLinks = [
    { path: '/news', name: t('news') },
    { path: '/our-team', name: t('ourTeam') },
    { path: '/gallery', name: t('gallery') },
    { path: '/contact', name: t('contact')},
  ];


  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";
    const buttonClassName = "nav__cta";
    const isAboutUsActive = location.pathname === "/about" || dropdownLinks.some(link => location.pathname.startsWith(link.path));


    return (
      <ul className={listClassName}>
        <li>
          <NavLink to="/" className={linkClassName} onClick={closeMenuOnMobile}>
            {t('home')}
          </NavLink>
        </li>
        <li onMouseEnter={toggleAboutDropdown} onMouseLeave={toggleAboutDropdown}>
          <NavLink to="/about" className={`${linkClassName} ${isAboutUsActive}`}>
            {t('about')} <ArrowDropDownIcon onClick={!isMobile ? closeMenuOnMobile : toggleAboutDropdown} />
          </NavLink>
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
        <li>
          <NavLink to="/courses" className={linkClassName} onClick={closeMenuOnMobile}>
            {t('COURSES')}
          </NavLink>
        </li>
        <li>
          <Link to="/contact" className={`${linkClassName} ${buttonClassName}`} onClick={closeMenuOnMobile}>
            {t('enrollNow')}
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <div className={`parent-div ${scrolling ? 'scrolling' : ''}`}>
      <div className="login-rectangle">
        <NavLink to="/contact" className="top_header_text">{t('apply')}</NavLink>
        <div className="blog_lang">
          <div className="btn_lang_position">
            <ul className="lang-dropdown" style={{ listStyle: "none" }}>
              <li>
                <div className="p-dropdown lang_drop_down">
                  <span className="lang_box">
                  {console.log("Current language:", i18n.language)}
                    {t(i18n.language)}                                              
                    <ArrowDropDownIcon className="dropdown-icon" onClick={toggleLangDropdown} />
                  </span>
                  {langDropdownOpen && (
                    <ul className="p-dropdown-content p-0 drop_content" style={{ display: langDropdownOpen ? 'block' : 'none', listStyle: "none" }}>
                      <li onClick={() => changeLanguage('Khmer')}>{t('khmer')}</li>
                      <li onClick={() => changeLanguage('English')}>{t('english')}</li>
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
          <NavLink to="/" className="title">
            <div className="logo-container">
              <img src="/logo2.png" alt="School Logo" className="logo" />
            </div>
          </NavLink>
        </div>
        {isMobile && (
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}

        {isMobile ? (
          <div className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`} id="nav-menu">
            {renderNavLinks()}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
        ) : (
          renderNavLinks()
        )}
      </nav>
    </div>
  );
};

export default Navbar;
