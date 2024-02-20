import React, { useState } from 'react';
import CourseCard from './Coursecard';
import CourseList from './Courselist'; // import the CourseList component
import './css/Coursesbox.css';
import './css/Coursecard.css'
import Grid from '@mui/material/Grid';

const Coursesbox = ({ courses }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleCourseSelect = (program) => {
    setSelectedProgram(program);
  };

  const filteredCourses = selectedProgram ? courses.filter((course) => course.program === selectedProgram) : courses;

  return (
    <div>
      <div className="header-image">
        <img src={`${process.env.PUBLIC_URL}/Img2.jpg`} alt="Header" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
        <div className='courses-box-title'>Our Program</div>
        <CourseList courses={courses} onCourseSelect={handleCourseSelect} /> {/* Add the CourseList component here */}
      </div>
      <div className="courses-container">
        <Grid container spacing={10}>
          {/* Display courses */}
          {filteredCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
                <CourseCard {...course} to={`/courses/${course.id}`} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Coursesbox;