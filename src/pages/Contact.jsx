import React from 'react';
import Navbar from '../components/Navbar';
import ContactHeader from '../components/Contactheader';
import ContactForm from '../components/Contactform';
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <div>
            <Navbar />
            <div className="containerWrapper">
                <ContactHeader />
            </div>
            <ContactForm />
            <Footer />
        </div>
    );
};

export default Contact;

