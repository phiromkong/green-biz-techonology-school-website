import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';

const defaultTheme = createTheme();

const AdminProfile = () => {
    const [open, setOpen] = useState(true); // Correctly initialized useState

    const toggleDrawer = () => {
        setOpen(!open); // Toggle the sidebar state
    };

    // Correctly placed return statement
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Dashboardnav open={open} toggleDrawer={toggleDrawer} />
                <Dashboardsidebar open={open} toggleDrawer={toggleDrawer} />
                <Container>
                {/* Your main content goes here */}
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default AdminProfile;
