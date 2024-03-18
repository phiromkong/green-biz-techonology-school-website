import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const defaultTheme = createTheme();

function AddAdmin() {
 const [open, setOpen] = React.useState(true);
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
    role: '',
 });

 const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
 };

 const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      alert('Admin added successfully');
      // Redirect or reset form state as needed
    } catch (error) {
      console.error('Error adding admin:', error);
      alert('Error adding admin');
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
                <TextField label="First Name" name="firstName" value={formState.firstName} onChange={handleChange} />
                <TextField label="Last Name" name="lastName" value={formState.lastName} onChange={handleChange} />
                <FormControl>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={formState.gender} onChange={handleChange}>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
                </FormControl>
                <TextField label="Email" name="email" value={formState.email} onChange={handleChange} />
                <TextField label="Password" name="password" type="password" value={formState.password} onChange={handleChange} />
                <TextField label="Confirm Password" name="confirmPassword" type="password" value={formState.confirmPassword} onChange={handleChange} />
                <FormControl>
                    <InputLabel>Role</InputLabel>
                </FormControl>
                <Button type="submit" variant="contained" startIcon={<AddIcon />}>
                    Add Admin
                </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
 );
}

export default AddAdmin;
