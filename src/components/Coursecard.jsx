import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './css/Coursecard.css';
import { useTranslation } from 'react-i18next';

const CourseCard = ({ id, image, title, description}) => {
  const { t } = useTranslation();
  return (
      <Card className='course-card'>
        <CardActionArea component="a" href={`/courses/${id}`} className="card-action-area">
          <CardMedia component="img" height="140" image={image || `${process.env.PUBLIC_URL}/placeholder.jpg`} alt={title} className="card-media-img"/>
          <CardContent>
            <Typography variant="h5" component="div" style={{fontFamily: 'Kantumruy Pro', fontWeight: 'bold'}}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{color: 'black', fontFamily: 'Kantumruy Pro', overflow: 'hidden', fontWeight: '450', paddingTop: '15px'}}>
              {description}
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