import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { auth } from '../firebase';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Dashboardnav() {

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profilePicURL, setProfilePicURL] = useState(null); // State to store profile picture URL

  
  const navigate = useNavigate();

    const logout = () => {
        auth.signOut()
            .then(() => {
                console.log('User logged out');
                navigate('/admin'); // Redirect to the login page after logout
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    const handleLogout = () => {
      // Perform logout logic
      logout(); // Call the logout function from useAuth hook
      // Redirect to the login page
      navigate('/admin'); // Replace '/admin' with your login page route
    };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // Fetch current user data from Firebase Auth
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Retrieve profile picture URL from current user's data
      const photoURL = currentUser.photoURL;
      setProfilePicURL(photoURL);
    }
  }, []);

  return (
    <AppBar position="static" style={{ backgroundColor: '#088A5B' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={'../logo4.png'} alt="Logo" style={{ display: { xs: 'none', md: 'flex' }, width: '20%', marginLeft: '-5rem' }} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile" src={profilePicURL || "/static/images/avatar/default.jpg"} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Dashboardnav;