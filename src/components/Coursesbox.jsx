import React, { useState } from 'react';
import CourseCard from './Coursecard';
import CourseList from './Courselist'; // import the CourseList component
import './css/Coursesbox.css';
import './css/Coursecard.css';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { Paper, InputBase, IconButton, Stack, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Coursesbox = ({ courses }) => {
 const [selectedProgramId, setSelectedProgramId] = useState(null);
 const [searchTerm, setSearchTerm] = useState('');
 const {i18n, t} = useTranslation();
 const isMobile = useMediaQuery('(max-width:600px)');

 const handleCourseSelect = (programId) => {
    setSelectedProgramId(programId);
 };

 const filteredCoursesByProgram = selectedProgramId ? courses.filter((course) => course.programId === selectedProgramId) : courses;
 const filteredCourses = filteredCoursesByProgram.filter(course =>
        course[i18n.language === 'en' ? 'enTitle' : 'khTitle'].toLowerCase().includes(searchTerm.toLowerCase())
    );

 return (
    <div>
      <div className='courses-box-title' onClick={() => { setSelectedProgramId(null) }}>
        <h1>{t('courses')}</h1>
      </div>
      
      <div className="courses-container">
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <div className="search-bar">
            <Paper
              component="form"
              sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isMobile ? 'center' : 'flex-end',
                  width: isMobile ? '100%' : 345,
                  marginTop: '1rem',
                  marginBottom: '1rem',

                  height: 50
              }}
            >
              <InputBase
                  sx={{ ml: 1, flex: 1, fontFamily: "Kantumruy Pro" }}
                  placeholder={t('courseSearch')}
                  inputProps={{ "aria-label": "search courses" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                  <SearchIcon />
              </IconButton>
            </Paper>
          </div>
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
