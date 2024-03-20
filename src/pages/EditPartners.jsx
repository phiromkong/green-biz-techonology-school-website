import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase'; // Ensure you have this configured correctly
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Snackbar from '@mui/material/Snackbar';
import Dashboardsidebar from '../components/Dashboardsidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const defaultTheme = createTheme();
const EditPartners = () => {
    const [partner, setPartner] = useState({ name: '', image: '' });
    const [open, setOpen] = React.useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();
    const { partnerId } = useParams();

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

    useEffect(() => {
        const fetchPartner = async () => {
            const docRef = doc(db, "partners", partnerId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPartner(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchPartner();
    }, [partnerId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPartner(prevPartner => ({ ...prevPartner, [name]: value }));
    };

    const handleFileUpload = async (files) => {
        if (files.length === 0) {
            console.error("No files selected for upload.");
            return;
        }
    
        const file = files[0];
        const storageRef = ref(getStorage(), `partners/${file.name}`);
    
        // Upload file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
    
        // Update Firestore document with the new image URL
        await updateDoc(doc(db, "partners", partnerId), {
            image: downloadURL,
        });
    
        setPartner(prevPartner => ({ ...prevPartner, image: downloadURL })); // Update local state
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateDoc(doc(db, "partners", partnerId), {
                name: partner.name,
                image: partner.image, // Correct field name
            });
            console.log("Partner updated successfully");
            setSnackbarOpen(true);
                setTimeout(() => {
                    navigate('/dashboard/partners');
                }, 1500);

        } catch (error) {
            console.error("Error updating document: ", error);
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
                                onChange={handleChange}
                                id="partnerName"
                                name="name"
                                label="Partner Name"
                                type="text"
                                value={partner.name}
                            />
                            <div style={{marginLeft: '1.5rem', marginBottom: '2rem'}}>
                                <img src={partner.image} alt="Partner Logo" style={{ width: '20%', height: 'auto',}} />
                            </div>

                            <input
                                type="file"
                                id="fileUpload"
                                accept="image/*"
                                style={{ display: 'none', marginLeft: '1.5rem' }}
                                onChange={(e) => {
                                    const selectedFiles = Array.from(e.target.files); // Convert FileList to array
                                    handleFileUpload(selectedFiles);
                                }}
                            />
                            <div style={{ marginTop: '-1.5rem', marginLeft: '2.0rem' }}>
                                <label htmlFor="fileUpload">
                                    <Button component="span" variant="contained" style={{marginLeft: '1rem'}}>
                                        Replace
                                    </Button>
                                </label>
                            </div>
                        </div>
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem' }}
                    >
                        Update Partner
                    </Button>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                        message="Partner updated successfully"
                    />
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default EditPartners;

