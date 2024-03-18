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
import { useTranslation } from 'react-i18next'; // Import useTranslation


const Home = () => {
  const [partnerLogos, setPartnerLogos] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [courses, setCourses] = useState([]); // State for courses
  const [loading, setLoading] = useState(true); // Add a loading state
  const { i18n } = useTranslation(); // Use the useTranslation hook

  useEffect(() => {
    const fetchPartners = async () => {
      const partnersCollection = collection(db, "partners");
      const partnersSnapshot = await getDocs(partnersCollection);
      const partnersList = partnersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setPartnerLogos(partnersList);
      setLoading(false); 
    };

    const fetchNews = async () => {
      const newsCollection = collection(db, "news");
      const q = query(newsCollection, orderBy("date", "desc"), limit(3));
      const newsSnapshot = await getDocs(q);
      const newsList = newsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setNewsData(newsList);
      setLoading(false); 
    };

    const fetchCourses = async () => {
      const coursesCollection = collection(db, "courses");
      const q = query(coursesCollection, orderBy("enTitle", "asc"), limit(3)); // Assuming you want to order by title
      const coursesSnapshot = await getDocs(q);
      const coursesList = coursesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCourses(coursesList);
    };

    fetchPartners();
    fetchNews();
    fetchCourses();
 }, []);
  

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
  
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
 }
  return (
    <div>
      <Navbar />
      <div style={containerStyles}>
        <Slider slides={slides} />
      </div>
      <Slogan />
      <Hnews title="News and Update" limit={4}>
        {newsData.map((news, index) => {
          console.log(news);
          return (
              <NewsCard
                key={index}
                title={i18n.language === 'Khmer' ? news.khTitle : news.enTitle}
                imgUrl={news.thumbnailImage}
                description={i18n.language === 'Khmer' ? news.khDescription : news.enDescription}
                id={news.id}
              />
          );
          })}
      </Hnews>
      <Hcourse courses={courses} />
      <Partners images={partnerLogos} />
      <Footer />
    </div>
  );
};

export default Home;
