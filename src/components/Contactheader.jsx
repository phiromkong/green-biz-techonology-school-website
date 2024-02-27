import React from 'react';
import './css/Contactheader.css';
import { useTranslation } from 'react-i18next';

const Contactheader = () => {
    const {t} = useTranslation();
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
                    <h1>{t('contactDetail')}</h1>
                </div>
                <div className="features">
                    <p className='feature'>{t('village')}&nbsp; <br /> {t('sangkat')}&nbsp; <br /> {t('municipality')}&nbsp; <br /> {t('province')}</p>
                </div>
                <div className='general-inquiry'>
                    <h1> {t('generalInquiry')}</h1>
                </div>
                <div className='contact-details'>
                    <p className='contact-detail'>{t('phoneNum')}: (+855) 11 686 681 / (+855) 96 996 67 82&nbsp; <br /> {t('email')}: kimle.keo@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default Contactheader;
