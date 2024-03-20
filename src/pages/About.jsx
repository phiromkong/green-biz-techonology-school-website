import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import Partners from '../components/Partners';
import Hero from '../components/Hero';
import MVission from '../components/MVission';
import Backdrop from '@mui/material/Backdrop';
import { Slide } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const About = () => {
    const [partnerLogos, setPartnerLogos] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    useEffect(() => {
        const fetchPartners = async () => {
          const partnersCollection = collection(db, "partners");
          const partnersSnapshot = await getDocs(partnersCollection);
          const partnersList = partnersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setPartnerLogos(partnersList);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        };
        fetchPartners();
    }, []);

    if (loading) {
        return <div>{loading && (
          <Backdrop
            sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            onClick={() => {}}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}</div>; // Show a loading indicator
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
