import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import Partners from '../components/Partners';
import Hero from '../components/Hero';
import MVission from '../components/MVission';

const About = () => {
    const [partnerLogos, setPartnerLogos] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    useEffect(() => {
        const fetchPartners = async () => {
          const partnersCollection = collection(db, "partners");
          const partnersSnapshot = await getDocs(partnersCollection);
          const partnersList = partnersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setPartnerLogos(partnersList);
          setLoading(false); 
        };
        fetchPartners();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator
    }
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
