import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth } from '../firebase';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;
const settings = [
  { name: 'Profile', path: '/dashboard/profile' },
  { name: 'Account', path: '/dashboard/account' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Logout', path: '/logout' },
 ];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CustomAppBar = ({ open, toggleDrawer }) => {
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
    <AppBar position="absolute" open={open}>
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <div> {/* Separate div for IconButton and Menu */}
          <IconButton color="inherit" onClick={handleOpenUserMenu}>
            <Avatar alt="Profile" src={profilePicURL || "/static/images/avatar/default.jpg"} />
          </IconButton>
          <Menu
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
                <MenuItem
                  key={setting.name}
                  onClick={() => {
                    if (setting.name === 'Logout') {
                      handleLogout();
                    } else {
                      navigate(setting.path);
                    }
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );  
}

export default CustomAppBar;
