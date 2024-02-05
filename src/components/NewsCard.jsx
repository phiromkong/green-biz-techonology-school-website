import React from 'react';
import { Link } from 'react-router-dom';
import './css/NewsCard.css';

function NewsCard({ title, imgUrl, description, content, id, imageStyle, gridColumn }) {
  const gridStyles = {
    gridColumn: gridColumn,
  };

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
          <div className="c_white font12rem text__content four_line program__content ac_text">
            <p>{description}</p>
          </div>
          <Link to={`/news/${id}`}>
            <div className="d-flex ohver_read pt-2">
              <button className="read_more">Read More</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;