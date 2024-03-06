import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';

// Create a default theme
const defaultTheme = createTheme();

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const [pages, setPages] = useState([
    { title: 'Page 1', createdAt: '2024-01-24', status: 'Published', author: 'Admin' },
    { title: 'Page 2', createdAt: '2024-01-25', status: 'Draft', author: 'User' },
    // Add more sample page objects as needed
  ]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* Wrap your components with ThemeProvider */}
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Dashboardnav open={open} toggleDrawer={toggleDrawer} />
        <Dashboardsidebar open={open} toggleDrawer={toggleDrawer} />
        <Container>
         
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
