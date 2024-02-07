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
    { icon: "./IFLS-Logo.png" },
    { icon: "./Vattanac-Logo.png" },
    { icon: "./IFLS-Logo.png" },
    { icon: "./IFLS-Logo.png" },
    { icon: "./Vattanac-Logo.png" },
    { icon: "./IFLS-Logo.png" },
    { icon: "./IFLS-Logo.png" },
    { icon: "./Vattanac-Logo.png" },
    { icon: "./IFLS-Logo.png" },
    { icon: "./IFLS-Logo.png" },
    { icon: "./Vattanac-Logo.png" },
    { icon: "./IFLS-Logo.png" },
  ];

  const newsData = [
    {
      id: 1,
      title: 'Healthy living choices!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur....',
      date: '16 January 2024',
      thumbnailImage: "../Img2.jpg",
      newsImages: ["../Img2.jpg", "../Img3.jpg", "../Img2.jpg", "../Img3.jpg"],
    },
    {
      id: 2,
      title: 'Another post title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur....',
      date: '17 January 2024',
      thumbnailImage: "../Img4.jpg",
      newsImages: ["../Img4.jpg", "../Img5.jpg"],
    },
    {
      id: 3,
      title: 'Healthy living choices!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur....',
      date: '16 January 2024',
      thumbnailImage: "../Img2.jpg",
      newsImages: ["../Img2.jpg", "../Img3.jpg"],
    },
    {
      id: 4,
      title: 'Another post title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur....',
      date: '17 January 2024',
      thumbnailImage: "../Img4.jpg",
      newsImages: ["../Img4.jpg", "../Img5.jpg"],
    },
    {
      id: 5,
      title: 'Healthy living choices!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur....',
      date: '16 January 2024',
      thumbnailImage: "../Img2.jpg",
      newsImages: ["../Img2.jpg", "../Img3.jpg"],
    },
    {
      id: 6,
      title: 'Another post title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur....',
      date: '17 January 2024',  
      thumbnailImage: "../Img4.jpg",
      newsImages: ["../Img4.jpg", "../Img5.jpg"],
    },
  ];

  const cardData = [
    { id: 1, title: "Course 1", image: "../Img1.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" },
    { id: 2, title: "Course 2", image: "../Img2.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"},
    { id: 3, title: "Course 3", image: "../Img3.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"},
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
      <Slogan />
      <Hnews title="News and Update" limit={4}>
        {newsData.map((news, index) => (
          <NewsCard
            key={index}
            title={news.title}
            imgUrl={news.thumbnailImage}
            description={news.description}
            id={news.id}
          />
        ))}
      </Hnews>
      <Hcourse courses={cardData} />
      <Partners images={partnerLogos} />
      <Footer />
    </div>
  );
};

export default Home;
