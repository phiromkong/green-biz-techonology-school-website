import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import styles from './Coursecard.css';

const CourseCard = ({ image, title, description }) => (
  <Card className='course-card'>
    <CardActionArea className="card-action-area">
      <CardMedia component="img" height="140" image={image} alt={title} className="card-media-img"/>
      <CardContent>
        <Typography variant="h5" component="div" className={styles.courseTitle}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className={styles.courseDescription}>
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
        <Button className='bt_read_more'>
          Read More
        </Button>
      </CardActions>
  </Card>
);

export default CourseCard;
