import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Timestamp } from 'firebase/firestore';

const defaultTheme = createTheme();

const AddNews = () => {
    const [open, setOpen] = useState(true);
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [newsImagesURLs, setNewsImagesURLs] = useState([]);
    const [uploading, setUploading] = useState(false); // Add state to track file upload status
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
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

    const [errors, setErrors] = useState({
        enTitle: '',
        enContent: '',
        enDescription: '',
        khTitle: '',
        khContent: '',
        khDescription: '',
    });

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewsPost({ ...newsPost, [name]: value });

        let error = '';
        if (value.trim() === '') {
            error = 'This field is required';
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleFileUpload = async (files) => {
        if (files.length === 0) {
            console.error("No files selected for upload.");
            return;
        }

        setUploading(true); // Set uploading state to true while files are being uploaded

        const storageRef = ref(getStorage(), 'news');
        const uploadPromises = files.map(file => {
            const fileRef = ref(storageRef, file.name);
            return uploadBytes(fileRef, file).then(snapshot => {
                return getDownloadURL(snapshot.ref).then(url => {
                    return { name: file.name, url: url };
                });
            });
        });

        try {
            const uploadedFiles = await Promise.all(uploadPromises);
            const thumbnail = uploadedFiles[0]; // Get the first uploaded file
            setThumbnailURL(thumbnail.url); // Set thumbnailURL with the URL of the first uploaded file
            const newsImages = uploadedFiles.slice(1); // Exclude the thumbnail
            setNewsImagesURLs(newsImages.map(file => file.url)); // Set newsImagesURLs with URLs of other uploaded files
        } catch (error) {
            console.error("Error uploading files: ", error);
            // Handle error appropriately
        } finally {
            setUploading(false); // Set uploading state to false after files are uploaded (whether success or failure)
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("clicked");

        // Manually trigger validation for all fields
        const newErrors = {
            enTitle: newsPost.enTitle.trim() === '' ? 'This field is required' : '',
            enContent: newsPost.enContent.trim() === '' ? 'This field is required' : '',
            enDescription: newsPost.enDescription.trim() === '' ? 'This field is required' : '',
            khTitle: newsPost.khTitle.trim() === '' ? 'This field is required' : '',
            khContent: newsPost.khContent.trim() === '' ? 'This field is required' : '',
            khDescription: newsPost.khDescription.trim() === '' ? 'This field is required' : '',
        };

        // Update the errors state with the new validation results
        setErrors(newErrors);

        // Check if there are any errors in the form
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (hasErrors) {
            console.log("Form has errors, submission prevented.");
            // Optionally, show an error message to the user
            return;
        }

        if (uploading) {
            console.log("Uploading in progress");
            return;
        } else {
            try {
                const newsData = {
                    ...newsPost,
                    date: Timestamp.fromDate(new Date()),
                    thumbnailImage: thumbnailURL,
                    newsImages: newsImagesURLs,
                };
                const docRef = await addDoc(collection(db, "news"), newsData);
                console.log("Document written with ID: ", docRef.id);
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate('/dashboard/news');
                }, 1500);
                
                // Redirect or show success message
            } catch (error) {
                console.error("Error adding document: ", error);
                // Handle error
            }
        }
    };

    const handleCancel = () => {
        // Reset form fields to their initial state
        setNewsPost({
            enTitle: '',
            enContent: '',
            enDescription: '',
            khTitle: '',
            khContent: '',
            khDescription: '',
        });
        setThumbnailURL('');
        setNewsImagesURLs([]);
        // Navigate back to the news dashboard
        navigate('/dashboard/news');
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
                                error={Boolean(errors.enTitle)}
                                onChange={handleChange}
                                id="enTitle"
                                name="enTitle"
                                label="English Title"
                                helperText={errors.enTitle ? "Please provide a title in English." : ""}
                            />
                            <TextField
                                required
                                error={Boolean(errors.khTitle)}
                                label="Khmer Title"
                                id="khTitle"
                                name="khTitle" 
                                onChange={handleChange}
                                helperText={errors.khTitle ? "Please provide a title in Khmer." : ""}
                            />
                            <TextField
                                required
                                error={Boolean(errors.enDescription)}
                                id="enDescription"
                                label="English Description"
                                name="enDescription" 
                                multiline
                                placeholder='English Description'
                                onChange={handleChange} 
                                helperText={errors.enDescription ? "Please provide a description in English." : ""}
                            />

                            <div>
                                <TextField
                                    required
                                    id="khDescription"
                                    error={Boolean(errors.khDescription)}
                                    label="Khmer Description"
                                    name="khDescription" 
                                    multiline
                                    placeholder='Khmer Description'
                                    onChange={handleChange} 
                                    helperText={errors.khDescription ? "Please provide a description in Khmer." : ""}
                                    
                                />
                                <input
                                    type="file"
                                    id="fileUpload"
                                    accept="image/*"
                                    style={{ display: 'flex', marginLeft: '1.5rem' }}
                                    multiple
                                    onChange={(e) => {
                                        const selectedFiles = Array.from(e.target.files); // Convert FileList to array
                                        handleFileUpload(selectedFiles);
                                    }}
                                />
                                {uploading && <div style={{marginLeft: '1.5rem'}}>Uploading...</div>}
                            </div>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 3, width: '100ch' },
                                }}
                                noValidate
                                autoComplete="off"
                                >
                            <TextField
                                required
                                error={errors.enContent}
                                id="enContent"
                                label="English Content"
                                name="enContent" 
                                onChange={handleChange} 
                                placeholder="English Content"
                                helperText={errors.enContent ? "Please provide a cotent in English." : ""}
                                multiline
                            />
                            <TextField
                                required
                                id="khContent"
                                error={errors.khContent}
                                label="Khmer Content"
                                name="khContent" 
                                onChange={handleChange} 
                                placeholder="Khmer Content"
                                helperText={errors.khContent ? "Please provide a cotent in Khmer." : ""}
                                multiline
                            />
                            </Box>
                        </div>
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem',  backgroundColor: "#198754" }}
                    >
                        Create News
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1rem', backgroundColor: '#bb2124' }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
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
                            News Added successfully
                        </Alert>
                    </Snackbar>
                </Container> 
            </Box>

        </ThemeProvider>
    );
};

export default AddNews;