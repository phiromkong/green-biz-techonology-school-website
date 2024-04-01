import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Newspost from '../components/Newspost';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firestore instance
import MetaHeader from '../components/MetaHeader'; // Import the MetaHeader component
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Paper, InputBase, IconButton, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const NewsPage = () => {
    const { t, i18n } = useTranslation();
    const postsPerPage = 5; // Set the number of posts per page
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]); // Initialize posts as an empty array
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "news"));
            const newPosts = querySnapshot.docs.map(doc => {
                const data = doc.data();
                // Convert Firestore Timestamp to JavaScript Date object
                const postDate = data.date ? data.date.toDate() : null;
                // Format the date as a string
                const formattedDate = postDate ? postDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
                return { ...data, id: doc.id, date: formattedDate };
            });
            setPosts(newPosts);
            setLoading(false);
        };

        fetchPosts();
    }, [i18n.language]); // Depend on the i18n.language to refetch if the language changes

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const filteredPosts = currentPosts.filter(post =>
        post[i18n.language === 'en' ? 'enTitle' : 'khTitle'].toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Backdrop
                sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={() => { }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <div>
            <MetaHeader
                title="GBT School News - Stay Updated"
                description="Discover the latest news and updates from GBT School. Stay informed about our courses, partnerships, and community events."
                keywords="news, updates, GBT School, education, courses, partnerships"
                ogTitle="GBT School News - Stay Updated"
                ogDescription="Discover the latest news and updates from GBT School. Stay informed about our courses, partnerships, and community events."
                ogImage="https://www.gbtschool.com/logo.png"
                ogUrl="https://www.gbtschool.org/news"
            />
            <Navbar />
            <section id="page-content" className="sidebar-right">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="content col-lg-10 blog_header">
                            <div className="post-container">
                                <div className="page-title mb-5">
                                    <Stack direction="row" spacing={1} justifyContent="space-between">
                                        <h2 className="home_title" style={{ color: 'black' }}>{t('recentPost')}</h2>
                                        <Paper
                                            component="form"
                                            sx={{ p: "2px 4px", display: "flex", alignItems: "center", justifyContent: 'flex-end', width: 400, height: 50 }}
                                        >
                                            <InputBase
                                                sx={{ ml: 1, flex: 1, fontFamily: "Kantumruy Pro" }}
                                                placeholder={t('newSearch')}
                                                inputProps={{ "aria-label": "search news posts" }}
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                                                <SearchIcon />
                                            </IconButton>
                                        </Paper>
                                    </Stack>
                                </div>
                                {filteredPosts.length === 0 ? (
                                    <div className="no-results">No news found.</div>
                                ) : (
                                    filteredPosts.map((post) => (
                                        <Newspost
                                            key={post.id}
                                            id={post.id}
                                            title={post[i18n.language === 'en' ? 'enTitle' : 'khTitle']}
                                            content={post[i18n.language === 'en' ? 'enContent' : 'khContent']}
                                            description={post[i18n.language === 'en' ? 'enDescription' : 'khDescription']}
                                            date={post.date}
                                            thumbnailImage={post.thumbnailImage}
                                        />
                                    ))
                                )}
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
