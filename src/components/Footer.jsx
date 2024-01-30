import React from 'react';
import "./css/Footer.css";
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Left Column */}
        <div className="footer-left">
          <h4>ADDRESS</h4>
          <p>Kampong Svay Village, Sangkat Kampong Svay, Serei 
              Saophoan Municipality, Banteay Meanchey Province</p>

          <h4>CONTACT US</h4>
          <p>Contact Number: 011 686 681 / 096 996 67 82</p>
          <p>E-mail: kimle.keo@gmail.com</p>

          {/* Social Icons */}
          <div className="social-icons">
            <SocialIcon style={{ height: 40, width: 40 }} url="https://facebook.com/gbt.school.bmc" />
            <SocialIcon style={{ height: 40, width: 40 }} url="https://instagram.com" />
            <SocialIcon style={{ height: 40, width: 40 }} url="https://gmail.com/" />
            <SocialIcon style={{ height: 40, width: 40 }} url="https://tiktok.com" />
            <SocialIcon style={{ height: 40, width: 40 }} url="https://telegram.me/Keokimle" />
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
                <button className="view-map-button">VIEW ON MAP</button>
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
