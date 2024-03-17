import React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';



const defaultTheme = createTheme();
function AdminAccount() {
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
        <div style={{ marginTop: '80px', marginLeft: '-50px' }}>
                        <Stack direction="row" spacing={1}>
                            <Button component={Link} to="/dashboard/account/add" variant="contained" startIcon={<AddIcon />}>
                                New Admin
                            </Button>
                        </Stack>
                    </div>
        </Container>
      </Box>
    </ThemeProvider>
  );  
}

export default AdminAccount;
