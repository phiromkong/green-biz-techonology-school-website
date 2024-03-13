import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const defaultTheme = createTheme();

const  EditOurTeam = () => {
    const [open, setOpen] = useState(true);
    const [imageURL, setImageURL] = useState('');
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const { memberId } = useParams(); // Get member ID from URL
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

    useEffect(() => {
        const fetchTeamMember = async () => {
            const docRef = doc(db, "team", memberId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTeamMember(docSnap.data());
                setImageURL(docSnap.data().image); // Set the initial image URL
            } else {
                console.log("No such document!");
            }
        };

        fetchTeamMember();
    }, [memberId]);

       

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTeamMember({ ...teamMember, [name]: value });

        // Validate fields
        let error = '';
        if (value.trim() === '') {
            error = 'This field is required';
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleFileUpload = async (files) => {
        if (files.length === 0) {
            console.error("No files selected for upload.");
            return;
        }
    
        setUploading(true);
    
        // Assuming only one file is selected
        const file = files[0];
        const storageRef = ref(getStorage(), `team/${file.name}`);
    
        // Upload file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
    
        // Update Firestore document with the new image URL
        await updateDoc(doc(db, "team", memberId), {
            image: downloadURL,
        });
    
        setImageURL(downloadURL); // Update local state
        setUploading(false);
    };

    const handleDeleteImage = async (imageUrl) => {
        // Extract the file path from the URL
        const path = imageUrl.split('o/')[1].split('?')[0];
        const storageRef = ref(getStorage(), path);
    
        try {
            await deleteObject(storageRef);
            console.log("Image deleted successfully");
        } catch (error) {
            console.error("Error deleting image: ", error);
        }
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (uploading) {
            console.log("Uploading in progress");
            return;
        } else {
            try {
                const teamMemberData = {
                    ...teamMember,
                    image: imageURL,
                };
                await updateDoc(doc(db, "team", memberId), teamMemberData);
                console.log("Document updated successfully");
                navigate('/dashboard/our-team');
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        }
    };

    const deleteImage = async (imagePath) => {
        const storageRef = ref(getStorage(), imagePath);
        await deleteObject(storageRef);
        console.log("Image deleted successfully");
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
                                type="text"
                                value={teamMember.enFirstName}
                                error={Boolean(errors.enFirstName)}
                                helperText={errors.enFirstName}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="enLastName"
                                name="enLastName"
                                label="English Last Name"
                                type="text"
                                value={teamMember.enLastName}
                                error={Boolean(errors.enLastName)}
                                helperText={errors.enLastName}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="enPosition"
                                name="enPosition"
                                label="English Position"
                                type="text"
                                value={teamMember.enPosition}
                                error={Boolean(errors.enPosition)}
                                helperText={errors.enPosition}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="enQuote"
                                name="enQuote"
                                label="English Quote"
                                type="text"
                                value={teamMember.enQuote}
                                error={Boolean(errors.enQuote)}
                                helperText={errors.enQuote}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="khFirstName"
                                name="khFirstName"
                                label="Khmer First Name"
                                type="text"
                                value={teamMember.khFirstName}
                                error={Boolean(errors.khFirstName)}
                                helperText={errors.khFirstName}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="khLastName"
                                name="khLastName"
                                label="Khmer Last Name"
                                type="text"
                                value={teamMember.enLastName}
                                error={Boolean(errors.enLastName)}
                                helperText={errors.enLastName}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="khPosition"
                                name="khPosition"
                                label="Khmer Position"
                                type="text"
                                value={teamMember.khPosition}
                                error={Boolean(errors.khPosition)}
                                helperText={errors.khPosition}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="khQuote"
                                name="khQuote"
                                label="Khmer Quote"
                                type="text"
                                value={teamMember.khQuote}
                                error={Boolean(errors.khQuote)}
                                helperText={errors.khQuote}
                            />
                            <TextField
                                required
                                onChange={handleChange}
                                id="sex"
                                name="sex"
                                label="Sex"
                                type="text"
                                value={teamMember.sex}
                                error={Boolean(errors.sex)}
                                helperText={errors.sex}
                            />
                             <div style={{marginLeft: '1.5rem', marginBottom: '2rem'}}>
                                <img src={imageURL} alt="Thumbnail" style={{ width: '20%', height: 'auto',}} />
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
                            {uploading && <div style={{marginLeft: '2.5rem', marginTop: '0.5rem'}}>Uploading...</div>}
                        </div>
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem' }}
                    >
                        Update Member
                    </Button>
                </Container> 
            </Box>
        </ThemeProvider>
    );
};

export default EditOurTeam;
