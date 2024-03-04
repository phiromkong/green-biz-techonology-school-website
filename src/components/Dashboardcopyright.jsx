import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Dashboardcopyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {'2022'}
      {'.'}
    </Typography>
  );
}

export default Dashboardcopyright;
