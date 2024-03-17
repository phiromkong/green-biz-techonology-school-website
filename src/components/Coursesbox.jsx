import React, { useState } from 'react';
import CourseCard from './Coursecard';
import CourseList from './Courselist'; // import the CourseList component
import './css/Coursesbox.css';
import './css/Coursecard.css'
import Grid from '@mui/material/Grid';

const Coursesbox = ({ courses }) => {
 const [selectedProgramId, setSelectedProgramId] = useState(null);

 const handleCourseSelect = (programId) => {
    setSelectedProgramId(programId);
 };

 const filteredCourses = selectedProgramId ? courses.filter((course) => course.programId === selectedProgramId) : courses;

 return (
    <div>
      <div className="header-image">
        <img src={`${process.env.PUBLIC_URL}/Img2.jpg`} alt="Header" />
      </div>
      <div className='courses-box-title' onClick={() => { setSelectedProgramId(null) }}>
        <h1>Our Program</h1>
      </div>
      <div className="courses-container">
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <div>
            <CourseList className='program-list' courses={courses} onCourseSelect={handleCourseSelect} activeProgram={selectedProgramId} /> {/* Pass the programId to the activeProgram prop */}
          </div>
        </Grid>
        {/* Display courses */}
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <Grid container spacing={2}>
            {filteredCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4}>
                <CourseCard key={course.id} {...course} to={`/courses/${course.id}`} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      </div>
    </div>
 );
};

export default Coursesbox;
