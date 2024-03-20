import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path correctly points to your Firebase configuration
import Navbar from './Navbar';
import Footer from './Footer';
import './css/Coursedetail.css';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const CoursesDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const { i18n } = useTranslation(); // Use the useTranslation hook

    useEffect(() => {
        const fetchCourse = async () => {
            const courseDocRef = doc(db, "courses", id);
            const courseDocSnap = await getDoc(courseDocRef);
            if (courseDocSnap.exists()) {
                setCourse(courseDocSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchCourse();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!course) {
        return <p>Course not found</p>;
    }

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleContactClick = () => {
        navigate('/contact', { state: { courseTitle: course.title } });
    };

    // Determine the title based on the current language
    const courseTitle = i18n.language === 'kh' ? course.khTitle : course.enTitle;
    const programOverview = i18n.language === 'kh' ? course.khProgramOverview : course.enProgramOverview;
    const programOutcome = i18n.language === 'kh' ? course.khProgramOutcome : course.enProgramOutcome;

    return (
        <div>
            <Navbar />
            <div className='course-details'>
                <div className='course-title'>{courseTitle}</div>
                <img src={course.imageURL} alt={courseTitle} style={{ width: '100%' }} />
                <div className='section'>
                    <h2>Program Overview</h2>
                    <p>{programOverview}</p>
                </div>
                <div className='section'>
                    <h2>Program Outcome</h2>
                    <p>{programOutcome}</p>
                </div>
                <button onClick={handleContactClick}>Contact Us to Register</button>
                <div>
                    <Button className='back-btn' style={{textTransform: 'none', width: '15%', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', borderRadius: '10px', padding: '10px 20px'}} onClick={handleBackClick}>Back</Button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CoursesDetail;
