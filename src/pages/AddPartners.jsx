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
import Alert from '@mui/material/Alert';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const defaultTheme = createTheme();

const AddPartners = () => {
    const navigate = useNavigate(); // Use useNavigate hook
    const [open, setOpen] = React.useState(true);
    const [partnerName, setPartnerName] = useState('');
    const [partnerLogo, setPartnerLogo] = useState('');
    const [uploading, setUploading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [errors, setErrors] = useState({
        partnerName: '',
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

    const handleNameChange = (e) => {
        const value = e.target.value;
        setPartnerName(value);

        // Validate partnerName field
        let error = '';
        if (value.trim() === '') {
            error = 'This field is required';
        }
        setErrors({ ...errors, partnerName: error });
    };

    const handleLogoChange = async (e) => {
        if (e.target.files.length === 0) {
            console.error("No files selected for upload.");
            return;
        }

        setUploading(true); // Set uploading state to true while files are being uploaded

        const file = e.target.files[0];
        const storageRef = ref(getStorage(), `partners/${file.name}`);
        await uploadBytes(storageRef, file).then(snapshot => {
            return getDownloadURL(snapshot.ref).then(url => {
                setPartnerLogo(url); // Set partnerLogo with the URL of the uploaded file
            });
        });

        setUploading(false); // Set uploading state to false after file is uploaded
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Manually trigger validation for all fields
        const newErrors = {
            partnerName: partnerName.trim() === '' ? 'This field is required' : '',
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
                const partnerData = {
                    name: partnerName,
                    image: partnerLogo,
                };
                const docRef = await addDoc(collection(db, "partners"), partnerData);
                console.log("Document written with ID: ", docRef.id);
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate('/dashboard/partners');
                }, 1500);
            } catch (error) {
                console.error("Error adding document: ", error);
                // Handle error
            }
        }
    };

    const handleCancel = () => {
        // Reset form fields to their initial state
        setPartnerName('');
        setPartnerLogo('');
        // Navigate back to the partners dashboard
        navigate('/dashboard/partners');
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
                                onChange={handleNameChange}
                                id="partnerName"
                                name="partnerName"
                                label="Partner Name"
                                error={Boolean(errors.partnerName)}
                                helperText={errors.partnerName}
                            />
                            <input
                                type="file"
                                id="fileUpload"
                                accept="image/*"
                                style={{ display: 'flex', marginLeft: '1.5rem' }}
                                onChange={handleLogoChange}
                            />
                            {uploading && <div style={{marginLeft: '1.5rem'}}>Uploading...</div>}
                        </div>
                        {uploading && <div style={{marginLeft: '1.5rem'}}>Uploading...</div>}
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem', backgroundColor: "#198754" }}
                    >
                        Add Partner
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
                            Partner Added successfully
                        </Alert>
                    </Snackbar>
                </Container> 
            </Box>
        </ThemeProvider>
    );
};

export default AddPartners;
