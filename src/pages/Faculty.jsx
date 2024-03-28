import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import "../components/css/Faculty.css";
import Team from '../components/Team';
import Footer from '../components/Footer';
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import MetaHeader from '../components/MetaHeader'; // Import the MetaHeader component

const Faculty = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

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
                        <p>Dynamic, hard-working, and education lover, everyone says it, but in our case it&rsquo;s true: our team is the secret to our success, hence we call them partners. Each of our partners is best in their own skill, and together they are what makes CISC, our acronym, such a fun and rewarding place to work. The CISC team is a tight-knit, talented group with a shared vision of delivering consistently great results for our beloved students, as well as ensuring the agency is a fun, inclusive, challenging working-place.</p>

                        <p>We&rsquo;re very proud of the team we&rsquo;ve built. CISC has always been an agency defined by bringing together talented people with a shared vision and passion for helping us to be the best we can be for our students and parents.</p>

                        <p>Be bold: proactive, decisive, take responsibility, and try new things.&nbsp;<br />
                        Be Curious: ask questions, do some research, learn new techniques, and study our clients and their industries.&nbsp;<br />
                        Be Together: play an active role in the team, support your colleagues, collaborate, and have fun.&nbsp;<br />
                        Be Connected: Meet people, make contacts, build relationships, and see the bigger picture.&nbsp;<br />
                        Be Better: look for ways to improve, challenge yourself, never stop learning, and strive to be the best. Building, developing, training, retaining, and engaging the CISC team is a daily commitment. We work hard every day to make sure that our students are supported and empowered to deliver exceptional results for our clients.</p>
                    </div>
                </div>
                {!loading && <Team teamMembers={teamMembers} />} {/* Conditionally render Team component */}
            </section>
            <Footer />
        </div>
    );
};

export default Faculty;
