// Program.jsx
import React from 'react';
import "./News.css";

function Program({ title, imgUrl, description, link, imageStyle, gridColumn }) {
    const gridStyles = {
        gridColumn: gridColumn,
      };
  return (
    <div className="text-center" style={gridStyles}>
      <div className="program_box">
        <a href={link}>
          <img className={`c_program_image ${imageStyle}`} src={imgUrl} alt={title} />
        </a>
        <div className="pt-5">
          <a href={link}>
            <h4 className="c_white ctitle_program">{title}</h4>
          </a>
          <div className="c_white font12rem text__content four_line program__content ac_text">
            <p>{description}</p>
          </div>
          <a href={link}>
            <div className="d-flex ohver_read pt-2">
              <button className="read_more">Read More</button>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Program;
