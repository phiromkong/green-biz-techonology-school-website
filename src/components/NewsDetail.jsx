import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firestore instance
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Button from '@material-ui/core/Button';
import "./css/NewsDetail.css"
import Navbar from './Navbar';
import Footer from './Footer';

const NewsDetail = () => {
 const { id } = useParams();
 const navigate = useNavigate();
 const [post, setPost] = useState(null); // Initialize post as null

 useEffect(() => {
  const fetchPost = async () => {
    const postRef = doc(db, "news", id); // Adjust "news" if your collection name is different
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const postData = postDoc.data();
      // Provide a default value of an empty array for newsImages
      setPost({ ...postData, id: postDoc.id, newsImages: postData.newsImages || [] });
    } else {
      console.log("No such document!");
    }
  };

  fetchPost();
}, [id]); // Depend on the id from useParams to refetch if the URL changes


 useEffect(() => {
    window.scrollTo(0, 0);
 }, []);

 if (!post) {
    return <p>Post not found</p>;
 }

 const handleBackClick = () => {
    navigate(-1);
 };

 return (
    <div>
      <Navbar />
      <div className='news-article'>
        <div className='news-title'>{post.enTitle}</div> {/* Adjust field names as per your Firestore document structure */}
        <p>Published on {post.enDate ? post.enDate.toDate().toLocaleDateString() : ''}</p> {/* Convert Firestore Timestamp to Date */}
        <img src={post.thumbnailImage} alt={post.enTitle} /> {/* Adjust field names as per your Firestore document structure */}
        <p>{post.enContent}</p> {/* Adjust field names as per your Firestore document structure */}
        <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
          {post.newsImages.map((image, index) => (
            <ImageListItem style={{paddingLeft: '1.5px'}} key={index}>
              <img
                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                alt={`${post.enTitle} ${index + 1}`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Button className='back-btn' style={{textTransform: 'none', width: '15%', marginTop: '20px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', borderRadius: '10px'}} onClick={handleBackClick}>Back</Button>
      </div>
      <Footer />
    </div>
 );
};

export default NewsDetail;
