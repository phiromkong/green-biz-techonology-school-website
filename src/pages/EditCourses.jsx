import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
 PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
 },
};

function getStyles(name, programName, theme) {
 return {
    fontWeight:
      programName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
 };
}

const defaultTheme = createTheme();
function EditCourses() {
    const { courseId } = useParams();
 const theme = useTheme();
 const [uploading, setUploading] = useState(false);
 const [selectedProgram, setSelectedProgram] = useState('');
 const [open, setOpen] = React.useState(true);
 const [programs, setPrograms] = useState([]);
 const navigate = useNavigate();

 const [courses, setCourses] = useState({
    enDescription: '',
    enProgramOutcome: '',
    enProgramOverview: '',
    enTitle: '',
    imageURL: '',
    khDescription: '',
    khProgramOutcome: '',
    khProgramOverview: '',
    khTitle: '',
    programId: '',
 });

 const [errors, setErrors] = useState({
    enDescription: '',
    enProgramOutcome: '',
    enProgramOverview: '',
    enTitle: '',
    imageURL: '',
    khDescription: '',
    khProgramOutcome: '',
    khProgramOverview: '',
    khTitle: '',
    programId: '',
 });

 useEffect(() => {
    const fetchPrograms = async () => {
        const programsCollection = collection(db, "program");
        const programsSnapshot = await getDocs(programsCollection); // Use getDocs instead of getDoc
        const programsList = programsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setPrograms(programsList);
       };
       

    const fetchCourse = async () => {
      const courseDoc = doc(db, "courses", courseId);
      const courseSnapshot = await getDoc(courseDoc);
      if (courseSnapshot.exists()) {
        setCourses(courseSnapshot.data());
        setSelectedProgram(courseSnapshot.data().programId);
      } else {
        console.log("No such document!");
      }
    };

    fetchPrograms();
    fetchCourse();
 }, [courseId]);

 const toggleDrawer = () => {
    setOpen(!open);
 };

 const handleChange = (event) => {
    const { name, value } = event.target;
    setCourses({ ...courses, [name]: value });

    // Validate fields
    let error = '';
    if (value.trim() === '') {
      error = 'This field is required';
    }
    setErrors({ ...errors, [name]: error });
 };

 const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
 };

 const handleFileUpload = async (files) => {
    if (files.length === 0) {
       console.error("No files selected for upload.");
       return;
    }
   
    setUploading(true); // Set uploading state to true while files are being uploaded
   
    // Generate a unique file name
    const uniqueFileName = `${courseId}-${Date.now()}-${files[0].name}`;
   
    const storageRef = ref(getStorage(), `courses/${uniqueFileName}`);
    await uploadBytes(storageRef, files[0]).then(snapshot => {
       return getDownloadURL(snapshot.ref).then(url => {
         // Update the Firestore document with the new image URL
         const courseData = {
           ...courses,
           imageURL: url, // Set the new image URL
           programId: selectedProgram,
         };
         const courseDoc = doc(db, "courses", courseId);
         updateDoc(courseDoc, courseData).then(() => {
           setCourses(courseData); // Update the local state
           setUploading(false); // Set uploading state to false after file is uploaded
         }).catch(error => {
           console.error("Error updating document: ", error);
           setUploading(false); // Set uploading state to false in case of error
         });
       });
    });
   };
   

 const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      ...courses,
      programId: selectedProgram,
    };
    try {
      const courseDoc = doc(db, "courses", courseId);
      await updateDoc(courseDoc, courseData);
      navigate('/dashboard/courses');
      // Handle success, e.g., navigate to another page or show a success message
    } catch (error) {
      console.error("Error updating document: ", error);
      // Handle error
    }
 };

 const handleCancel = () => {
    // Navigate back to the team dashboard
    navigate('/dashboard/courses');
 };

 return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Dashboardnav open={open} toggleDrawer={toggleDrawer} />
        <Dashboardsidebar open={open} toggleDrawer={toggleDrawer} />
        <Container style={{ marginTop: '5rem' }}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 3, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="enTitle"
                label="English Title"
                name="enTitle"
                autoComplete="off"
                value={courses.enTitle} 
                onChange={handleChange}
                error={!!errors.enTitle} 
                helperText={errors.enTitle} 
            />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="khTitle"
                label="Khmer Title"
                name="khTitle"
                autoComplete="off"
                value={courses.khTitle} 
                onChange={handleChange}
                error={!!errors.khTitle} 
                helperText={errors.khTitle} 
            />
            <TextField
                variant="outlined"
                margin="normal"
                multiline
                placeholder="English Description"
                fullWidth
                id="enDescription"
                label="English Description"
                name="enDescription"
                autoComplete="off"
                value={courses.enDescription} 
                onChange={handleChange}
                error={!!errors.enDescription} 
                helperText={errors.enDescription} 
            />
            <TextField
                variant="outlined"
                margin="normal"
                multiline
                placeholder="Khmer Description"
                fullWidth
                id="khDescription"
                label="Khmer Description"
                name="khDescription"
                autoComplete="off"
                value={courses.khDescription} 
                onChange={handleChange}
                error={!!errors.khDescription} 
                helperText={errors.khDescription} 
            />
            <TextField
                variant="outlined"
                margin="normal"
                multiline
                placeholder="English Program Overview"
                fullWidth
                id="enProgramOverview"
                label="English Program Overview"
                name="enProgramOverview"
                autoComplete="off"
                value={courses.enProgramOverview} 
                onChange={handleChange}
                error={!!errors.enProgramOverview} 
                helperText={errors.enProgramOverview} 
            />
            <TextField
                variant="outlined"
                margin="normal"
                multiline
                placeholder="Khmer Program Overview"
                fullWidth
                id="khProgramOverview"
                label="Khmer Program Overview"
                name="khProgramOverview"
                autoComplete="off"
                value={courses.khProgramOverview} 
                onChange={handleChange}
                error={!!errors.khProgramOverview} 
                helperText={errors.khProgramOverview} 
            />
            <TextField
                variant="outlined"
                margin="normal"
                multiline
                placeholder="English Program Outcome"
                fullWidth
                id="enProgramOutcome"
                label="English Program Outcome"
                name="enProgramOutcome"
                autoComplete="off"
                value={courses.enProgramOutcome} 
                onChange={handleChange}
                error={!!errors.enProgramOutcome} 
                helperText={errors.enProgramOutcome} 
            />
            <TextField
                variant="outlined"
                margin="normal"
                multiline
                placeholder="Khmer Program Outcome"
                fullWidth
                id="khProgramOutcome"
                label="Khmer Program Outcome"
                name="khProgramOutcome"
                autoComplete="off"
                value={courses.khProgramOutcome} 
                onChange={handleChange}
                error={!!errors.khProgramOutcome} 
                helperText={errors.khProgramOutcome} 
            />
            <FormControl sx={{ m: 3, width: 300 }}>
            <InputLabel id="program-label">Program</InputLabel>
            <Select
                labelId="program-label"
                id="program-select"
                value={selectedProgram}
                onChange={handleProgramChange}
                label="Program"
            >
                {programs.map((program) => (
                <MenuItem key={program.id} value={program.id}>
                    {program.enTitle} {/* Assuming each program has a 'name' property */}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
            <div style={{marginLeft: '1.5rem', marginBottom: '2rem'}}>
                                <img src={courses.imageURL} alt="Program Logo" style={{ width: '20%', height: 'auto',}} />
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
}

export default EditCourses;
