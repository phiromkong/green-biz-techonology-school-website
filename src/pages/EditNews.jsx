import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Grid from '@mui/material/Grid';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const defaultTheme = createTheme();

const EditNews = ({ match }) => {
    const { postId } = useParams();
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
    const [open, setOpen] = useState(true);
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [newsImagesURLs, setNewsImagesURLs] = useState([]);
    const [uploading, setUploading] = useState(false); 
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [newsPost, setNewsPost] = useState({
        enTitle: '',
        enContent: '',
        enDescription: '',
        khTitle: '',
        khContent: '',
        khDescription: '',
    });

    const [errors] = useState({
        enTitle: false,
        enContent: false,
        enDescription: false,
        khTitle: false,
        khContent: false,
        khDescription: false,
    });

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        const fetchNewsPost = async () => {
            const postDoc = await getDoc(doc(db, 'news', postId));
            if (postDoc.exists()) {
                const postData = postDoc.data();
                setNewsPost(postData);
                // Assuming 'thumbnailURL' and 'newsImagesURLs' are the field names in Firestore
                setThumbnailURL(postData.thumbnailImage || '');
                setNewsImagesURLs(postData.newsImages || []);
            }
        };
    
        fetchNewsPost();
    }, [postId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewsPost({ ...newsPost, [name]: value });
    };
    
    

    const handleFileUpload = async (files, index, isThumbnail = false) => {
        if (files.length === 0) {
            console.error("No files selected for upload.");
            return;
        }
    
        setUploading(true); // Start loading indicator
    
        try {
            const storageRef = ref(getStorage(), 'news');
            const file = files[0]; // Assuming only one file is selected
            const fileRef = ref(storageRef, file.name);
    
            // Upload file to Firebase Storage
            const snapshot = await uploadBytes(fileRef, file);
    
            // Get download URL of the uploaded file
            const downloadURL = await getDownloadURL(snapshot.ref);
    
            // Update the specific image URL in Firestore document
            if (isThumbnail) {
                setThumbnailURL(downloadURL); // Update local state for thumbnail
                await updateDoc(doc(db, 'news', postId), {
                    thumbnailImage: downloadURL, // Update Firestore document for thumbnail
                });
            } else {
                const updatedNewsImages = [...newsImagesURLs];
                updatedNewsImages[index] = downloadURL;
                setNewsImagesURLs(updatedNewsImages); // Update local state for news images
    
                await updateDoc(doc(db, 'news', postId), {
                    newsImages: updatedNewsImages, // Update Firestore document for news images
                });
            }
    
            console.log("Image updated successfully in Firestore.");
        } catch (error) {
            console.error("Error uploading file or updating Firestore: ", error);
            // Handle error appropriately
        } finally {
            setUploading(false); // Stop loading indicator
        }
    };
    

    const handleDeleteConfirmed = async () => {
        setDeleteConfirmationOpen(false);
        try {
            await handleRemoveImage(imageToDelete);
        } catch (error) {
            console.error("Error removing image: ", error);
            // Handle error
        }
    };
    
    const handleRemoveImage = async (imageUrl) => {
        console.log("Attempting to remove image reference:", imageUrl);
        try {
            // Assuming 'newsImages' is the field name in Firestore where image URLs are stored
            const updatedNewsImages = newsImagesURLs.filter(url => url !== imageUrl);
            setNewsImagesURLs(updatedNewsImages); // Update local state
    
            // Update Firestore document to remove the image URL
            await updateDoc(doc(db, 'news', postId), {
                newsImages: updatedNewsImages, // Update Firestore document
            });
            console.log("Image reference removed from Firestore document.");
        } catch (error) {
            console.error("Error removing image reference:", error);
        }
    };
    
    
    
    const handleDeleteNewsImage = (imageUrl) => {
        setImageToDelete(imageUrl);
        setDeleteConfirmationOpen(true);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, 'news', postId), {
                ...newsPost,
                thumbnailImage: thumbnailURL, // Ensure the thumbnail URL is updated
                newsImages: newsImagesURLs, // Ensure the news images URLs are updated
                updatedAt: serverTimestamp(),
            });
            console.log("News post updated successfully");
            setSnackbarOpen(true);
                setTimeout(() => {
                    navigate('/dashboard/news');
                }, 1500);
        } catch (error) {
            console.error("Error updating document: ", error); // Log error message
        }
    };

    const handleCancel = () => {
        navigate('/dashboard/news'); // Adjust the path as needed
    };
    const handleChangeQuill = (value, field) => {
        setNewsPost(prevState => ({
            ...prevState,
            [field]: value
        }));
    };
    
    
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Dashboardnav open={open} toggleDrawer={toggleDrawer} />
                <Dashboardsidebar open={open} toggleDrawer={toggleDrawer} />
                <Container style={{marginTop: '5rem'}}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 3, width: '40ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                        >
                        <div>
                            <TextField
                                required
                                error={errors.enTitle}
                                onChange={handleChange}
                                id="enTitle"
                                name="enTitle"
                                label="English Title"
                                type="text"
                                value={newsPost.enTitle}
                                placeholder="English Title"
                                helperText={errors.enTitle ? "Please provide a title in English." : ""}
                            />
                            <TextField
                                required
                                error={errors.khTitle}
                                onChange={handleChange}
                                id="khTitle"
                                name="khTitle"
                                label="Khmer Title"
                                type="text"
                                value={newsPost.khTitle}
                                placeholder="Khmer Title"
                                helperText={errors.khTitle ? "Please provide a title in Khmer." : ""}
                            />
                            <TextField
                                required
                                error={errors.enDescription}
                                id="enDescription"
                                label="English Description"
                                name="enDescription" 
                                value={newsPost.enDescription}
                                multiline
                                placeholder="English Description"
                                type= "text"
                                onChange={handleChange} 
                                helperText={errors.enDescription ? "Please provide a description in English." : ""}
                            />
                            <TextField
                                required
                                error={errors.khDescription}
                                id="khDescription"
                                label="Khmer Description"
                                name="khDescription" 
                                value={newsPost.khDescription}
                                multiline
                                placeholder="Khmer Description"
                                type= "text"
                                onChange={handleChange} 
                                helperText={errors.khDescription ? "Please provide a description in Khmer." : ""}
                            />
                             <div>
                             <img src={thumbnailURL} alt="Thumbnail" style={{ width: '20%', height: 'auto', margin: '1.5rem' }} />
                                <div style={{ marginTop: '-2rem', marginLeft: '3.5rem' }}>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    accept="image/*"
                                    style={{ display: 'none'}}
                                    onChange={(e) => {
                                        const selectedFiles = Array.from(e.target.files); 
                                        handleFileUpload(selectedFiles, undefined, true); // Pass true for thumbnail
                                }}
