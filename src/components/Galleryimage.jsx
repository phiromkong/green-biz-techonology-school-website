import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const Galleryimg = ({ itemData }) => {
    return (
      <ImageList sx={{ width: 1000, height: 500 }} cols={3} rowHeight={200}>
        {itemData.map((item) => (
          <ImageListItem key={item.id}>
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  };
  

export default Galleryimg;