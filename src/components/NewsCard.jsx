import React from 'react';
import { Link } from 'react-router-dom';
import './css/NewsCard.css';
import { useTranslation } from 'react-i18next';

function NewsCard({ title, imgUrl, description, content, id, imageStyle, gridColumn }) {
  const gridStyles = {
    gridColumn: gridColumn,
  };
  const {t} = useTranslation(); 

  return (
    <div className="text-center" style={gridStyles}>
      <div className="program_box">
        <Link to={`/news/${id}`}>
          <img className={`c_program_image ${imageStyle}`} src={imgUrl} alt={title} />
        </Link>
        <div className="pt-5">
          <Link to={`/news/${id}`}>
            <h4 className="c_white ctitle_program">{title}</h4>
          </Link>
          <div className="text__content">
            <p style={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              maxHeight: '2.6em', // Adjust this value based on font-size and line-height
            }}>{description}</p>
          </div>
          <Link to={`/news/${id}`}>
            <div className="d-flex ohver_read pt-2">
              <button className="read_more">{t('readMore')}</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;