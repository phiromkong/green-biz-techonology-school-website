// CoursesBox.js
import React from 'react';
import CourseCard from './Coursecard'; // Replace with the actual path to your CourseCard component
import './css/Coursesbox.css'; // Add your styling for CoursesBox
import Grid from '@mui/material/Grid';

const Coursesbox = ({ courses }) => {
  return (
    <div>
      <div className="header-image">
        <img src={`${process.env.PUBLIC_URL}/Img2.jpg`} alt="Header" />
      </div>
      <div className='courses-box-title'>Our Program</div>
      <div className="courses-container">
        <Grid container spacing={10}>
          {courses.map((course, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <CourseCard {...course} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Coursesbox;
