import React from 'react';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import Box from '@mui/material/Box';


function AdminDashboard() {


  return (
    <>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Dashboardnav />
            <Dashboardsidebar />
        </Box>
    </>
    
  );
}
export default AdminDashboard;