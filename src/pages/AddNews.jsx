import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Timestamp } from 'firebase/firestore';

const defaultTheme = createTheme();

const AddNews = () => {
    const [open, setOpen] = useState(true);
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [newsImagesURLs, setNewsImagesURLs] = useState([]);
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
        enTitle: true,
        enContent: true,
        enDescription: true,
        khTitle: true,
        khContent: true,
        khDescription: true,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewsPost({ ...newsPost, [name]: value });

        let error = false;
        if (value.trim() === '') {
            error = true;
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleFileUpload = async (files) => {
        const storageRef = ref(getStorage(), 'news');
        const uploadPromises = files.map(file => {
            const fileRef = ref(storageRef, file.name);
            return uploadBytes(fileRef, file).then(snapshot => {
                return getDownloadURL(snapshot.ref).then(url => {
                    return { name: file.name, url: url };
                });
            });
        });
        const uploadedFiles = await Promise.all(uploadPromises);
        const thumbnail = uploadedFiles[0]; // Get the first uploaded file
        setThumbnailURL(thumbnail.url); // Set thumbnailURL with the URL of the first uploaded file
        const newsImages = uploadedFiles.slice(1); // Exclude the thumbnail
        setNewsImagesURLs(newsImages.map(file => file.url)); // Set newsImagesURLs with URLs of other uploaded files
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("clicked");
        if (Object.values(errors).some(error => error)) {
            // Handle form validation errors
            console.log("Form validation failed");
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
                // Redirect or show success message
            } catch (error) {
                console.error("Error adding document: ", error);
                // Handle error
            }
        }
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
                                helperText={errors.enTitle ? "Please provide a title in English." : ""}
                            />
                            <TextField
                                required
                                error={errors.khTitle}
                                label="Khmer Title"
                                id="enTitle"
                                name="khTitle" 
                                onChange={handleChange}
                                helperText={errors.khTitle ? "Please provide a title in Khmer." : ""}
                            />
                            <TextField
                                required
                                error={errors.enDescription}
                                id="enDescription"
                                label="English Description"
                                name="enDescription" 
                                onChange={handleChange} 
                                helperText={errors.enDescription ? "Please provide a description in English." : ""}
                            />

                            <div>
                                <TextField
                                    required
                                    id="khDescription"
                                    error={errors.khDescription}
                                    label="Khmer Description"
                                    name="khDescription" 
                                    onChange={handleChange} 
                                    helperText={errors.khDescription ? "Please provide a description in Khmer." : ""}

                                />
                                <input
                                    type="file"
                                    id="fileUpload"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    multiple
                                    onChange={(e) => {
                                        const selectedFiles = Array.from(e.target.files); // Convert FileList to array
                                        handleFileUpload(selectedFiles).then(uploadedFiles => {
                                            const thumbnail = uploadedFiles[0]; // Assuming the first file is the thumbnail
                                            setThumbnailURL(thumbnail.url);
                                            const newsImages = uploadedFiles.slice(1); // Exclude the thumbnail
                                            setNewsImagesURLs(newsImages.map(file => file.url));
                                        });
                                    }}
                                />

                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    htmlFor="fileUpload"
                                >
                                    Upload Images
                                </Button>
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
                                placeholder="Placeholder"
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
                                placeholder="Placeholder"
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
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem' }}
                    >
                        Create News
                    </Button>
                </Container> 
            </Box>

        </ThemeProvider>
    );
};

export default AddNews;
