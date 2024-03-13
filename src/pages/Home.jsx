import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you have this configured correctly
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Slogan from '../components/Slogan';
import Hnews from '../components/Hnews';
import NewsCard from '../components/NewsCard';
import Hcourse from '../components/Hcourse';
import Partners from '../components/Partners';
import Footer from '../components/Footer';

const Home = () => {
  const [partnerLogos, setPartnerLogos] = useState([]);
  const [newsData, setNewsData] = useState([]);
 
  useEffect(() => {
    const fetchPartners = async () => {
      const partnersCollection = collection(db, "partners");
      const partnersSnapshot = await getDocs(partnersCollection);
      const partnersList = partnersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setPartnerLogos(partnersList);
    };

    const fetchNews = async () => {
      const newsCollection = collection(db, "news");
      const q = query(newsCollection, orderBy("date", "desc"), limit(3));
      const newsSnapshot = await getDocs(q);
      const newsList = newsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setNewsData(newsList);
    };

    fetchPartners();
    fetchNews();
 }, []);
  
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
            title={news.enTitle}
            imgUrl={news.thumbnailImage}
            description={news.enDescription}
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
