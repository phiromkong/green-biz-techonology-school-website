import React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './css/Coursedetail.css';
import Button from '@material-ui/core/Button';


const CoursesDetail = ({ courses }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const course = courses.find((course) => course.id === Number(id));

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

    return (
        <div>
            <Navbar />
            <div className='course-details'>
                <div className='course-title'>{course.title}</div>
                <img src={course.image} alt={course.title} style={{ width: '100%' }} />
                <div className='section'>
                    <h2>Program Overview</h2>
                    <p>{course.programOverview}</p>
                </div>
                <div className='section'>
                    <h2>Program Outcome</h2>
                    <p>{course.programOutcome}</p>
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
