import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import "../components/css/Faculty.css";
import Team from '../components/Team';
import Footer from '../components/Footer';
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import MetaHeader from '../components/MetaHeader'; // Import the MetaHeader component
import { useTranslation } from 'react-i18next';

const Faculty = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const {t} = useTranslation();
    useEffect(() => {
        const fetchTeamMembers = async () => {
            const teamCollection = collection(db, "team");
            const teamSnapshot = await getDocs(teamCollection);
            console.log("Fetched team members:", teamSnapshot.docs); // Debugging line
            const teamList = teamSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTeamMembers(teamList);
            setLoading(false); // Set loading to false after data fetching
        };
    
        fetchTeamMembers();
    }, []);
    
    return (
        <div>
            <MetaHeader
                title="GBT School Faculty - Meet Our Team"
                description="Discover the dedicated team behind GBT School. Our faculty is passionate about education and committed to providing the best learning experience for our students."
                keywords="faculty, team, GBT School, education, passion, learning"
                ogTitle="GBT School Faculty - Meet Our Team"
                ogDescription="Discover the dedicated team behind GBT School. Our faculty is passionate about education and committed to providing the best learning experience for our students."
                ogImage="https://www.gbtschool.com/logo.png"
                ogUrl="https://www.gbtschool.org/faculty"
            />
            <Navbar />
            <section className="background-grey bg_green pt-50 pb-50">
                <div className="container">
                    <div className="row c_white" style={{backgroundColor: '#006C44'}}>
                        <h4 className="team_title">Our Team</h4>
                        <p>{t('teamDescription1')}&nbsp;<br /> {t('teamDescription2')} &nbsp;<br /> {t('teamDescription3')} &nbsp;<br /> {t('teamDescription4')}
                        <ul>
                            <li>{t('innovation')}</li>
                            <li>{t('collaboration')}</li>
                            <li>{t('excellence')}</li>
                            <li>{t('empowerment')}</li>
                            <li>{t('community')}</li>
                        </ul>
                        &nbsp;<br /> {t('teamDescription5')}</p>
                    </div>
                </div>
                {!loading && <Team teamMembers={teamMembers} />} {/* Conditionally render Team component */}
            </section>
            <Footer />
        </div>
    );
};

export default Faculty;
