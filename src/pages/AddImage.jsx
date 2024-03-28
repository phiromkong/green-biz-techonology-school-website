import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';  
import Alert from '@mui/material/Alert';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const defaultTheme = createTheme();

function AddImage() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [titles, setTitles] = useState([]);
    const [replacingIndex, setReplacingIndex] = useState(null); 
    const [errors, setErrors] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Extract programId from the URL
    const { programId } = useParams();

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        // Initialize titles array with objects for each file
        const newTitles = files.map(() => ({ enTitle: '', khTitle: '' }));
        setTitles(newTitles);

        // Generate image previews
        const newImagePreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(newImagePreviews);
    };
    

    const validateTitles = () => {
        const newErrors = titles.map((title, index) => {
            if (!title.enTitle || !title.khTitle) {
                return { enTitle: !title.enTitle, khTitle: !title.khTitle };
            }
            return null;
        });
        setErrors(newErrors.filter(error => error !== null));
    };

    const handleTitleChange = (index, language, event) => {
        const newTitles = [...titles];
        if (!newTitles[index]) {
            newTitles[index] = { enTitle: '', khTitle: '' };
        }
        newTitles[index][language] = event.target.value;
        setTitles(newTitles);

        // Validate fields
        let error = '';
        if (event.target.value.trim() === '') {
            error = 'This field is required';
        }
        setErrors(prev => ({ ...prev, [`${language}-${index}`]: error }));
    };

    const handleReplaceImage = (index) => {
        setReplacingIndex(index);
        document.getElementById(`replace-image-${index}`).click();
    };

    const handleDeleteImage = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setTitles(prev => prev.filter((_, i) => i !== index));
        setErrors(prev => prev.filter((_, i) => i !== index));
    };

    const handleReplaceFileChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const newImagePreviews = [...imagePreviews];
                newImagePreviews[index] = reader.result;
                setImagePreviews(newImagePreviews);
                setSelectedFiles(prev => {
                    const newSelectedFiles = [...prev];
                    newSelectedFiles[index] = file;
                    return newSelectedFiles;
                });
            };
        }
    };

    const handleSubmit = async () => {
        validateTitles(); // Validate titles on submit
    
        // Filter out null or undefined values from the errors array
        const filteredErrors = errors.filter(error => error !== null && error !== undefined);
    
        // Check if any field has an error
        const hasErrors = filteredErrors.some(error => Object.values(error).some(value => value));

        if (selectedFiles.length === 0) {
            // Set the error message and open the Snackbar
            handleSnackbarOpen('No files selected for submission');
            return; // Exit the function early
        }
    
        if (!hasErrors) {
            // Handle the submission logic here
            console.log('Submitting with programId:', programId);
    
            // Upload images to Firebase Storage and get their URLs
            const storage = getStorage();
            const uploadPromises = selectedFiles.map(async (file, index) => {
                const storageRef = ref(storage, `gallery/${file.name}`);
                await uploadBytes(storageRef, file);
                return getDownloadURL(storageRef);
            });
    
            const imageUrls = await Promise.all(uploadPromises);
    
            // Prepare image metadata
            const imageData = imageUrls.map((url, index) => ({
                image: url,
                enTitle: titles[index]?.enTitle || '',
                khTitle: titles[index]?.khTitle || '',
                programId,
            }));
    
            // Submit image metadata to Firestore in the "gallery" collection
            const addImagePromises = imageData.map(data => addDoc(collection(db, "gallery"), data));
            await Promise.all(addImagePromises);
    
            console.log('Images uploaded and metadata stored successfully');
            handleSnackbarOpen('Images upload successfully');;
                setTimeout(() => {
                    navigate(`/dashboard/programs/${programId}`);
                }, 1500);
        }
    };
    
    

    const handleCancel = () => {
        // Reset form fields to their initial state
        setSelectedFiles([]);
        setImagePreviews([]);
        setTitles([]);
        setErrors([]);
        navigate(`/dashboard/programs/${programId}`);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Dashboardnav open={open} toggleDrawer={toggleDrawer} />
                <Dashboardsidebar open={open} toggleDrawer={toggleDrawer} />
                <Container style={{ marginTop: '5rem' }}>
                    <div>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <Grid container spacing={2}>
                            {imagePreviews.map((src, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                    <div key={index}>
                                        <img src={src} alt={`preview-${index}`} style={{ width: "100%", height: "50%" }} />
                                        <Box sx={{ marginBottom: 2 }}> {/* Add spacing between fields */}
                                            <TextField
                                                label={`English Title`}
                                                value={titles[index]?.enTitle || ''}
                                                onChange={(event) => handleTitleChange(index, 'enTitle', event)}
                                                error={Boolean(errors[`enTitle-${index}`])}
                                                helperText={errors[`enTitle-${index}`]}
                                            />
                                        </Box>
                                        <Box sx={{ marginBottom: 2 }}> {/* Add spacing between fields */}
                                            <TextField
                                                label={`Khmer Title`}
                                                value={titles[index]?.khTitle || ''}
                                                onChange={(event) => handleTitleChange(index, 'khTitle', event)}
                                                error={Boolean(errors[`khTitle-${index}`])}
                                                helperText={errors[`khTitle-${index}`]}
                                            />
                                        </Box>
                                        <Button variant="contained" color="secondary" onClick={() => handleReplaceImage(index)}>
                                            Replace Image
                                        </Button>
                                        <Button sx={{marginTop: '1rem'}} variant="contained" color="error" onClick={() => handleDeleteImage(index)}>
                                            Delete Image
                                        </Button>
                                        <input
                                            type="file"
                                            id={`replace-image-${index}`}
                                            style={{ display: 'none' }}
                                            onChange={(event) => handleReplaceFileChange(event, index)}
                                        />
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                        <Button variant="contained"  sx={{ marginTop: '3rem', marginBottom: '3rem', backgroundColor: "#198754" }} onClick={handleSubmit}>
                            Upload Images
                        </Button>
                        <Button variant="contained" sx={{ marginTop: '3rem', marginBottom: '3rem', marginLeft: '3rem', backgroundColor: '#bb2124' }} onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
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
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default AddImage;
