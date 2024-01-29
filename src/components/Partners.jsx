import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Partners.css';

const Partners = ({ images }) => {
    const owlOptions = {
        loop: false,
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
      <section className="bg_gray text-center">
        <div className="partner-container">
          <h2 className="font_bold text-uppercase partner_title">Our Partners</h2>
          <OwlCarousel className="owl-theme" {...owlOptions}>
            {images.map((partner, index) => (
              <div key={index} className="item">
                <img src={partner.icon} alt={`Partner ${index + 1}`} />
              </div>
            ))}
          </OwlCarousel>
        </div>
      </section>
    );
  };
  
  export default Partners;
  
