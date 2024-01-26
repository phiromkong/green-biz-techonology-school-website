// Assuming you have MUI Grid imported
import Grid from '@mui/material/Grid';
import CourseCard from './Coursecard'; 
import './Hcourse.css';

const Hcourse = ({ courses }) => (
  <div className="container">
    <h2 className="courseTitle">Courses</h2>
    <button className='all_courses'>Explore all Courses</button>
    <Grid container spacing={1}>
      {courses.map((course, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <CourseCard {...course} />
        </Grid>
      ))}
    </Grid>
  </div>
);

export default Hcourse;
