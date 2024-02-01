// NewsDetail.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NewsDetail = ({ match, newsData }) => {
  const { id } = match.params;

  // Find the specific news detail using the id
  const newsDetails = newsData.find((news) => news.id.toString() === id);

  if (!newsDetails) {
    // Handle the case where newsDetails is not found
    return <div>News not found</div>;
  }

  return (
    <div>
      <Navbar />
      <section id="page-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="content col-lg-10">
              <div className="page-title mb-5">
                <h2 className="home_title">{newsDetails.title}</h2>
              </div>
              {/* Image Header */}
              <img src={newsDetails.thumbnailImage} alt={newsDetails.title} />

              {/* News Content */}
              <div className="news-content">
                <p>{newsDetails.content}</p>
              </div>

              {/* Additional News Images */}
              <div className="additional-images">
                {newsDetails.newsImages.map((image, index) => (
                  <img key={index} width="100%" src={image} alt={`${newsDetails.title} ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewsDetail;
