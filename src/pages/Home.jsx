import React from 'react';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Slogan from '../components/Slogan';
import Hnews from '../components/Hnews';
import NewsCard from '../components/NewsCard';
import Hcourse from '../components/Hcourse';
import Partners from '../components/Partners';
import Footer from '../components/Footer';

const Home = () => {
  const partnerLogos = [
    {icon: "./IFLS-Logo.png"},
    {icon: "./Vattanac-Logo.png"},
    {icon: "./IFLS-Logo.png"},
    {icon: "./IFLS-Logo.png"},
    {icon: "./Vattanac-Logo.png"},
    {icon: "./IFLS-Logo.png"},
    {icon: "./IFLS-Logo.png"},
    {icon: "./Vattanac-Logo.png"},
    {icon: "./IFLS-Logo.png"},
    {icon: "./IFLS-Logo.png"},
    {icon: "./Vattanac-Logo.png"},
    {icon: "./IFLS-Logo.png"},
  ];
  const cardData = [
    { title: "Course 1", image: "./Img1.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation", link: "/course-details1" },
    { title: "Course 2", image: "./Img2.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation", link: "/course-details2" },
    { title: "Course 3", image: "./Img3.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation", link: "/course-details3" },
  ];
    const slides = [
        { url: "http://localhost:3000/Img1.jpg", title: "NA" },
        { url: "http://localhost:3000/Img2.jpg", title: "NA" },
        { url: "http://localhost:3000/Img3.jpg", title: "NA" },
        { url: "http://localhost:3000/Img4.jpg", title: "NA" },
        { url: "http://localhost:3000/Img5.jpg", title: "NA" },
      ];
      const containerStyles = {
        height: "960px",
        margin: "0 auto",
       };
       
       return (
        <div>
            <Navbar />
            <div style={containerStyles}>
                <Slider slides={slides} />
            </div>
            <Slogan/>
            <Hnews title="News and Update">
              <NewsCard title="News 1" imgUrl="./Img1.jpg" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" link="/link1"/>
              <NewsCard title="News 2" imgUrl="./Img2.jpg" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" link="/link2"/>
              <NewsCard title="News 3" imgUrl="./Img3.jpg" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" link="/link3"/>
              <NewsCard title="News 4" imgUrl="./Img2.jpg" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" link="/link4"/>
            </Hnews>
            <Hcourse courses={cardData} />
            <Partners images={partnerLogos} />
            <Footer />
        </div>
      );
};

export default Home;
