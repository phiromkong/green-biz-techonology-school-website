import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom'
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
function AddCourses() {
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
      const programsSnapshot = await getDocs(programsCollection);
      const programsList = programsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setPrograms(programsList);
    };

    fetchPrograms();
 }, []);

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
    const programId = event.target.value;
    console.log("Selected Program ID:", programId); // Debugging line
    setSelectedProgram(programId);
};


 const handleFileUpload = async (files) => {
    if (files.length === 0) {
      console.error("No files selected for upload.");
      return;
    }

    setUploading(true); // Set uploading state to true while files are being uploaded

    const storageRef = ref(getStorage(), 'courses');
    const fileRef = ref(storageRef, files[0].name);
    await uploadBytes(fileRef, files[0]).then(snapshot => {
      return getDownloadURL(snapshot.ref).then(url => {
        setCourses({ ...courses, imageURL: url }); // Set imageURL with the URL of the uploaded file
      });
    });

    setUploading(false); // Set uploading state to false after file is uploaded
 };

 const handleSubmit = async (e) => {
    console.log(courses);
    e.preventDefault();
    const courseData = {
      ...courses,
      programId: selectedProgram,
    };
    try {
      await addDoc(collection(db, "courses"), courseData);
      navigate('/dashboard/courses');
      // Handle success, e.g., navigate to another page or show a success message
    } catch (error) {
      console.error("Error adding document: ", error);
      // Handle error
    }
 };

 const handleCancel = () => {
    // Reset form fields to their initial state
    setCourses({
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
    // Navigate back to the team dashboard
    navigate('/dashboard/courses');
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
            <TextField
              required
              onChange={handleChange}
              id="enTitle"
              name="enTitle"
              label="English Title"
              error={Boolean(errors.enTitle)}
              helperText={errors.enTitle}
            />
            <TextField
              required
              onChange={handleChange}
              id="khTitle"
              name="khTitle"
              label="Khmer Title"
              error={Boolean(errors.khTitle)}
              helperText={errors.khTitle}
            />
            <TextField 
                required
                onChange={handleChange}
                id="enDescription"
                name="enDescription"
                label="English Description"
                multiline
                placeholder="English Description"
                error={Boolean(errors.enDescription)}
                helperText={errors.enDescription}
            />
            <TextField 
                required
                onChange={handleChange}
                id="khDescription"
                name="khDescription"
                label="Khmer Description"
                multiline
                placeholder="Khmer Description"
                error={Boolean(errors.khDescription)}
                helperText={errors.khDescription}
            />
            <TextField 
                required
                onChange={handleChange}
                id="enProgramOverview"
                name="enProgramOverview"
                label="English Program Overview"
                multiline
                placeholder="English Program Overview"
                error={Boolean(errors.enProgramOverview)}
                helperText={errors.enProgramOverview}
            />
            <TextField 
                required
                onChange={handleChange}
                id="khProgramOverview"
                name="khProgramOverview"
                label="Khmer Program Overview"
                multiline
                placeholder="Khmer Program Overview"
                error={Boolean(errors.khProgramOverview)}
                helperText={errors.khProgramOverview}
            />
            <TextField 
                required
                onChange={handleChange}
                id="enProgramOutcome"
                name="enProgramOutcome"
                label="English Program Outcome"
                multiline
                placeholder="English Program Outcome"
                error={Boolean(errors.enProgramOutcome)}
                helperText={errors.enProgramOutcome}
            />
            <TextField 
                required
                onChange={handleChange}
                id="khProgramOutcome"
                name="khProgramOutcome"
                label="Khmer Program Outcome"
                multiline
                placeholder="Khmer Program Outcome"
                error={Boolean(errors.khProgramOutcome)}
                helperText={errors.khProgramOutcome}
            />
            <FormControl sx={{ m: 3, width: 300 }}>
              <InputLabel id="program-label">Program</InputLabel>
              <Select
                labelId="program-label"
                id="program-select"
                required
                value={selectedProgram}
                onChange={handleProgramChange}
                input={<OutlinedInput label="Program" />}
                MenuProps={MenuProps}
              >
                {programs.map((program) => (
                 <MenuItem
                    key={program.id}
                    value={program.id}
                    style={getStyles(program.enTitle, selectedProgram, theme)}
                 >
                    {program.enTitle}
                 </MenuItem>
                ))}
              </Select>
              
            </FormControl>
            <input
                type="file"
                id="fileUpload"
                accept="image/*"
                style={{ display: 'flex', marginLeft: '1.5rem' }}
                onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files); // Convert FileList to array
                    handleFileUpload(selectedFiles);
                }}
            />
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                htmlFor="fileUpload"
                style={{marginLeft: '1.5rem'}}
            >
                Upload Image
            </Button>
            {uploading && <div style={{marginLeft: '1.5rem'}}>Uploading...</div>}
          </Box>
          <Button 
                onClick={handleSubmit} 
                variant="contained" 
                color="primary" 
                sx={{ marginTop: '2rem', marginLeft: '1.5rem' }}
            >
              Add Course
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

export default AddCourses;
