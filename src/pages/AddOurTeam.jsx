import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const defaultTheme = createTheme();

const AddTeamMember = () => {
    const [open, setOpen] = useState(true);
    const [imageURL, setImageURL] = useState('');
    const [uploading, setUploading] = useState(false); // Add state to track file upload status
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [teamMember, setTeamMember] = useState({
        enFirstName: '',
        enLastName: '',
        enPosition: '',
        enQuote: '',
        image: '',
        khFirstName: '',
        khLastName: '',
        khPosition: '',
        khQuote: '',
        sex: '',
    });

    const [errors, setErrors] = useState({
        enFirstName: '',
        enLastName: '',
        enPosition: '',
        enQuote: '',
        khFirstName: '',
        khLastName: '',
        khPosition: '',
        khQuote: '',
        sex: '',
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
        setTeamMember(prevState => ({
            ...prevState,
            [name]: value
        }));
    
        // Validate fields
        let error = '';
        if (value.trim() === '') {
            error = 'This field is required';
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };
    

    const handleFileUpload = async (files) => {
        if (files.length === 0) {
            console.error("No files selected for upload.");
            return;
        }
  
        setUploading(true); // Set uploading state to true while files are being uploaded

        const storageRef = ref(getStorage(), 'team');
        const fileRef = ref(storageRef, files[0].name);
        await uploadBytes(fileRef, files[0]).then(snapshot => {
            return getDownloadURL(snapshot.ref).then(url => {
                setImageURL(url); // Set imageURL with the URL of the uploaded file
            });
        });

        setUploading(false); // Set uploading state to false after file is uploaded
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("clicked");
    
        // Manually trigger validation for all fields
        const newErrors = {
            enFirstName: teamMember.enFirstName.trim() === '' ? 'This field is required' : '',
            enLastName: teamMember.enLastName.trim() === '' ? 'This field is required' : '',
            enPosition: teamMember.enPosition.trim() === '' ? 'This field is required' : '',
            enQuote: teamMember.enQuote.trim() === '' ? 'This field is required' : '',
            khFirstName: teamMember.khFirstName.trim() === '' ? 'This field is required' : '',
            khLastName: teamMember.khLastName.trim() === '' ? 'This field is required' : '',
            khPosition: teamMember.khPosition.trim() === '' ? 'This field is required' : '',
            khQuote: teamMember.khQuote.trim() === '' ? 'This field is required' : '',
            sex: teamMember.sex.trim() === '' ? 'This field is required' : '',
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
                const teamMemberData = {
                    ...teamMember,
                    image: imageURL,
                };
                const docRef = await addDoc(collection(db, "team"), teamMemberData);
                console.log("Document written with ID: ", docRef.id);
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate('/dashboard/our-team');
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
        setTeamMember({
            enFirstName: '',
            enLastName: '',
            enPosition: '',
            enQuote: '',
            image: '',
            khFirstName: '',
            khLastName: '',
            khPosition: '',
            khQuote: '',
            sex: '',
        });
        setImageURL('');
        // Navigate back to the team dashboard
        navigate('/dashboard/our-team');
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
                                onChange={handleChange}
                                id="enFirstName"
                                name="enFirstName"
                                label="English First Name"
                                error={Boolean(errors.enFirstName)}
                                helperText={errors.enFirstName}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="enLastName"
                                name="enLastName"
                                label="English Last Name"
                                error={Boolean(errors.enLastName)}
                                helperText={errors.enLastName}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="enPosition"
                                name="enPosition"
                                label="English Position"
                                error={Boolean(errors.enPosition)}
                                helperText={errors.enPosition}
                            />

                            <TextField
                                required
                                onChange={handleChange}
                                id="khFirstName"
                                name="khFirstName"
                                label="Khmer First Name"
                                error={Boolean(errors.khFirstName)}
                                helperText={errors.khFirstName}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="khLastName"
                                name="khLastName"
                                label="Khmer Last Name"
                                error={Boolean(errors.khLastName)}
                                helperText={errors.khLastName}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="khPosition"
                                name="khPosition"
                                label="Khmer Position"
                                error={Boolean(errors.khPosition)}
                                helperText={errors.khPosition}
                            />
                            <div>
                            <TextField
                                required
                                multiline
                                onChange={handleChange}
                                id="enQuote"
                                name="enQuote"
                                label="English Quote"
                                error={Boolean(errors.enQuote)}
                                helperText={errors.enQuote}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                multiline
                                id="khQuote"
                                name="khQuote"
                                label="Khmer Quote"
                                error={Boolean(errors.khQuote)}
                                helperText={errors.khQuote}
                            />
                            </div>

                            <TextField
                                required
                                onChange={handleChange}
                                id="sex"
                                name="sex"
                                label="Sex"
                                error={Boolean(errors.sex)}
                                helperText={errors.sex}
                            />
                            <input
                                type="file"
                                id="fileUpload"
                                accept="image/*"
                                style={{ display: ' flex', marginLeft: '1.5rem' }}
                                onChange={(e) => {
                                    const selectedFiles = Array.from(e.target.files); // Convert FileList to array
                                    handleFileUpload(selectedFiles);
                                }}
                            />
                        </div>
                        {uploading && <div style={{marginLeft: '1.5rem'}}>Uploading...</div>}
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem', backgroundColor: "#198754" }}
                    >
                        Add Team Member
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
                            Team Member Added successfully
                        </Alert>
                    </Snackbar>
                </Container> 
            </Box>
        </ThemeProvider>
    );
};

export default AddTeamMember;
