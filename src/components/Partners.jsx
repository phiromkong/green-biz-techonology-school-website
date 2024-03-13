import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './css/Partners.css';
import { useTranslation } from 'react-i18next';

const Partners = ({ images }) => {
  const {t} = useTranslation();
    const owlOptions = {
        loop: images.length > 4,
        margin: 10,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 5,
            },
        },
    };
  
    return (
      <div className="bg_gray text-center">
        <div className="partner-container">
          <h2 className="font_bold text-uppercase partner_title">{t('ourPartners')}</h2>
          <OwlCarousel className="owl-theme" {...owlOptions}>
            {images.map((partner, index) => (
              <div key={index} className="item">
                <img src={partner.image} alt={`Partner ${index + 1}`} style={{width: '100%'}} />
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    );
  };
  
  export default Partners;
  
