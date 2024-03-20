import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { SocialIcon } from 'react-social-icons';
import "./css/Hero.css";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { data } from 'jquery';

const Hero = () => {
 const [quote, setQuote] = useState('');
 const { t, i18n } = useTranslation(); // Use the useTranslation hook

 useEffect(() => {
    const fetchQuote = async () => {  
       const ourTeamRef = collection(db, 'team');
       const q = query(ourTeamRef, where('enFirstName', '==', 'Kimle')); // Adjust the query based on the current language
       const querySnapshot = await getDocs(q);
       if (!querySnapshot.empty) {
         // Assuming you want the first document that matches the query
         const doc = querySnapshot.docs[0];
         const data = doc.data();
         setQuote(data[i18n.language === 'kh' ? 'khQuote' : 'enQuote']); // Adjust the quote based on the current language
       } else {
         console.log("No documents found!");
       }
    };
   
    fetchQuote();
   }, [i18n.language]); // Add i18n.language as a dependency to re-fetch the quote when the language changes
   
 return (
    <div className="containerWrapper">
      <div className="flexContainer">
        <div className="contentSection">
          <div className="heading">
            <h1>{t('meetOurHeadOfSchool')}</h1>
          </div>
          <div className="hero-features">
            <p className='hero-feature'>{quote}</p>
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
