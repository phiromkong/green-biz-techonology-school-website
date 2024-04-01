import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path correctly points to your Firebase configuration
import Navbar from './Navbar';
import Footer from './Footer';
import './css/Coursedetail.css';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import NotFound from './NotFound';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const CoursesDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const { t, i18n } = useTranslation(); // Use the useTranslation hook

    useEffect(() => {
        const fetchCourse = async () => {
            const courseDocRef = doc(db, "courses", id);
            const courseDocSnap = await getDoc(courseDocRef);
            if (courseDocSnap.exists()) {
                setCourse(courseDocSnap.data());
            } else {
                console.log("No such document!");
            }
            setLoading(false); // Set loading to false after fetching data
        };

        fetchCourse();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading) { // Show loading spinner while fetching data
        return (
            <Backdrop
                sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={() => {}}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (!course) {
        return <NotFound />;
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
                    <h2>{t('programOverview')}</h2>
                    <p dangerouslySetInnerHTML={{ __html: programOverview }} />
                </div>
                <div className='section'>
                    <h2>{t('programOutcome')}</h2>
                    <p dangerouslySetInnerHTML={{ __html: programOutcome }} />
                </div>
                <button onClick={handleContactClick} style={{fontFamily: "Kantumruy Pro"}}>{t('enrollNow')}</button>
                <div>
                    <Button className='back-btn' style={{textTransform: 'none', width: '15%', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', borderRadius: '10px', padding: '10px 20px', fontFamily: "Kantumruy Pro"}} onClick={handleBackClick}>​​{t('back')}</Button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CoursesDetail;
