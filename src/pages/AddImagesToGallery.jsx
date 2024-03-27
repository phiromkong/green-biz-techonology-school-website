import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Button from '@mui/material/Button';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { TextField, MenuItem, Grid, Snackbar, FormControl, InputLabel, Select, OutlinedInput } from '@mui/material';
import Dashboardsidebar from '../components/Dashboardsidebar';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const defaultTheme = createTheme();
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
       style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
       },
    },
};
function AddImagesToGallery() {
    const [open, setOpen] = React.useState(true);
    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [replacingIndex, setReplacingIndex] = useState(null); 
    const [titles, setTitles] = useState([]);
    const [errors, setErrors] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const fetchPrograms = async () => {
            const programCollection = collection(db, "program");
            const programSnapshot = await getDocs(programCollection);
            const programList = programSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPrograms(programList);
        };
    
        fetchPrograms();
    }, []);
    

    const handleProgramChange = (event) => {
        setSelectedProgram(event.target.value);
    };

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
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

    const handleTitleChange = (index, language, event) => {
        const newTitles = [...titles];
        if (!newTitles[index]) {
            newTitles[index] = { enTitle: '', khTitle: '' };
        }
        newTitles[index][language] = event.target.value;
        setTitles(newTitles);
    };

    const handleSubmit = async () => {
        if (selectedFiles.length === 0) {
            handleSnackbarOpen('No files selected for submission');
            return;
        }

        if (!selectedProgram) {
            handleSnackbarOpen('Please select a program');
            return;
        }

        const storage = getStorage();
        const uploadPromises = selectedFiles.map(async (file, index) => {
            const storageRef = ref(storage, `gallery/${file.name}`);
            await uploadBytes(storageRef, file);
            return getDownloadURL(storageRef);
        });

            const imageUrls = await Promise.all(uploadPromises);

            const addImagePromises = imageUrls.map((url, index) => {
                return addDoc(collection(db, "gallery"), {
                    programId: selectedProgram,
                    image: url,
                    enTitle: titles[index]?.enTitle || '',
                    khTitle: titles[index]?.khTitle || '',
                });
            });

            await Promise.all(addImagePromises);
            setSnackbarMessage('Images uploaded successfully');
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate('/dashboard/gallery');
            }, 1500);
    };

    const handleCancel = () => {
        // Reset form state
        setSelectedProgram('');
        setSelectedFiles([]);
        setImagePreviews([]);
        setTitles([]);
        setErrors([]);
        setSnackbarMessage('Upload cancelled');
        setSnackbarOpen(true);
        navigate('/dashboard/gallery');
    };
    

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleReplaceImage = (index) => {
        setReplacingIndex(index);
        document.getElementById(`replace-image-${index}`).click();
    };

    const handleDeleteImage = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setTitles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Dashboardnav open={open} toggleDrawer={toggleDrawer} />
                <Dashboardsidebar open={open} toggleDrawer={toggleDrawer} />
                <Container style={{ marginTop: '7rem' }}>
                    <div>    
                    <FormControl sx={{width:'40%'}}>
                            <InputLabel id="program-select-label">Select Program</InputLabel>
                            <Select
                                labelId="program-select-label"
                                id="program-select"
                                value={selectedProgram}
                                onChange={handleProgramChange}
                                label="Select Program"
                            >
                                {programs.map((program) => (
                                    <MenuItem key={program.id} value={program.id}>
                                        {program.enTitle}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            style={{ display: 'flex', marginTop: '1rem' }}
                            onChange={handleFileChange}
                        />
                        <Grid container spacing={2}>
                        {imagePreviews.map((src, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <div key={index}>
                                    <img src={src} alt={`preview-${index}`} style={{ width: "100%", height: "50%", marginTop: '1rem' }} />
                                        <Box sx={{ marginBottom: 2, marginTop: 2 }}>
                                            <TextField
                                                label={`English Title`}
                                                value={titles[index]?.enTitle || ''}
                                                error={Boolean(errors[`enTitle-${index}`])}
                                                onChange={(event) => handleTitleChange(index, 'enTitle', event)}
                                                helperText={errors[`enTitle-${index}`]}
                                            />
                                        </Box>
                                        <Box sx={{ marginBottom: 2 }}>
                                            <TextField
                                                label={`Khmer Title`}
                                                value={titles[index]?.khTitle || ''}
                                                error={Boolean(errors[`khTitle-${index}`])}
                                                onChange={(event) => handleTitleChange(index, 'khTitle', event)}
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
                        <Button variant="contained" color="primary" sx={{ marginTop: '2rem', marginRight: '2rem', backgroundColor: "#198754" }} onClick={handleSubmit}>
                            Upload Images
                        </Button>
                        <Button variant="contained" color="primary" sx={{ marginTop: '2rem', backgroundColor: '#bb2124' }} onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                        message={snackbarMessage}
                    />
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default AddImagesToGallery;
