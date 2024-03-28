import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './css/Coursecard.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'; // Ensure this path correctly points to your Firebase configuration

const CourseCard = ({ id }) => {
 const { t, i18n } = useTranslation(); // Use the useTranslation hook
 const [course, setCourse] = useState(null);
 const [loading, setLoading] = useState(true); // Add a loading state


 useEffect(() => {
    const fetchCourse = async () => {
      const courseDocRef = doc(db, "courses", id); // Correctly reference the document
      const courseDocSnap = await getDoc(courseDocRef); // Use getDoc to retrieve the document
      if (courseDocSnap.exists()) {
        setCourse(courseDocSnap.data());
      }
      setLoading(false);
    };

    fetchCourse();
 }, [id]);

 if (loading && !course){ 
  return (
    <div>
      <Backdrop
        sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
  }

 // Determine the title and description based on the current language
 const courseTitle = i18n.language === 'kh' ? course.khTitle : course.enTitle;
 const courseDescription = i18n.language === 'kh' ? course.khDescription : course.enDescription;

 return (
    <Card sx={{ maxWidth: 400 }} className='course-card'>
      <CardActionArea component="a" href={`/courses/${id}`} className="card-action-area">
        <CardMedia component="img" height="400px" image={course.imageURL || `${process.env.PUBLIC_URL}/placeholder.jpg`} alt={courseTitle} className="card-media-img"/>
        <CardContent>
          <Typography variant="h5" component="div" style={{fontFamily: 'Kantumruy Pro', fontWeight: 'bold'}}>
            {courseTitle}
          </Typography>
          <Typography sx={{
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
    }} variant="body2" color="text.secondary" style={{color: 'black', fontFamily: 'Kantumruy Pro', overflow: 'hidden', fontWeight: '450', paddingTop: '15px'}}>
            {courseDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" style={{ backgroundColor: '#f2c72d', color: 'black', textTransform: 'none', fontFamily: 'Kantumruy Pro', fontWeight: 'bold'}}>
          <a href={`/courses/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{t('readMore')}</a>
        </Button>
      </CardActions>
    </Card>
 );
};

export default CourseCard;
