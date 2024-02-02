import React from 'react';
import { Link } from 'react-router-dom';
import "./css/Newspost.css"
const Newspost = ({ id, title, content, date, thumbnailImage, newsImages }) => {
  // Ensure newsImages is an array before mapping over it
  const imagesToShow = Array.isArray(newsImages) ? newsImages : [];

  return (
      <Link style={{color: 'black'}} to={`/news/${id}`}>    <div className="post-item block">
      <div className="post-item-wrap">
        {/* Thumbnail Image */}
        <div className="post-image">
          <img width="100%" src={thumbnailImage} alt={title} />
        </div>
  
        {/* Render post content */}
        <div className="post-item-description">
          <h4>{title}</h4>
          <div className="five_line">
            <p>{content}</p>
          </div>
          <p style={{paddingTop: "10px"}}>Posted on {date}</p>
        </div>
  
        {/* Additional News Images */}
        <div className="additional-images">
          {imagesToShow.map((image, index) => (
            <img key={index} width="100%" src={image} alt={`${title} ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
    </Link>
  );
};

export default Newspost;