/>


                                <Button
                                    component="label"
                                    variant='contained'
                                    role={undefined}
                                    tabIndex={-1}
                                    htmlFor="fileUpload"
                                    style={{marginLeft: '1rem', marginTop: '1rem', marginBottom: '1rem', backgroundColor: '#F0C52D', color:'black'}}
                                >
                                    Replace
                                </Button>
                                </div>
                                <Grid container spacing={2}>
                                    {newsImagesURLs.map((url, index) => (
                                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                            <div style={{ textAlign: 'center' }}>
                                                <img 
                                                    src={url} 
                                                    alt={`News ${index + 1}`} 
                                                    style={{ width: '100%', height: 'auto', marginLeft: '1.5rem' }} 
                                                />
                                                <div style={{ marginTop: '0.5rem', marginLeft: '3.5rem', marginBottom: '1rem' }}>
                                                <Button variant="contained" sx={{backgroundColor: '#ff0200'}} onClick={() => {
                                                    
                                                    handleDeleteNewsImage(url); // Specify true to indicate thumbnail image
                                                    setDeleteConfirmationOpen(true)
                                                }}>
                                                    Delete
                                                </Button>

                                                <input
                                                    type="file"
                                                    id={`fileUpload${index}`} // Unique id attribute
                                                    accept="image/*"
                                                    style={{ display: 'none'}}
                                                    onChange={(e) => {
                                                        const selectedFiles = Array.from(e.target.files); 
                                                        handleFileUpload(selectedFiles, index); // Pass index for news images
                                                    }}
                                                />


                                                    <Button
                                                        component="label"
                                                        variant="contained"
                                                        role={undefined}
                                                        tabIndex={-1}
                                                        htmlFor={`fileUpload${index}`} // Match the unique id attribute
                                                        style={{marginLeft: '1rem', backgroundColor: '#F0C52D', color:'black'}}
                                                    >
                                                        Replace
                                                    </Button>
                                                </div>
                                            </div>    
                                        </Grid>
                                    ))}
                                </Grid>

                        </div>
                            <div>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 3, width: '100ch' },
                                }}
                                noValidate
                                autoComplete="off"
                                >
                                <ReactQuill
                                value={newsPost.enContent}
                                onChange={(value) => handleChangeQuill(value, 'enContent')}
                                placeholder="English Content"
                                style={{ marginTop: '2rem', marginLeft: '1.5rem', marginBottom: '1rem'}}
                                modules={{
                                    toolbar: [
                                        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                                        ['clean']
                                    ]
                                }}
                                formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent']}
                                theme="snow"
                            />
                            <ReactQuill
                                value={newsPost.khContent}
                                onChange={(value) => handleChangeQuill(value, 'khContent')}
                                placeholder="Khmer Content"
                                style={{ marginTop: '2rem', marginLeft: '1.5rem', marginBottom: '1rem'}}
                                modules={{
                                    toolbar: [
                                        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                                        ['clean']
                                    ]
                                }}
                                formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent']}
                                theme="snow"
                            />

                                </Box>
                            </div>
                            
                        </div>
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem', backgroundColor: "#198754" }}
                    >
                        Update News
                    </Button>
                    <Button
                        onClick={handleCancel}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem', backgroundColor: '#bb2124' }}
                    >
                        Cancel
                    </Button>
                    <Dialog
                        open={deleteConfirmationOpen}
                        onClose={() => setDeleteConfirmationOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm Image Deletion"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this image?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => handleDeleteConfirmed()} color="primary" autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Snackbar
                        open={snackbarOpen}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                    >
                        <Alert
                        onClose={handleSnackbarClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                        >
                            News updated successfully
                        </Alert>
                    </Snackbar>
                </Container> 
            </Box>
        </ThemeProvider>
    );
};

export default EditNews;
