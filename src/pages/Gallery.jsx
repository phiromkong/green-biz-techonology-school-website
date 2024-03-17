import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you have this configured correctly
import Navbar from '../components/Navbar';
import Galleryimg from '../components/Galleryimage';
import Footer from '../components/Footer';
import "../components/css/Gallery.css";
import Pagination from '../components/Pagination';

const Gallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const itemsPerPage = 24;
    const { t } = useTranslation(); // Use the useTranslation hook

    useEffect(() => {
        const fetchGalleryItems = async () => {
            const galleryCollection = collection(db, "gallery");
            const gallerySnapshot = await getDocs(galleryCollection);
            const galleryList = gallerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setGalleryItems(galleryList);
        };

        fetchGalleryItems();
    }, []);

    // Calculate current items based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = galleryItems.slice(indexOfFirstItem, indexOfLastItem);

    // Handle pagination change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Function to reset the filter
    const resetFilter = () => {
        setSelectedProgram(null);
    };

    return (
        <div>
            <Navbar />
            <div className="gallery-container">
                <div className='gallery-title' onClick={resetFilter}>
                    <h1>{t('gallery')}</h1> {/* Use t function to translate the title */}
                </div>
                <div className='gallery-grid'>
                    <Galleryimg itemData={currentItems} setSelectedProgram={setSelectedProgram} selectedProgram={selectedProgram} />
                </div>
                <div className="pagination-container">
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Pagination
                            postsPerPage={itemsPerPage}
                            totalPosts={galleryItems.length}
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
