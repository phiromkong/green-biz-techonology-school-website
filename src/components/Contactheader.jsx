import React from 'react';
import './css/Contactheader.css';

const Contactheader = () => {
    return (
        <div className="contact-flexContainer">
            <div className="posterSection">
                <img
                    className="contactPoster"
                    src="./Img2.jpg"
                    alt="Poster"
                />
            </div>
            <div className="contactSection">
                <div className="contact-heading">
                    <h1>Contact Details</h1>
                </div>
                <div className="features">
                    <p className='feature'>Kampong Svay Village,&nbsp; <br /> Sangkat Kampong Svay,&nbsp; <br /> Serei 
                    Saophoan Municipality,&nbsp; <br /> Banteay Meanchey, 010801, Cambodia</p>
                </div>
                <div className='general-inquiry'>
                    <h1> General Inquiry</h1>
                </div>
                <div className='contact-details'>
                    <p className='contact-detail'>Telephone: (+855) 11 686 681 / (+855) 96 996 67 82&nbsp; <br /> Email: kimle.keo@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default Contactheader;
