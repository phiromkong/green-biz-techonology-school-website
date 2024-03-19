import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const defaultTheme = createTheme();

const AddProgram = () => {
    const navigate = useNavigate(); // Use useNavigate hook
    const [open, setOpen] = React.useState(true);
    const [programImage, setProgramImage] = useState('');
    const [uploading, setUploading] = useState(false); // Add state to track file upload status

    const [program, setProgram] = useState({
        enTitle: '',
        khTitle: '',
    });
    
    const [errors, setErrors] = useState({
        enTitle: '',
        khTitle: '',
    });

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProgram({ ...program, [name]: value });

        // Validate fields
        let error = '';
        if (value.trim() === '') {
            error = 'This field is required';
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleImageChange = async (e) => {
        if (e.target.files.length === 0) {
            console.error("No files selected for upload.");
            return;
        }

        setUploading(true); // Set uploading state to true while files are being uploaded

        const file = e.target.files[0];
        const storageRef = ref(getStorage(), `programs/${file.name}`);
        await uploadBytes(storageRef, file).then(snapshot => {
            return getDownloadURL(snapshot.ref).then(url => {
                setProgramImage(url); // Set programImage with the URL of the uploaded file
            });
        });

        setUploading(false); // Set uploading state to false after file is uploaded
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Manually trigger validation for all fields
        const newErrors = {
            enTitle: program.enTitle.trim() === '' ? 'This field is required' : '',
            khTitle: program.khTitle.trim() === '' ? 'This field is required' : '',
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
                const programData = {
                    enTitle: program.enTitle,
                    khTitle: program.khTitle,
                    image: programImage,
                };
                const docRef = await addDoc(collection(db, "program"), programData);
                console.log("Document written with ID: ", docRef.id);
                navigate('/dashboard/programs'); // Navigate to /dashboard/programs after adding the program
            } catch (error) {
                console.error("Error adding document: ", error);
                // Handle error
            }
        }
    };
    
    
    
    const handleCancel = () => {
        // Reset form fields to their initial state
        setProgram({
            enTitle: '',
            khTitle: '',
        });
        // Navigate back to the programs dashboard
        navigate('/dashboard/programs');
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
                                id="enTitle"
                                name="enTitle"
                                label="English Title"
                                value={program.enTitle}
                                error={Boolean(errors.enTitle)}
                                helperText={errors.enTitle}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="khTitle"
                                name="khTitle"
                                label="Khmer Title"
                                value={program.khTitle}
                                error={Boolean(errors.khTitle)}
                                helperText={errors.khTitle}
                            />
                            <input
                                type="file"
                                id="fileUpload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                        </div>
                        <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                htmlFor="fileUpload"
                                style={{ marginLeft: '1.5rem'}}
                            >
                                Upload Image
                        </Button>
                        {uploading && <div style={{marginLeft: '1.5rem'}}>Uploading...</div>}
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem' }}
                    >
                        Add Program
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1rem' }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Container> 
            </Box>
        </ThemeProvider>
    );
};

export default AddProgram;
