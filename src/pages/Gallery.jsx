import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Galleryimg from '../components/Galleryimage';
import Footer from '../components/Footer';
import "../components/css/Gallery.css";
import Pagination from '../components/Pagination';

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
        { id: 13, img: '../Img1.jpg', title: 'Title 1' },
        { id: 14, img: '../Img2.jpg', title: 'Title 2' },
        { id: 15, img: '../Img3.jpg', title: 'Title 3' },
        { id: 16, img: '../Img1.jpg', title: 'Title 1' },
        { id: 17, img: '../Img2.jpg', title: 'Title 2' },
        { id: 18, img: '../Img3.jpg', title: 'Title 3' },
        { id: 19, img: '../Img1.jpg', title: 'Title 1' },
        { id: 20, img: '../Img2.jpg', title: 'Title 2' },
        { id: 21, img: '../Img3.jpg', title: 'Title 3' },
        { id: 22, img: '../Img1.jpg', title: 'Title 1' },
        { id: 23, img: '../Img2.jpg', title: 'Title 2' },
        { id: 24, img: '../Img3.jpg', title: 'Title 3' },
        { id: 25, img: '../Img1.jpg', title: 'Title 1' },
        { id: 26, img: '../Img2.jpg', title: 'Title 2' },
        { id: 27, img: '../Img3.jpg', title: 'Title 3' },
        { id: 28, img: '../Img1.jpg', title: 'Title 1' },
        { id: 29, img: '../Img2.jpg', title: 'Title 2' },
        { id: 30, img: '../Img3.jpg', title: 'Title 3' },
        { id: 31, img: '../Img1.jpg', title: 'Title 1' },
        { id: 32, img: '../Img2.jpg', title: 'Title 2' },
        { id: 33, img: '../Img3.jpg', title: 'Title 3' },
        { id: 34, img: '../Img1.jpg', title: 'Title 1' },
        { id: 35, img: '../Img2.jpg', title: 'Title 2' },
        { id: 36, img: '../Img3.jpg', title: 'Title 3' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;

    // Calculate current items based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = itemData.slice(indexOfFirstItem, indexOfLastItem);

    // Handle pagination change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Navbar />
            <div className="gallery-container">
                <h1 className='gallery-title'>Gallery</h1>
                <div className='gallery-grid'>
                    <Galleryimg itemData={currentItems} />
                </div>
                <div className="pagination-container" style={{ textAlign: 'center', marginBottom: '40px', marginTop: '-1vw'}}>
                    <Pagination
                        postsPerPage={itemsPerPage}
                        totalPosts={itemData.length}
                        paginate={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Gallery;
