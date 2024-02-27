import Grid from '@mui/material/Grid';
import CourseCard from './Coursecard'; 
import { Link } from 'react-router-dom';
import './css/Hcourse.css';
import { useTranslation } from 'react-i18next';

const Hcourse = ({ courses }) => {
  const { t} = useTranslation();
    return(
      <div className="container">
        <h2 className="courseTitle">{t('courses')}</h2>
        <button className='all_courses'>
          <Link to="/courses" style={{color: 'white'}}>{t('allCourses')}</Link>
        </button>
        <Grid container spacing={1}>
          {courses.map((course, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <CourseCard {...course} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
};

export default Hcourse;
