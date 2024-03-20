import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';

const defaultTheme = createTheme();

const AddCourse = () => {
    const navigate = useNavigate();
    const { programId } = useParams();
    const [open, setOpen] = React.useState(true);
    const [enTitle, setEnTitle] = useState('');
    const [khTitle, setKhTitle] = useState('');
    const [enDescription, setEnDescription] = useState('');
    const [khDescription, setKhDescription] = useState('');
    const [enProgramOutcome, setEnProgramOutcome] = useState('');
    const [khProgramOutcome, setKhProgramOutcome] = useState('');
    const [enProgramOverview, setEnProgramOverview] = useState('');
    const [khProgramOverview, setKhProgramOverview] = useState('');
    const [courseImage, setCourseImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [errors, setErrors] = useState({
        enTitle: '',
        khTitle: '',
        enDescription: '',
        khDescription: '',
        enProgramOutcome: '',
        khProgramOutcome: '',
        enProgramOverview: '',
        khProgramOverview: '',
    });

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleInputChange = (setter, fieldName, value) => {
        if (!value.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, [fieldName]: true }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, [fieldName]: false }));
        }
        setter(value);
    };

    const handleImageChange = async (e) => {
        if (e.target.files.length === 0) {
            console.error("No files selected for upload.");
            return;
        }

        setUploading(true);

        const file = e.target.files[0];
        const storageRef = ref(getStorage(), `courses/${file.name}`);
        await uploadBytes(storageRef, file).then(snapshot => {
            return getDownloadURL(snapshot.ref).then(url => {
                setCourseImage(url);
            });
        });

        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked");

        // Manually trigger validation for all fields
        const newErrors = {
            enTitle: enTitle.trim() === '' ? 'This field is required' : '',
            khTitle: khTitle.trim() === '' ? 'This field is required' : '',
            enDescription: enDescription.trim() === '' ? 'This field is required' : '',
            khDescription: khDescription.trim() === '' ? 'This field is required' : '',
            enProgramOutcome: enProgramOutcome.trim() === '' ? 'This field is required' : '',
            khProgramOutcome: khProgramOutcome.trim() === '' ? 'This field is required' : '',
            enProgramOverview: enProgramOverview.trim() === '' ? 'This field is required' : '',
            khProgramOverview: khProgramOverview.trim() === '' ? 'This field is required' : '',
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
                const courseData = {
                    enTitle,
                    khTitle,
                    enDescription,
                    khDescription,
                    enProgramOutcome,
                    khProgramOutcome,
                    enProgramOverview,
                    khProgramOverview,
                    imageURL: courseImage,
                    programId,
                };
                const docRef = await addDoc(collection(db, "courses"), courseData);
                console.log("Document written with ID: ", docRef.id);
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate(`/dashboard/programs/${programId}`);
                }, 1500);
                // Reset form fields to their initial state
                setEnTitle('');
                setKhTitle('');
                setEnDescription('');
                setKhDescription('');
                setEnProgramOutcome('');
                setKhProgramOutcome('');
                setEnProgramOverview('');
                setKhProgramOverview('');
                setCourseImage('');
            } catch (error) {
                console.error("Error adding document: ", error);
                // Handle error
            }
        }
    };

    const handleCancel = () => {
        // Reset form fields to their initial state
        setEnTitle('');
        setKhTitle('');
        setEnDescription('');
        setKhDescription('');
        setEnProgramOutcome('');
        setKhProgramOutcome('');
        setEnProgramOverview('');
        setKhProgramOverview('');
        setCourseImage('');
        // Navigate back to the programs dashboard
        navigate(`/dashboard/programs/${programId}`);
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
                                id="enTitle"
                                name="enTitle"
                                label="English Title"
                                value={enTitle}
                                onChange={(e) => handleInputChange(setEnTitle, 'enTitle', e.target.value)}
                                error={Boolean(errors.enTitle)}
                                helperText={errors.enTitle}
                            />
                            <TextField
                                required
                                id="khTitle"
                                name="khTitle"
                                label="Khmer Title"
                                value={khTitle}
                                onChange={(e) => handleInputChange(setKhTitle, 'khTitle', e.target.value)}
                                error={Boolean(errors.khTitle)}
                                helperText={errors.khTitle}
                            />
                            <TextField
                                required
                                id="enDescription"
                                name="enDescription"
                                label="English Description"
                                value={enDescription}
                                onChange={(e) => handleInputChange(setEnDescription, 'enDescription', e.target.value)}
                                error={Boolean(errors.enDescription)}
                                helperText={errors.enDescription}
                            />
                            <TextField
                                required
                                onChange={(e) => handleInputChange(setKhDescription, 'khDescription', e.target.value)}
                                error={Boolean(errors.khDescription)}
                                helperText={errors.khDescription}
                                id="khDescription"
                                name="khDescription"
                                label="Khmer Description"
                                value={khDescription}
                            />
                            <TextField
                                required
                                onChange={(e) => handleInputChange(setEnProgramOutcome, 'enProgramOutcome', e.target.value)}
                                error={Boolean(errors.enProgramOutcome)}
                                helperText={errors.enProgramOutcome}
                                id="enProgramOutcome"
                                name="enProgramOutcome"
                                label="English Program Outcome"
                                value={enProgramOutcome}
                            />
                            <TextField
                                required
                                onChange={(e) => handleInputChange(setKhProgramOutcome, 'khProgramOutcome', e.target.value)}
                                error={Boolean(errors.khProgramOutcome)}
                                helperText={errors.khProgramOutcome}
                                id="khProgramOutcome"
                                name="khProgramOutcome"
                                label="Khmer Program Outcome"
                                value={khProgramOutcome}
                            />
                            <TextField
                                required
                                onChange={(e) => handleInputChange(setEnProgramOverview, 'enProgramOverview', e.target.value)}
                                error={Boolean(errors.enProgramOverview)}
                                helperText={errors.enProgramOverview}
                                id="enProgramOverview"
                                name="enProgramOverview"
                                label="English Program Overview"
                                value={enProgramOverview}
                            />
                            <TextField
                                required
                                onChange={(e) => handleInputChange(setKhProgramOverview, 'khProgramOverview', e.target.value)}
                                error={Boolean(errors.khProgramOverview)}
                                helperText={errors.khProgramOverview}
                                id="khProgramOverview"
                                name="khProgramOverview"
                                label="Khmer Program Overview"
                                value={khProgramOverview}
                            />
                            <input
                                type="file"
                                id="fileUpload"
                                accept="image/*"
                                style={{ display: 'flex', marginLeft: '1.5rem' }}
                                onChange={handleImageChange}
                            />
                            {uploading && <div style={{marginLeft: '1.5rem'}}>Uploading...</div>}
                        </div>
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem' }}
                    >
                        Add Course
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1rem' }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Snackbar 
                    open={snackbarOpen} 
                    autoHideDuration={6000} 
                    onClose={handleSnackbarClose}
                    message="Course added successfully"
                    />
                </Container> 
            </Box>
        </ThemeProvider>
    );
};

export default AddCourse;
