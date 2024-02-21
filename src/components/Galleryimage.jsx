import React, { useState } from 'react';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css'; // Import lightgallery CSS
import 'lightgallery/css/lg-zoom.css'; // Import lightgallery zoom CSS
import 'lightgallery/css/lg-thumbnail.css'; // Import lightgallery thumbnail CSS
import lgThumbnail from 'lightgallery/plugins/thumbnail'; // Import lightgallery thumbnail plugin
import lgZoom from 'lightgallery/plugins/zoom'; // Import lightgallery zoom plugin
import Courselist from './Courselist';

const Galleryimage = ({ itemData }) => {
    const [selectedProgram, setSelectedProgram] = useState(null);

    const handleCourseSelect = (program) => {
      setSelectedProgram(program);
    }

    const filteredCourses = selectedProgram ? itemData.filter((course) => course.program === selectedProgram) : itemData;

    return (
        <div>
            <Courselist courses={itemData} onCourseSelect={handleCourseSelect} activeProgram={selectedProgram} />
            <LightGallery plugins={[lgThumbnail, lgZoom]}>
                {filteredCourses.map((item) => (
                    <a href={item.img} key={item.id}>
                        <img alt={item.title} src={item.img} />
                    </a>
                ))}
            </LightGallery>
        </div>
    );
};

export default Galleryimage;
