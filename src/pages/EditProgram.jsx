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
import Dashboardsidebar from '../components/Dashboardsidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const defaultTheme = createTheme();
const EditPrograms = () => {
    const [program, setProgram] = useState({ enTitle: '', khTitle: '', image: '' });
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const { programId } = useParams();
    const [uploading, setUploading] = useState(false); // New state for tracking upload status
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleCancel = () => {
        navigate(`/dashboard/programs/${programId}`);
    };

    useEffect(() => {
        const fetchProgram = async () => {
            const docRef = doc(db, "program", programId); // Adjust the collection name as needed
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProgram(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchProgram();
    }, [programId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProgram(prevProgram => ({ ...prevProgram, [name]: value }));
    };

    const handleFileUpload = async (files) => {
        if (files.length === 0) {
            console.error("No files selected for upload.");
            return;
        }
    
        setUploading(true); // Set uploading to true at the start of the upload
        const file = files[0];
        const storageRef = ref(getStorage(), `programs/${file.name}`); // Adjust the storage path as needed
    
        try {
            // Upload file to Firebase Storage
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
        
            // Update Firestore document with the new image URL
            await updateDoc(doc(db, "program", programId), {
                image: downloadURL,
            });
        
            setProgram(prevProgram => ({ ...prevProgram, image: downloadURL })); // Update local state
        } catch (error) {
            console.error("Error uploading file or updating document: ", error);
        } finally {
            setUploading(false); // Set uploading to false once the upload is complete or if an error occurs
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateDoc(doc(db, "program", programId), {
                enTitle: program.enTitle,
                khTitle: program.khTitle,
                image: program.image,
            });
            console.log("Program updated successfully");
            navigate('/dashboard/program');
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
                                id="enTitle"
                                name="enTitle"
                                label="English Title"
                                type="text"
                                value={program.enTitle}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="khTitle"
                                name="khTitle"
                                label="Khmer Title"
                                type="text"
                                value={program.khTitle}
                            />
                            <div style={{marginLeft: '1.5rem', marginBottom: '2rem'}}>
                                <img src={program.image} alt="Program Logo" style={{ width: '20%', height: 'auto',}} />
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
                                    <Button component="span" variant="contained" style={{marginLeft: '-0.5rem'}}>
                                        Replace
                                    </Button>
                                </label>
                            </div>
                            {uploading && <div style={{marginLeft: '2.5rem', marginTop: '0.5rem'}}>Uploading...</div>}
                        </div>
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem' }}
                    >
                        Update Program
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

export default EditPrograms;
