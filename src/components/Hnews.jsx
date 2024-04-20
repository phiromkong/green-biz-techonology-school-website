import React from 'react';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import "./css/Hnews.css";
import { useTranslation } from 'react-i18next';

function Hnews({ children, limit = 2 }) {
  const limitedChildren = React.Children.toArray(children).slice(0, limit);
  const {t} = useTranslation();

  return (
    <div className="program_container ">
      <h2 className='news_update_title'>{t('news')}</h2>
      <button className='all_news'>
        <Link to="/news" style={{ color: 'black' }}>{t('allNews')}</Link>
      </button>
      <Grid container spacing={2}>
        {limitedChildren.map((child, index) => {
          const isOdd = index % 2 !== 0;
          const isColumnOdd = Math.floor(index / 2) % 2 !== 0;
          const imageStyle = (isColumnOdd && isOdd) || (!isColumnOdd && !isOdd)
            ? 'c_program_image_y'
            : 'c_program_image_w';
  
          return (
            <Grid item key={index} xs={12} md={6}>
              {React.cloneElement(child, { imageStyle })}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Hnews;