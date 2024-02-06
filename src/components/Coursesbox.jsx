import React from 'react';
import CourseCard from './Coursecard';
import './css/Coursesbox.css';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const Coursesbox = ({ courses }) => {
  return (
    <div>
      <div className="header-image">
        <img src={`${process.env.PUBLIC_URL}/Img2.jpg`} alt="Header" />
      </div>
      <div className='courses-box-title'>Our Program</div>
      <div className="courses-container">
        <Grid container spacing={10}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
              <Link to={`/courses/${course.id}`}>
                <CourseCard {...course} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Coursesbox;
