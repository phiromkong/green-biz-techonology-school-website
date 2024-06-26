import React from 'react';
import "./css/Footer.css";
import { SocialIcon } from 'react-social-icons'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const {t} = useTranslation();
  return (
    <footer>
      <div className="footer-container">
        {/* Left Column */}
        <div className="footer-left">
          <h4>{t('address')}</h4>
          <p>{t('Address')}</p>
          <div className="footer-left__content">
            <h4>{t('contact')}</h4>
            <p>{t('contactNum')}: 011 686 681 / 096 996 67 82</p>
            <p>{t('email')}: kimle.keo@gmail.com</p>
          </div>
          {/* Social Icons */}
          <div className="social-icons">
            <SocialIcon style={{ height: 40, width: 40 }} url="https://www.facebook.com/greenbiztechnologyschool?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" />
            <SocialIcon style={{ height: 40, width: 40 }} url="https://instagram.com" target="_blank" rel="noopener noreferrer" />
            <SocialIcon style={{ height: 40, width: 40 }} url="https://gmail.com/" target="_blank" rel="noopener noreferrer" />
            <SocialIcon style={{ height: 40, width: 40 }} url="https://www.tiktok.com/@gbtschool?_t=8kxhX3t0eyA&_r=1" target="_blank" rel="noopener noreferrer" />
            <SocialIcon style={{ height: 40, width: 40 }} url="https://t.me/greenbiztechnologyschool" target="_blank" rel="noopener noreferrer" />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="footer-right">
          {/* Google Map */}
          <div className="google-map">
            <div style={{ width: '100%' }}>
                <iframe 
                title="Google Map"
                width="100%" height="350" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" 
                src="https://maps.google.com/maps?width=100%25&amp;height=350&amp;hl=en&amp;q=Green%20Biz%20Technology%20School,%20Sisophon,%20Banteay%20Meanchey+(Green%20Biz%20Technology%20School)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                />
            </div>
                {/* "View on the Map" Button */}
                <button className='view-map-button'>
                  <Link style={{color: 'white'}} to={"https://www.google.com/maps?ll=13.593064,102.973053&z=14&t=m&hl=en&gl=US&mapclient=embed&cid=10804990733860351961"} target="_blank" rel="noopener noreferrer"> VIEW ON MAP</Link>
                </button>
            </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="copyright-content">
        <div className="container">
          <p>
            Copyright © 2022 Green Biz Technology School. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
