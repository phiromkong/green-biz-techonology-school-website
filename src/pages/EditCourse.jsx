import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

const EditCourse = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const { programId, courseId } = useParams(); // Assuming courseId is part of the URL
    const [courseData, setCourseData] = useState({});
    const [uploading, setUploading] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const fetchCourseData = async () => {
            const courseDoc = doc(db, "courses", courseId);
            const docSnap = await getDoc(courseDoc);

            if (docSnap.exists()) {
                setCourseData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchCourseData();
    }, [courseId]);

    const handleInputChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
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
                setCourseData({ ...courseData, imageURL: url });
            });
        });

        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const courseRef = doc(db, "courses", courseId);
        await updateDoc(courseRef, courseData);
        navigate(`/dashboard/programs/${programId}`);
    };

    const handleCancel = () => {
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
                                value={courseData.enTitle || ''}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="khTitle"
                                name="khTitle"
                                label="Khmer Title"
                                value={courseData.khTitle || ''}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="enDescription"
                                name="enDescription"
                                label="English Description"
                                value={courseData.enDescription || ''}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="khDescription"
                                name="khDescription"
                                label="Khmer Description"
                                value={courseData.khDescription || ''}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="enProgramOutcome"
                                name="enProgramOutcome"
                                label="English Program Outcome"
                                value={courseData.enProgramOutcome || ''}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="khProgramOutcome"
                                name="khProgramOutcome"
                                label="Khmer Program Outcome"
                                value={courseData.khProgramOutcome || ''}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="enProgramOverview"
                                name="enProgramOverview"
                                label="English Program Overview"
                                value={courseData.enProgramOverview || ''}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="khProgramOverview"
                                name="khProgramOverview"
                                label="Khmer Program Overview"
                                value={courseData.khProgramOverview || ''}
                                onChange={handleInputChange}
                            />
                            <div style={{marginLeft: '1.5rem', marginBottom: '2rem'}}>
                                <img src={courseData.imageURL} alt="Course Logo" style={{ width: '20%', height: 'auto',}} />
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
                                    <Button component="span" variant="contained" style={{marginLeft: '-0.5rem'}}>
                                        Replace
                                    </Button>
                                </label>
                            </div>
                            {uploading && <div style={{ marginLeft: '1.5rem' }}>Uploading...</div>}
                        </div>
                    </Box>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '2rem', marginLeft: '1.5rem' }}
                    >
                        Update Course
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

export default EditCourse;
