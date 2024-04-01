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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 350,
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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
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

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

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

    const handleQuillChange = (value, name) => {
      setCourses({ ...courses, [name]: value });
  
      let error = '';
      if (value.trim() === '') { // Check if value is empty
          error = `This field is required.`;
      }
      setErrors(prevErrors => ({
          ...prevErrors,
          [name]: error
      }));
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
        e.preventDefault();
        console.log("clicked");

        // Manually trigger validation for all fields
        const newErrors = {
            enDescription: courses.enDescription.trim() === '' ? 'This field is required' : '',
            enProgramOutcome: courses.enProgramOutcome.trim() === '' ? 'This field is required' : '',
            enProgramOverview: courses.enProgramOverview.trim() === '' ? 'This field is required' : '',
            enTitle: courses.enTitle.trim() === '' ? 'This field is required' : '',
            khDescription: courses.khDescription.trim() === '' ? 'This field is required' : '',
            khProgramOutcome: courses.khProgramOutcome.trim() === '' ? 'This field is required' : '',
            khProgramOverview: courses.khProgramOverview.trim() === '' ? 'This field is required' : '',
            khTitle: courses.khTitle.trim() === '' ? 'This field is required' : '',
            programId: selectedProgram === '' ? 'This field is required' : '',
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
                const courseData = {
                    ...courses,
                    programId: selectedProgram,
                };
                await addDoc(collection(db, "courses"), courseData);
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate('/dashboard/courses');
                }, 1500);
                // Handle success, e.g., navigate to another page or show a success message
            } catch (error) {
                console.error("Error adding document: ", error);
                // Handle error
            }
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
            <ReactQuill
              value={courses.enProgramOverview}
              onChange={(value) => handleQuillChange(value, 'enProgramOverview')}
              placeholder="English Program Overview"
              style={{ marginTop: '2rem', marginLeft: '1.5rem'}}
              modules={{
                  toolbar: [
                      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{'list': 'ordered'}, {'list': 'bullet'}, 
                      {'indent': '-1'}, {'indent': '+1'}],
                      ['clean']
                  ]
              }}
              formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent']}
              theme="snow"
            />
            <ReactQuill
              value={courses.khProgramOverview}
              onChange={(value) => handleQuillChange(value, 'khProgramOverview')}
              placeholder="Khmer Program Overview"
              style={{ marginTop: '2rem', marginLeft: '1.5rem'}}
              modules={{
                  toolbar: [
                      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{'list': 'ordered'}, {'list': 'bullet'}, 
                      {'indent': '-1'}, {'indent': '+1'}],
                      ['clean']
                  ]
              }}
              formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent']}
              theme="snow"
            />
            <ReactQuill
              value={courses.enProgramOutcome}
              onChange={(value) => handleQuillChange(value, 'enProgramOutcome')}
              placeholder="English Program Outcome"
              style={{ marginTop: '2rem', marginLeft: '1.5rem'}}
              modules={{
                  toolbar: [
                      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{'list': 'ordered'}, {'list': 'bullet'}, 
                      {'indent': '-1'}, {'indent': '+1'}],
                      ['clean']
                  ]
              }}
              formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent']}
              theme="snow"
            />
            <ReactQuill
              value={courses.khProgramOutcome}
              onChange={(value) => handleQuillChange(value, 'khProgramOutcome')}
              placeholder="Khmer Program Outcome"
              style={{ marginTop: '2rem', marginLeft: '1.5rem'}}
              modules={{
                  toolbar: [
                      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{'list': 'ordered'}, {'list': 'bullet'}, 
                      {'indent': '-1'}, {'indent': '+1'}],
                      ['clean']
                  ]
              }}
              formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent']}
              theme="snow"
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

            {uploading && <div style={{marginLeft: '1.5rem'}}>Uploading...</div>}
          </Box>
          <Button 
                onClick={handleSubmit} 
                variant="contained" 
                color="primary" 
                sx={{ marginTop: '2rem', marginLeft: '1.5rem', backgroundColor: "#198754" }}
            >
              Add Course
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
                            Course Added successfully
                        </Alert>
                    </Snackbar>
        </Container>
      </Box>
    </ThemeProvider>
 );
}

export default AddCourses;
