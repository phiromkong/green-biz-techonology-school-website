import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Newspost from '../components/Newspost';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import "../components/css/NewsPage.css"
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firestore instance

const NewsPage = () => {
const { t, i18n } = useTranslation();
 const postsPerPage = 5; // Set the number of posts per page
 const [currentPage, setCurrentPage] = useState(1);
 const [posts, setPosts] = useState([]); // Initialize posts as an empty array

 useEffect(() => {
  const fetchPosts = async () => {
     const querySnapshot = await getDocs(collection(db, "news"));
     const newPosts = querySnapshot.docs.map(doc => {
       const data = doc.data();
       // Convert Firestore Timestamp to JavaScript Date object
       const postDate = data.date ? data.date.toDate() : null;
       // Format the date as a string
       const formattedDate = postDate ? postDate.toLocaleDateString(i18n.language, { month: 'long', day: 'numeric', year: 'numeric' }) : '';
       return { ...data, id: doc.id, date: formattedDate };
     });
     setPosts(newPosts);
  };
 
  fetchPosts();
 }, [i18n.language]); // Depend on the i18n.language to refetch if the language changes
 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  return (
     <div>
       <Navbar />
       <section id="page-content" className="sidebar-right">
         <div className="container">
           <div className="row justify-content-center">
             <div className="content col-lg-10 blog_header">
               <div className="post-container">
                 <div className="page-title mb-5">
                  <h2 className="home_title" style={{color: 'black'}}>{t('recentPost')}</h2>
                 </div>
                 {currentPosts.map((post) => (
                  <Newspost
                     key={post.id}
                     id={post.id} 
                     title={post[i18n.language === 'English' ? 'enTitle' : 'khTitle']}
                     content={post[i18n.language === 'English' ? 'enContent' : 'khContent']}
                     description={post[i18n.language === 'English' ? 'enDescription' : 'khDescription']}
                     date={post.date}
                     thumbnailImage={post.thumbnailImage} 
                  />
                 ))}
               </div>
               <div className="text-center mt-4">
                 <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={posts.length}
                  paginate={paginate}
                  currentPage={currentPage}
                 />
               </div>
             </div>
           </div>
         </div>
       </section>
       <Footer />
     </div>
  );
 };
 
 export default NewsPage;
