import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import { collection, doc, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getStorage, ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TextField, MenuItem, Grid, Snackbar, Button, Box, Container, FormControl, InputLabel, Select, OutlinedInput } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();
function EditGallery() {
    const [programs, setPrograms] = useState([]);
    const [galleryData, setGalleryData] = useState({});
    const [selectedProgram, setSelectedProgram] = useState(''); 
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true); // Add a loading state
    const navigate = useNavigate(); // Use useNavigate to get the navigate function
    const { imageId } = useParams();
    const [open, setOpen] = React.useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    ; // Use useParams to get the route parameter

    useEffect(() => {
        const fetchPrograms = async () => {
            const programsCollection = collection(db, "program");
            const programsSnapshot = await getDocs(programsCollection);
            const programsList = programsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            console.log(programsList);
            setPrograms(programsList);
           };

           const fetchGallery = async () => {
            console.log("Fetching gallery with ID:", imageId); // Debugging line
            const galleryDoc = doc(db, "gallery", imageId);
            const gallerySnapshot = await getDoc(galleryDoc);
            console.log(gallerySnapshot);
            if (gallerySnapshot.exists()) {
                setGalleryData(gallerySnapshot.data());
                setSelectedProgram(gallerySnapshot.data().programId);
            } else {
                console.log("No such document!");
            }
        };
        
          fetchGallery();
          fetchPrograms();
    }, [imageId]);
    

    const handleProgramChange = (event) => {
        setSelectedProgram(event.target.value);
        // Update the gallery data in Firestore with the new programId
        const galleryRef = doc(db, "gallery", imageId);
        updateDoc(galleryRef, { programId: event.target.value });
    };

    const handleInputChange = (e) => {
        setGalleryData({ ...galleryData, [e.target.name]: e.target.value });
    };

    const handleImageReplace = async (index, file) => {
        const storage = getStorage();
        const storageRef = ref(storage, `gallery/${file.name}`);
        await uploadBytes(storageRef, file);
        const newImageUrl = await getDownloadURL(storageRef);

        // Delete old image from storage
        const oldImageRef = ref(storage, `gallery/${images[index].name}`);
        await deleteObject(oldImageRef);

        // Update Firestore document
        const programRef = doc(db, "program", imageId); // Use the id from useParams
        await updateDoc(programRef, {
            images: images.map((img, i) => i === index ? newImageUrl : img)
        });

        // Update local state
        setImages(images.map((img, i) => i === index ? { ...img, url: newImageUrl } : img));
    };


    // Example of using navigate to go back to the gallery page after an operation
    const handleCancel = () => {
        navigate('/dashboard/gallery');
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
    
        // Assuming you have a state for the gallery's title and image URL
        const { enTitle, khTitle, image } = galleryData;
    
        // Update the gallery document in Firestore with the new data
        const galleryRef = doc(db, "gallery", imageId);
        await updateDoc(galleryRef, {
            enTitle,
            khTitle,
            programId: selectedProgram,
            image // Update the image URL if it has changed
        });
    
        // If there's a new image to upload, handle the upload here
        // This part is already handled by your handleImageChange function
    
        // Optionally, show a success message or navigate to another page
        handleSnackbarOpen("Gallery updated successfully");
        setTimeout(() => {
            navigate('/dashboard/gallery');
        }, 1500);
        setLoading(false);
    };
    

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


     const handleImageChange = async (e) => {
        if (e.target.files.length === 0) {
            console.error("No files selected for upload.");
            return;
        }

        setUploading(true);

        const file = e.target.files[0];
        const storageRef = ref(getStorage(), `gallery/${file.name}`);
        await uploadBytes(storageRef, file).then(snapshot => {
            return getDownloadURL(snapshot.ref).then(url => {
                setGalleryData({ ...galleryData, image: url });
            });
        });

        setUploading(false);
    };

     return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Dashboardnav open={open} toggleDrawer={toggleDrawer} />
                <Dashboardsidebar open={open} toggleDrawer={toggleDrawer} />
                <Container style={{ marginTop: '7rem' }}>
                <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 3, width: '40ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        
                    >
                    <FormControl sx={{ m: 3, width: 400 }}>
                        <InputLabel id="program-select-label">Select Program</InputLabel>
                        <Select
                            labelId="program-select-label"
                            id="program-select"
                            value={selectedProgram}
                            onChange={handleProgramChange}
                            label="Select Program"
                            onSubmit={handleSubmit}
                        >
                            {programs.map((program) => (
                                <MenuItem key={program.id} value={program.id}>
                                    {program.enTitle}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        lable= 'English Title'
                        value={galleryData.enTitle || ''}
                        id='enTitle'
                        name='enTitle'
                        onChange={handleInputChange}
                    />  
                    <TextField
                        required
                        label='Khmer Title'
                        value={galleryData.khTitle || ''}
                        id='khTitle'
                        name='khTitle'
                        onChange={handleInputChange} // Attach the function here
                    />       
                     <div style={{marginLeft: '1.5rem', marginBottom: '2rem'}}>
                                <img src={galleryData.image} alt="Course Logo" style={{ width: '20%', height: 'auto',}} />
                            </div>
                            <input
                                type="file"
                                id="fileUpload"
                                accept="image/*"
                                style={{ display: 'none', marginLeft: '1.5rem' }}
                                onChange={handleImageChange}
                            />
                            <div style={{ marginTop: '-1.5rem', marginLeft: '2.0rem' }}>
                                <label htmlFor="fileUpload">
                                    <Button component="span" variant="contained" style={{marginLeft: '-0.5rem', backgroundColor: '#F0C52D', color:'black'}}>
                                        Replace
                                    </Button>
                                </label>
                            </div>
                            {uploading && <div style={{ marginLeft: '1.5rem' }}>Uploading...</div>}
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem', backgroundColor: "#198754" }}
                    >
                        Update Gallery
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
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Container>
            </Box>
        </ThemeProvider>
    );    
}

export default EditGallery;
