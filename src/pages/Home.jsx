import React from 'react';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Slogan from '../components/Slogan';
import Hnews from '../components/Hnews';
import Program from '../components/Program';
import Hcourse from '../components/Hcourse';
import Partners from '../components/Partners';

const Home = () => {
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
              <Program title="Program 1" imgUrl="./Img1.jpg" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" link="/link1"/>
              <Program title="Program 2" imgUrl="./Img2.jpg" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" link="/link2"/>
              <Program title="Program 3" imgUrl="./Img3.jpg" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" link="/link3"/>
              <Program title="Program 4" imgUrl="./Img2.jpg" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" link="/link4"/>
            </Hnews>
            <Hcourse courses={cardData} />
        </div>
      );
};

export default Home;
