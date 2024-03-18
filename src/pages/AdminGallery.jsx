import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';

const defaultTheme = createTheme();
function AdminGallery() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Dashboardnav open={open} toggleDrawer={toggleDrawer} />
        <Dashboardsidebar open={open} toggleDrawer={toggleDrawer} />
        <Container>
        <div style={{marginTop: '80px', marginLeft: '-50px'}}> 
            <Stack direction="row" spacing={1}>
                <Button component={Link} to="/dashboard/partners/add" variant="contained" startIcon={<AddIcon />}>
                    New Image
                </Button>
            </Stack>
            
        </div>
        </Container>
      </Box>
    </ThemeProvider>
  );  
}

export default AdminGallery;
