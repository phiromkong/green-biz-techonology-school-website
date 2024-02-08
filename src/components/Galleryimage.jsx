import React from 'react';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css'; // Import lightgallery CSS
import 'lightgallery/css/lg-zoom.css'; // Import lightgallery zoom CSS
import 'lightgallery/css/lg-thumbnail.css'; // Import lightgallery thumbnail CSS
import lgThumbnail from 'lightgallery/plugins/thumbnail'; // Import lightgallery thumbnail plugin
import lgZoom from 'lightgallery/plugins/zoom'; // Import lightgallery zoom plugin

const Gallery = ({ itemData }) => {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };

    return (
        <div className="App">
            <LightGallery
                onInit={onInit}
                plugins={[lgThumbnail, lgZoom]} // Specify plugins
            >
                {itemData.map((item) => (
                    <a href={item.img} key={item.id}>
                        <img alt={item.title} src={item.img} />
                    </a>
                ))}
            </LightGallery>
        </div>
    );
};

export default Gallery;
