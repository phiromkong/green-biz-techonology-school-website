import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './css/Team.css';

const Team = ({ teamMembers }) => {
    const options = {
        items: 1,
        loop: teamMembers.length > 1,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 2700,
        autoplayHoverPause: true,
        dots: false,
    };

    return (
        <section>
            <div className="container">
                <div className="demo">
                    <OwlCarousel className="owl-theme" {...options}>
                        {teamMembers.map((member, index) => (
                            <div key={index} className="item">
                                {/* Render each team member's information */}
                                <div className="row" style={{backgroundColor: 'white', boxShadow:'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset', display: 'flex', justifyContent: 'left', alignContent: 'left'}}>
                                    <div className="team_img">
                                        <img src={member.image} className="slide_image buttom_footer btn_footer" alt={member.name} style={{ padding: '0px !important' }} />
                                    </div>
                                    <div className="col-md-9 col-12 col-sm-12">
                                        <div className="col-md-12">
                                            <h3 className="font_bold team_title" style={{ marginBottom: '0px !important', color: '#006C44', fontFamily: "Kantumruy Pro", fontWeight: 'bold'}}>{member.name}</h3>
                                            <h5 className="font_bold team_sub_title" style={{color: '#006C44', fontFamily: "Kantumruy Pro"}}>{member.role}</h5>
                                        </div>
                                        <div className="blockquote blockquote-fancy quote_center_team">
                                            <p style={{color: 'black', fontFamily: "Kantumruy Pro"}}>{member.description}</p>
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
