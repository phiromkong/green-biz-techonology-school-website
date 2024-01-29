import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import Partners from '../components/Partners';

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
            <h1>About Page</h1>
            <p>Welcome to the About page of our website!</p>
            <Partners images={partnerLogos} />
            <Footer />
        </div>
    );
};

export default About;
