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

const AddPartners = () => {
    const navigate = useNavigate(); // Use useNavigate hook
    const [open, setOpen] = React.useState(true);
    const [partnerName, setPartnerName] = useState('');
    const [partnerLogo, setPartnerLogo] = useState('');
    const [uploading, setUploading] = useState(false); // Add state to track file upload status

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleNameChange = (e) => {
        setPartnerName(e.target.value);
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
                navigate('/dashboard/partners'); // Navigate to /dashboard/partners after adding the partner
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
                                onChange={handleNameChange}
                                id="partnerName"
                                name="partnerName"
                                label="Partner Name"
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
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem' }}
                    >
                        Add Partner
                    </Button>
                </Container> 
            </Box>
        </ThemeProvider>
    );
};

export default AddPartners;
