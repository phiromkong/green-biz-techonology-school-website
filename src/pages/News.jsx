import React from 'react';
import Navbar from '../components/Navbar';
import Newspost from '../components/Newspost';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import "../components/css/NewsPage.css"

const NewsPage = ({ newsData }) => {
  // Static data for demonstration (replace it with your actual data)
  const staticPosts = [
    {
      id: 1,
      title: 'Healthy living choices!',
      content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..".."',
      date: '16 January 2024',
      thumbnailImage: "./Img2.jpg",
      newsImages: ["./Img2.jpg", "./Img3.jpg"],
    },
    {
      id: 2,
      title: 'Another post title',
      content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..".."',
      date: '17 January 2024',
      thumbnailImage: "./Img4.jpg",
      newsImages: ["./Img4.jpg", "./Img5.jpg"],
    },
    {
      id: 3,
      title: 'Healthy living choices!',
      content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..".."',
      date: '16 January 2024',
      thumbnailImage: "./Img2.jpg",
      newsImages: ["./Img2.jpg", "./Img3.jpg"],
    },
    {
      id: 4,
      title: 'Another post title',
      content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..".."',
      date: '17 January 2024',
      thumbnailImage: "./Img4.jpg",
      newsImages: ["./Img4.jpg", "./Img5.jpg"],
    },
    {
      id: 5,
      title: 'Healthy living choices!',
      content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..".."',
      date: '16 January 2024',
      thumbnailImage: "./Img2.jpg",
      newsImages: ["./Img2.jpg", "./Img3.jpg"],
    },
    {
      id: 6,
      title: 'Another post title',
      content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..".."',
      date: '17 January 2024',  
      thumbnailImage: "./Img4.jpg",
      newsImages: ["./Img4.jpg", "./Img5.jpg"],
    },
    // Add more static posts as needed
  ];

  const postsPerPage = 5; // Set the number of posts per page
  const [currentPage, setCurrentPage] = React.useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = staticPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <section id="page-content" className="sidebar-right">
        <div className="container">
          <div className="row justify-content-center">
            <div className="content col-lg-10 blog_header">
              <div className="page-title mb-5">
                <h2 className="home_title">Recent Post</h2>
              </div>
              <div className="post-container">
              {currentPosts.map((post) => (
                <Newspost
                    key={post.id}
                    title={post.title}
                    content={post.content}
                    date={post.date}
                    thumbnailImage={post.thumbnailImage} 
                />
              ))}
              </div>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={staticPosts.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewsPage;
