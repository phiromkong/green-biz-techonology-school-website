import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './css/Team.css'; // Ensure this points to the correct CSS file with namespaced classes
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Team = ({ teamMembers }) => {
    const options = {
        items: 1,
        loop: teamMembers.length > 1,
        margin: 10,
        autoplay: false,
        autoplayTimeout: 2700,
        autoplayHoverPause: true,
        dots: false,
    };
    const { i18n } = useTranslation(); // Use the useTranslation hook

    return (
        <section>
            <div className="container">
                <div className="demo">
                    <OwlCarousel className="team-owl-carousel owl-theme" {...options}>
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-item">
                                <div className="team-row" style={{backgroundColor: 'white', boxShadow:'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset', display: 'flex', justifyContent: 'center', alignContent: 'center', }}>
                                    <div className="team-team_img">
                                        <img src={member.image} className="slide_image buttom_footer btn_footer" alt={member.name} style={{ padding: '0px !important'}} />
                                    </div>
                                    <div className="team-col-md-9 team-col-12 team-col-sm-12">
                                        <div className="team-col-md-12">
                                            <h3 className="font_bold team_title" style={{ marginBottom: '0px !important', color: '#006C44', fontFamily: "Kantumruy Pro", fontWeight: 'bold'}}>
                                              {i18n.language === 'Khmer' ? member.khFirstName : member.enFirstName} {i18n.language === 'Khmer' ? member.khLastName : member.enLastName}
                                            </h3>
                                            <h5 className="font_bold team_sub_title" style={{color: '#006C44', fontFamily: "Kantumruy Pro"}}>
                                              {i18n.language === 'Khmer' ? member.khPosition : member.enPosition}
                                            </h5>
                                        </div>
                                        <div className="blockquote blockquote-fancy quote_center_team">
                                            <p style={{color: 'black', fontFamily: "Kantumruy Pro"}}>
                                              {i18n.language === 'Khmer' ? member.khQuote : member.enQuote}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                </div>
            </div>
        </section>
    );
};

export default Team;
