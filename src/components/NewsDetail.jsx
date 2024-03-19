import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./css/NewsDetail.css"
import Navbar from './Navbar';
import Footer from './Footer';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const NewsDetail = () => {
 const { id } = useParams();
 const navigate = useNavigate();
 const [post, setPost] = useState(null);
 const { i18n } = useTranslation();

 useEffect(() => {
 const fetchPost = async () => {
    const postRef = doc(db, "news", id);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const postData = postDoc.data();
      setPost({ ...postData, id: postDoc.id, newsImages: postData.newsImages || [] });
    } else {
      console.log("No such document!");
    }
 };

 fetchPost();
}, [id]);

 useEffect(() => {
    window.scrollTo(0, 0);
 }, []);

 const calculateItemsToDisplay = () => {
 const windowWidth = window.innerWidth;
 if (windowWidth < 600) {
    return 1;
 } else if (windowWidth < 1000) {
    return 3;
 } else {
    return 5;
 }
 };

 const itemsToDisplay = calculateItemsToDisplay();
 const loop = post && post.newsImages.length > itemsToDisplay;
 const owlOptions = {
    loop: loop,
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
 };

 if (!post) {
    return <p>Post not found</p>;
 }

 const handleBackClick = () => {
    navigate(-1);
 };

 const language = i18n.language;
 const titleKey = language === 'English' ? 'enTitle' : 'khTitle';
 const contentKey = language === 'English' ? 'enContent' : 'khContent';

 return (
    <div>
      <Navbar />
      <div className='news-article'>
        <div className='news-title'>{post[titleKey]}</div>
        <p>Published on {post.date ? post.date.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</p>
        <img src={post.thumbnailImage} alt={post[titleKey]} />
        <p>{post[contentKey]}</p>
        <OwlCarousel className="owl-theme" {...owlOptions}>
          {post.newsImages.map((image, index) => (
              <div key={index} className="item image-wrapper">
                <img src={image} alt={`News ${index + 1}`} className="carousel-image" />
              </div>
            ))}
          </OwlCarousel>
        <Button className='back-btn' style={{textTransform: 'none', width: '15%', marginTop: '20px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', borderRadius: '10px'}} onClick={handleBackClick}>Back</Button>
      </div>
      <Footer />
    </div>
 );
};

export default NewsDetail;
