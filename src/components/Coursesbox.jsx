import React, { useState } from 'react';
import CourseCard from './Coursecard';
import './css/Coursesbox.css';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import SearchBar from 'material-ui-search-bar';

const Coursesbox = ({ courses }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter courses based on search query
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="header-image">
        <img src={`${process.env.PUBLIC_URL}/Img2.jpg`} alt="Header" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
        <div className='courses-box-title'>Our Program</div>
        {/* Search bar */}
        <SearchBar
          className="search-bar"
          value={searchQuery}
          onChange={(newValue) => setSearchQuery(newValue)}
          onRequestSearch={() => console.log('Search triggered')}
        />
      </div>
      <div className="courses-container">
        <Grid container spacing={10}>
          {/* Display filtered courses */}
          {filteredCourses.map((course) => (
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
