import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Galleryimg from '../components/Galleryimage';
import Footer from '../components/Footer';
import "../components/css/Gallery.css";
import Pagination from '../components/Pagination';

const Gallery = () => {
    const itemData = [
        { id: 1, img: '../Img1.jpg', title: 'Title 1', program: "Computer Fundamental", },
        { id: 2, img: '../Img2.jpg', title: 'Title 2', program: "Computer Fundamental", },
        { id: 3, img: '../Img3.jpg', title: 'Title 3', program: "Computer Fundamental",},
        { id: 4, img: '../Img1.jpg', title: 'Title 1', program: "Computer Fundamental", },
        { id: 5, img: '../Img2.jpg', title: 'Title 2', program: "MS. Office", },
        { id: 6, img: '../Img3.jpg', title: 'Title 3', program: "MS. Office",},
        { id: 7, img: '../Img1.jpg', title: 'Title 1', program: "MS. Office", },
        { id: 8, img: '../Img2.jpg', title: 'Title 2', program: "MS. Office", },
        { id: 9, img: '../Img3.jpg', title: 'Title 3', program: "Graphic Deign",},
        { id: 10, img: '../Img1.jpg', title: 'Title 1', program: "Graphic Deign", },
        { id: 11, img: '../Img2.jpg', title: 'Title 2', program: "Web & App Development", },
        { id: 12, img: '../Img3.jpg', title: 'Title 3', program: "Foreign Language" },
        { id: 13, img: '../Img1.jpg', title: 'Title 1', program: "Web & App Development",},
        { id: 14, img: '../Img2.jpg', title: 'Title 2', program: "Foreign Language" },
        { id: 15, img: '../Img3.jpg', title: 'Title 3', program: "Web & App Development", },
        { id: 16, img: '../Img1.jpg', title: 'Title 1', program: "Graphic Deign", },
        { id: 17, img: '../Img2.jpg', title: 'Title 2', program: "Graphic Deign",},
        { id: 18, img: '../Img3.jpg', title: 'Title 3', program: "Web & App Development", },
        { id: 19, img: '../Img1.jpg', title: 'Title 1', program: "Web & App Development",},
        { id: 20, img: '../Img2.jpg', title: 'Title 2', program: "Graphic Deign", },
        { id: 21, img: '../Img3.jpg', title: 'Title 3', program: "Fundamental Programming", },
        { id: 22, img: '../Img1.jpg', title: 'Title 1', program: "Foreign Language"},
        { id: 23, img: '../Img2.jpg', title: 'Title 2', program: "Computer Fundamental", },
        { id: 24, img: '../Img3.jpg', title: 'Title 3', program: "Fundamental Programming", },
        { id: 25, img: '../Img1.jpg', title: 'Title 1', program: "Fundamental Programming", },
        { id: 26, img: '../Img2.jpg', title: 'Title 2', program: "Computer Fundamental", },
        { id: 27, img: '../Img3.jpg', title: 'Title 3', program: "Computer Fundamental", },
        { id: 28, img: '../Img1.jpg', title: 'Title 1', program: "Foreign Language"},
        { id: 29, img: '../Img2.jpg', title: 'Title 2', program: "Foreign Language"},
        { id: 30, img: '../Img3.jpg', title: 'Title 3', program: "Web & App Development", },
        { id: 31, img: '../Img1.jpg', title: 'Title 1', program: "Foreign Language",},
        { id: 32, img: '../Img2.jpg', title: 'Title 2', program: "Web & App Development", },
        { id: 33, img: '../Img3.jpg', title: 'Title 3', program: "Foreign Language" },
        { id: 34, img: '../Img1.jpg', title: 'Title 1', program: "Web & App Development", },
        { id: 35, img: '../Img2.jpg', title: 'Title 2', program: "Computer Fundamental", },
        { id: 36, img: '../Img3.jpg', title: 'Title 3', program: "Web & App Development", },
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

    const [selectedProgram, setSelectedProgram] = useState(null);

    return (
        <div>
            <Navbar />
            <div className="gallery-container">
            <h1 className='gallery-title' onClick={() => setSelectedProgram(null)}>Gallery</h1>               
             <div className='gallery-grid'>
             <Galleryimg itemData={currentItems} setSelectedProgram={setSelectedProgram} selectedProgram={selectedProgram} />               
             </div>
                <div className="pagination-container">
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Pagination
                        postsPerPage={itemsPerPage}
                        totalPosts={itemData.length}
                        paginate={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>

            <Footer />
        </div>
    );
};

export default Gallery;
