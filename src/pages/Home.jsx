import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase'; // Ensure you have this configured correctly
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Slogan from '../components/Slogan';
import Hnews from '../components/Hnews';
import NewsCard from '../components/NewsCard';
import Hcourse from '../components/Hcourse';
import Partners from '../components/Partners';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import MetaHeader from '../components/MetaHeader';


const Home = () => {
  const [partnerLogos, setPartnerLogos] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [courses, setCourses] = useState([]); // State for courses
  const [loading, setLoading] = useState(true); // Add a loading state
  const [sliderImages, setSliderImages] = useState([]);
  const { i18n } = useTranslation(); // Use the useTranslation hook

  useEffect(() => {
    const fetchPartners = async () => {
      const partnersCollection = collection(db, "partners");
      const partnersSnapshot = await getDocs(partnersCollection);
      const partnersList = partnersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setPartnerLogos(partnersList);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    const fetchNews = async () => {
      const newsCollection = collection(db, "news");
      const q = query(newsCollection, orderBy("date", "desc"), limit(3));
      const newsSnapshot = await getDocs(q);
      const newsList = newsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setNewsData(newsList);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    const fetchCourses = async () => {
      const coursesCollection = collection(db, "courses");
      const q = query(coursesCollection, orderBy("enTitle", "asc"), limit(3)); // Assuming you want to order by title
      const coursesSnapshot = await getDocs(q);
      const coursesList = coursesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCourses(coursesList);
    };

    const fetchSliderImages = async () => {
      const storage = getStorage();
      const imagesRef = ref(storage, 'gallery/slider');
      const listResult = await listAll(imagesRef);
      const imagesListPromises = listResult.items.map(async (item) => {
        const imageURL = await getDownloadURL(item);
        return { url: imageURL, title: "NA" }; // Assuming you don't have titles for these images
      });
      const imagesList = await Promise.all(imagesListPromises);
      setSliderImages(imagesList);
   };

    fetchPartners();
    fetchNews();
    fetchCourses();
    fetchSliderImages();
 }, []);
  

  const containerStyles = {
    height: "960px",
    margin: "0 auto",
  };
  
  if (loading) {
    return <div>{loading && (
      <Backdrop
        sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )}</div>; 
 }
  return (
    <div>
      <MetaHeader
        title="Green Biz Technology School - Your Education Partner"
        description="Green Biz Technology School, or GBT School, offers a wide range of courses and partnerships to enhance your learning experience."
        keywords="education, courses, partnerships, GBT School, Green Biz Technology, computer, BMC, Banteay Meanchey"
        ogTitle="Green Biz Technology School, or GBT School - Your Education Partner"
        ogDescription="GBT School offers a wide range of courses and partnerships to enhance your learning experience."
        ogImage="https://www.gbtschool.com/logo.png"
        ogUrl="https://www.gbtschool.org"
      />
      <Navbar />
      <div style={containerStyles}>
      <Slider slides={sliderImages} />
      </div>
      <Slogan />
      <Hnews title="News and Update" limit={4}>
        {newsData.map((news, index) => (
          <NewsCard
            key={index}
            title={i18n.language === 'kh' ? news.khTitle : news.enTitle}
            imgUrl={news.thumbnailImage}
            description={i18n.language === 'kh' ? news.khDescription : news.enDescription}
            id={news.id}
          />
        ))}
      </Hnews>
      <Hcourse courses={courses} />
      <Partners images={partnerLogos} />
      <Footer />
    </div>
  );
};

export default Home;
