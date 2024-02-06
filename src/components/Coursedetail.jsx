import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const CoursesDetail = ({ courses }) => {
    const { id } = useParams();
    const course = courses.find((course) => course.id === Number(id));
  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div>
      <Navbar />
      <div className='course-details'>
        <div className='course-title'>{course.title}</div>
        <p>{course.description}</p>
        {/* Add more details as needed */}
      </div>
      <Footer />
    </div>
  );
};

export default CoursesDetail;