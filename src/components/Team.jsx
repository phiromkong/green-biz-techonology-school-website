import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const TeamMemberCard = ({ member }) => {
 const theme = useTheme();
 const { i18n } = useTranslation(); // Use the useTranslation hook

 return (
    <Card sx={{ display: 'flex', marginBottom: "90px" }}>
      <Box sx={{  display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
        <CardContent sx={{ flex: '1 0 auto', maxWidth: '400px' }}>
          <Typography component="div" variant="h5" sx={{fontFamily: 'Kantumruy Pro'}}>
            {i18n.language === 'kh' ? member.khFirstName : member.enFirstName} {i18n.language === 'kh' ? member.khLastName : member.enLastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{fontFamily: 'Kantumruy Pro'}}>
            {i18n.language === 'kh' ? member.khPosition : member.enPosition}
          </Typography>
          <Typography paragraph sx={{ marginTop: '3rem', fontFamily: 'Kantumruy Pro' }}>
            {i18n.language === 'kh' ? member.khQuote : member.enQuote}
          </Typography>
        </CardContent>
        
      </Box>
      <CardMedia
        component="img"
        sx={{ maxWidth: "30%" }}
        image={member.image}
        alt={`${member.enFirstName} ${member.enLastName}`}
      />
    </Card>
 );
};

const Team = ({ teamMembers }) => {

 const options = {
    items: 1,
    loop: teamMembers.length > 1,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 1700,
    autoplayHoverPause: true,
    dots: false,
 };

 return (
    <section>
     
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <OwlCarousel
            className="owl-theme"
            {...options}
            style={{ width: '70%' }} // Set the width to 70%
          >
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </OwlCarousel>
        </div>
     
    </section>
 );
};

export default Team;
