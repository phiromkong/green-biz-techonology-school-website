import React from 'react';
import { SocialIcon } from 'react-social-icons'
import "./css/Hero.css";

const Hero = () => {
  return (
    <div className="containerWrapper">
      <div className="flexContainer">
        <div className="contentSection">
          <div className="heading">
            <h1>Meet Our Head of School</h1>
          </div>
          <div className="hero-features">
            <p className='hero-feature'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation Ut enim ad minim veniam, quis nostrud exercitation. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation Ut enim ad minim veniam, quis nostrud exercitation”</p>
          </div>
        </div>
        <div className="imageSection">
          <img
            className="heroImage"
            src="./HeadOfSchool.png"
            alt="head of school"
          />
          <div className="socialIcons">
            <SocialIcon url="https://facebook.com/keo.kimlei" style={{ height: 40, width: 40, margin: '0 5px' }} />
            <SocialIcon url="https://telegram.me/Keokimle" style={{ height: 40, width: 40, margin: '0 5px' }}/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
