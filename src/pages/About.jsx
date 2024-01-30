import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import Partners from '../components/Partners';
import Hero from '../components/Hero';
import MVission from '../components/MVission';

const About = () => {
    const partnerLogos = [
        {icon: "./IFLS-Logo.png"},
        {icon: "./Vattanac-Logo.png"},
        {icon: "./IFLS-Logo.png"},
        {icon: "./IFLS-Logo.png"},
        {icon: "./Vattanac-Logo.png"},
        {icon: "./IFLS-Logo.png"},
        {icon: "./IFLS-Logo.png"},
        {icon: "./Vattanac-Logo.png"},
        {icon: "./IFLS-Logo.png"},
        {icon: "./IFLS-Logo.png"},
        {icon: "./Vattanac-Logo.png"},
        {icon: "./IFLS-Logo.png"},
      ];
    return (
        <div>
            <Navbar />
            <Hero />
            <MVission />
            <Partners images={partnerLogos} />
            <Footer />
        </div>
    );
};

export default About;
