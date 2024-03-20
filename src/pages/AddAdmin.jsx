import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth,  fetchSignInMethodsForEmail  } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this points to your Firebase instance
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

function AddAdmin() {
 const [open, setOpen] = React.useState(false);
 const [profilePicture, setProfilePicture] = useState('');
 const [uploading, setUploading] = useState(false); // State to track file upload status
 const navigate = useNavigate();

 const toggleDrawer = () => {
    setOpen(!open);
 };

 const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: '',
 });

 const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
 });

 const handleChange = (event) => {
  const { name, value } = event.target;
  setFormState({ ...formState, [name]: value });
 
  // Validate fields
  let error = '';
  if (value.trim() === '') {
     error = 'This field is required';
  } else if (name === 'email') {
     // Simple regex for email validation
     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
     if (!emailRegex.test(value)) {
       error = 'Invalid email address';
     }
  } else if (name === 'password') {
     // Example: enforce a minimum length of 8 characters for the password
     if (value.length < 8) {
       error = 'Password must be at least 8 characters';
     }
  }
  setErrors({ ...errors, [name]: error });
 };
 

 const handleImageChange = async (e) => {
 setUploading(true); // Set uploading state to true while files are being uploaded

 const file = e.target.files[0];
 const storageRef = ref(getStorage(), `profilePictures/${file.name}`);
 await uploadBytes(storageRef, file).then(snapshot => {
      return getDownloadURL(snapshot.ref).then(url => {
          setProfilePicture(url);
      });
 });

 setUploading(false); // Set uploading state to false after file is uploaded
};

const handleSubmit = async (event) => {
  event.preventDefault();
  if (uploading) {
    alert('Please wait for the image upload to complete.');
    return;
  }
  if (formState.password !== formState.confirmPassword) {
    setErrors({ 
      ...errors, 
      confirmPassword: 'Passwords do not match', 
      password: 'Passwords do not match' // Set error for both fields
    });
    return;
  }

  const auth = getAuth();
  try {
    // Attempt to create the user
    const userCredential = await createUserWithEmailAndPassword(auth, formState.email, formState.password);
    const user = userCredential.user;

    // After successful registration, add admin data to Firestore
    await setDoc(doc(db, "admins", user.uid), {
      uid: user.uid,
      email: formState.email,
      firstName: formState.firstName,
      lastName: formState.lastName,
      profilePicture: profilePicture,
    });

    // Display success Snackbar and navigate back to /dashboard/account
    setOpen(true); // Open the Snackbar
    setTimeout(() => {
      navigate('/dashboard/account'); // Navigate after a delay
    }, 2000); // Adjust the delay as needed
  } catch (error) {
    console.error('Error adding admin:', error.code);
    let errorMessage = 'Error adding admin';
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'The email address is already in use by another account.';
        setErrors({ ...errors, email: errorMessage });
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address is not valid.';
        setErrors({ ...errors, email: errorMessage });
        break;
      case 'auth/weak-password':
        errorMessage = 'The password is too weak.';
        setErrors({ ...errors, password: errorMessage });
        break;
      // Add more cases as needed
      default:
        errorMessage = error.message;
    }
  }
};


 const handleCancel = () => {
  // Reset form fields to their initial state
    setFormState({
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      password: '',
      confirmPassword: '',
      profilePicture: '',
    });
  // Navigate back to the team dashboard
  navigate('/dashboard/account');
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
                 label="First Name" 
                 name="firstName" 
                 value={formState.firstName} 
                 onChange={handleChange} 
                 error={Boolean(errors.firstName)}
                 helperText={errors.firstName}
                />
                <TextField 
                 required
                 label="Last Name" 
                 name="lastName" 
                 value={formState.lastName} 
                 onChange={handleChange} 
                 error={Boolean(errors.lastName)}
                 helperText={errors.lastName}
                />
                <TextField 
                 required
                 label="Email" 
                 name="email" 
                 value={formState.email} 
                 onChange={handleChange} 
                 error={Boolean(errors.email)}
                 helperText={errors.email}
                />
                <TextField 
                 required
                 label="Password" 
                 name="password" 
                 type="password" 
                 value={formState.password} 
                 onChange={handleChange} 
                 error={Boolean(errors.password)}
                 helperText={errors.password}
                />
                <TextField 
                 required
                 label="Confirm Password" 
                 name="confirmPassword" 
                 type="password" 
                 value={formState.confirmPassword} 
                 onChange={handleChange} 
                 error={Boolean(errors.confirmPassword)}
                 helperText={errors.confirmPassword}
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
                 Upload Profile
              </Button>
              {uploading && <div style={{marginLeft: '1.5rem'}}>Uploading...</div>}
          </Box>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{ marginTop: '2rem', marginLeft: '1.5rem' }}
          >
              Add Admin
          </Button>
          <Button
            onClick={handleCancel}
            variant="contained"
            sx={{ marginTop: '2rem', marginLeft: '1.5rem' }}
            >
            Cancel
          </Button>

        </Container>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message="Admin added successfully"
      />
    </ThemeProvider>
 );
}

export default AddAdmin;
