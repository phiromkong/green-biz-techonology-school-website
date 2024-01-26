import React from 'react';
import "./Hnews.css";

function Hnews({ children }) {
  return (
    <div className="program_container text-center">
      <h2 className='news_update_title'>News and Update</h2>
      <button className='all_news'>Explore all News</button>
      <div className="program_grid">
        {React.Children.map(children, (child, index) => {
          const isOdd = index % 2 !== 0;
          const isColumnOdd = Math.floor(index / 2) % 2 !== 0;
          const imageStyle = (isColumnOdd && isOdd) || (!isColumnOdd && !isOdd)
            ? 'c_program_image_y'
            : 'c_program_image_w';
          const columnClass = isColumnOdd ? 'right-column' : '';

          return React.cloneElement(child, { imageStyle, columnClass });
        })}
      </div>
    </div>
  );
}

export default Hnews;
