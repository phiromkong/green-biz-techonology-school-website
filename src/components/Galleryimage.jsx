import React from 'react';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css'; // Import lightgallery CSS
import 'lightgallery/css/lg-zoom.css'; // Import lightgallery zoom CSS
import 'lightgallery/css/lg-thumbnail.css'; // Import lightgallery thumbnail CSS
import lgThumbnail from 'lightgallery/plugins/thumbnail'; // Import lightgallery thumbnail plugin
import lgZoom from 'lightgallery/plugins/zoom'; // Import lightgallery zoom plugin
import CourseList from './Courselist'; // import the CourseList component
import Grid from '@mui/material/Grid';
import './css/Galleryimage.css';

const Galleryimage = ({ itemData, setSelectedProgram, selectedProgram }) => {
    const handleCourseSelect = (program) => {
        setSelectedProgram(program);
    }

    const filteredCourses = selectedProgram ? itemData.filter((course) => course.program === selectedProgram) : itemData;

    const handleLightGalleryEvents = (event) => {
        const parentDiv = document.querySelector('.parent-div');
        if (parentDiv) {
            if (event === 'onAfterOpen') {
                console.log('onAfterOpen');
                parentDiv.style.zIndex = '100'; 
            } else if (event === 'onBeforeClose') {
                console.log('onAfterClose');
                parentDiv.style.zIndex = '10000'; 
            }
        }
    };

    return (
        <div>
            <Grid container spacing={10}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className="course-list">
                        <CourseList courses={itemData} onCourseSelect={handleCourseSelect} activeProgram={selectedProgram} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={8} lg={9} className="gallery-grid-item">
                    <LightGallery plugins={[lgThumbnail, lgZoom]} onAfterOpen={() => handleLightGalleryEvents('onAfterOpen')} onBeforeClose={() => handleLightGalleryEvents('onBeforeClose')}>
                        {filteredCourses.map((item) => (
                            <a href={item.img} key={item.id}>
                                <img className="gallery-image" alt={item.title} src={item.img} /> 
                            </a>
                        ))}
                    </LightGallery>
                </Grid>
            </Grid>
        </div>
    );
};

export default Galleryimage;