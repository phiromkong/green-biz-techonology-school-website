import React from 'react';
import Navbar from '../components/Navbar';
import Galleryimg from '../components/Galleryimage';
import Footer from '../components/Footer';
import "../components/css/Gallery.css";

const Gallery = () => {
    const itemData = [
        { id: 1, img: '../Img1.jpg', title: 'Title 1' },
        { id: 2, img: '../Img2.jpg', title: 'Title 2' },
        { id: 3, img: '../Img3.jpg', title: 'Title 3' },
        { id: 4, img: '../Img1.jpg', title: 'Title 1' },
        { id: 5, img: '../Img2.jpg', title: 'Title 2' },
        { id: 6, img: '../Img3.jpg', title: 'Title 3' },
        { id: 7, img: '../Img1.jpg', title: 'Title 1' },
        { id: 8, img: '../Img2.jpg', title: 'Title 2' },
        { id: 9, img: '../Img3.jpg', title: 'Title 3' },
        { id: 10, img: '../Img1.jpg', title: 'Title 1' },
        { id: 11, img: '../Img2.jpg', title: 'Title 2' },
        { id: 12, img: '../Img3.jpg', title: 'Title 3' },
    ];
    return (
        <div>
            <Navbar />
            <div>
                    <h1 className='gallery-title'>Gallery</h1>
                </div>
            <div className='gallery-container'>
                <div className='gallery-grid'>
                <Galleryimg itemData={itemData} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Gallery;
