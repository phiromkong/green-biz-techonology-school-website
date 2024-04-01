import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import Newspost from '../components/Newspost';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { db } from '../firebase';
import '../components/css/AdminNews.css';


const options = ['Edit', 'Delete']; // Adjusted options for "Edit" and "Delete"
const ITEM_HEIGHT = 48;
const defaultTheme = createTheme();

const AdminNews = () => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletePostId, setDeletePostId] = useState(null);
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [posts, setPosts] = useState([]); // Initialize posts as an empty array
    const openMore = Boolean(anchorEl);
    const navigate = useNavigate(); // Use the useHistory hook
    const [searchTerm, setSearchTerm] = useState("");



    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "news"));
            let newPosts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    
            // If there's a search term, filter posts by title
            if (searchTerm) {
                newPosts = newPosts.filter(post =>
                    post.enTitle.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
    
            // Sort the posts array by date in descending order
            newPosts.sort((a, b) => {
                return b.date.toMillis() - a.date.toMillis();
            });
    
            setPosts(newPosts);
        };
    
        fetchPosts();
    }, [searchTerm]); // Add searchTerm to the dependency array
    

    const handleClick = (event, postId) => {
        setAnchorEl(event.currentTarget);
        setDeletePostId(postId);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Function to delete a post by its ID
    const deletePost = async (postId) => { 
        try {
            // Find the post to delete in the posts state
            const postToDelete = posts.find(post => post.id === postId);
            if (postToDelete && postToDelete.thumbnailImage) {
                // Create a reference to the file in Firebase Storage
                const imageRef = ref(getStorage(), postToDelete.thumbnailImage);
    
                // Delete the file from Firebase Storage
                await deleteObject(imageRef).then(() => {
                    console.log("News post image deleted from Firebase Storage");
                }).catch((error) => {
                    console.error("Error deleting news post image from Firebase Storage:", error);
                });
            }
    
            // Delete the document from Firestore
            await deleteDoc(doc(db, "news", postId));
            console.log('Deleted post with ID:', postId);
    
            // Filter the posts array to remove the deleted post from the UI using the post index
            const updatedPosts = posts.filter((post) => post.id !== postId);
            setPosts(updatedPosts);
    
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error("Error deleting document: ", error);
            // Handle error
        }
    };
        
    
    const handleDeleteConfirm = async () => {
        if (deletePostId) {
            await deletePost(deletePostId);
        }
    };    
    
    const handleDeleteCancel = () => {
        setDeletePostId(null);
        setDeleteDialogOpen(false);
    };   
    const handleEdit = (postId) => {
        navigate(`/dashboard/news/edit/${postId}`); // Navigate to the edit page with the post ID
    }; 
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Dashboardnav open={open} toggleDrawer={toggleDrawer} />
                <Dashboardsidebar open={open} toggleDrawer={toggleDrawer} />
                <Container>
                    <div className="row justify-content-center">
                        <div className="content col-lg-10 blog_header">
                            <Stack direction="row" spacing={1}>
                                <Button component={Link} to="/dashboard/news/add" variant="contained" startIcon={<AddIcon />}>
                                    New Post
                                </Button>
                                <Paper
                                    component="form"
                                    sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
                                >
                                    <InputBase
                                         sx={{ ml: 3, flex: 1 }}
                                        placeholder="Search News Posts"
                                        inputProps={{ "aria-label": "search news posts" }}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </Stack>
                            <div className="post-container">
                                <div className="page-title mb-5"></div>
                                {posts.map((post) => (
                                    <div style={{ position: 'relative' }} key={post.id}>
                                        <Newspost
                                            id={post.id} 
                                            title={post.enTitle}
                                            content={post.enContent}
                                            description={post.enDescription}
                                            date={post.date ? post.date.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                                            thumbnailImage={post.thumbnailImage} 
                                        />
                                        <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls={openMore ? 'long-menu' : undefined}
                                            aria-expanded={openMore ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={(event) => handleClick(event, post.id)}
                                            sx={{
                                                position: 'absolute',
                                                top: '20px', // Adjust as needed to align with the news description
                                                right: '10px', // Adjust as needed to position from the right edge
                                            }}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'long-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={openMore}
                                            onClose={handleClose}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: ITEM_HEIGHT * 4.5,
                                                    width: '20ch',
                                                },
                                            }}
                                        >
                                            {options.map((option) => (
                                                <MenuItem
                                                    key={option}
                                                    onClick={() => {
                                                        handleClose();
                                                        if (option === 'Delete') {
                                                            setDeleteDialogOpen(true);
                                                        }else if(option === 'Edit'){
                                                             handleEdit(deletePostId);
                                                        }
                                                    }}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Dialog
                        open={deleteDialogOpen}
                        onClose={handleDeleteCancel}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this news post?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteCancel} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default AdminNews;
