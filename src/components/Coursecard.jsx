import React from 'react';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './css/Coursecard.css';

const CourseCard = ({ image, title, description, link }) => (
  <Card className='course-card'>
    <CardActionArea className="card-action-area">
      <CardMedia component="img" height="140" image={image} alt={title} className="card-media-img"/>
      <CardContent>
        <Typography variant="h5" component="div" className={{fontFamily: 'Roboto Slab'}}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{color: 'black', fontFamily: 'Inter', overflow: 'hidden'}}>
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
    <Button variant="contained" style={{ backgroundColor: '#f2c72d', color: 'black', textTransform: 'none', fontWeight: 'bold' }}>
        <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
          Read More
        </Link>
      </Button>
    </CardActions>
  </Card>
);

export default CourseCard;
