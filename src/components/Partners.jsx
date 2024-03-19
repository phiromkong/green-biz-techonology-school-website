import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './css/Partners.css';
import { useTranslation } from 'react-i18next';

const Partners = ({ images }) => {
  const { t } = useTranslation();

  const calculateItemsToDisplay = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 600) {
      return 1;
    } else if (windowWidth < 1000) {
      return 3;
    } else {
      return 5;
    }
  };

  const itemsToDisplay = calculateItemsToDisplay();
  const loop = images.length > itemsToDisplay;
  const owlOptions = {
    loop: loop,
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
            <div key={index} className="partner-carousel-item">
              <div className='partner-img-wrapper'>
                <img src={partner.image} alt={`Partner ${index + 1}`} className="partner-carousel-image" />
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default Partners;
