import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Button from '@material-ui/core/Button';
import "./css/NewsDetail.css"
import Navbar from './Navbar';
import Footer from './Footer';

const NewsDetail = ({ newsData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = newsData.find((post) => post.id === Number(id));

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
          <div className='news-title'>{post.title}</div>  
          <p>Published on {post.date}</p>
          <img src={post.thumbnailImage} alt={post.title} />
          <p>{post.content}</p>
          <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
            {post.newsImages.map((image, index) => (
              <ImageListItem style={{paddingLeft: '1.5px'}} key={index}>
                <img
                  srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${image}?w=164&h=164&fit=crop&auto=format`}
                  alt={`${post.title} ${index + 1}`}
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