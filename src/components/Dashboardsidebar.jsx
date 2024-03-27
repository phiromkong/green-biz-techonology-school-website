import React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import CollectionsIcon from '@mui/icons-material/Collections';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
 ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      height: '100vh',
      backgroundColor: '#088A5B',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
 }),
);

const CustomListItem = ({ to, primary, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ListItem
      button
      component={Link}
      to={to}
      sx={{
        color: isActive ? '#F0C52D' : 'white',
        fontWeight: isActive ? 'bold' : 'normal',
        '&:hover': {
          color: '#8a0f08',
          fontWeight: 'bold',
        },
      }}
    >
      <ListItemIcon sx={{color: 'white'}}>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
};


const Dashboardsidebar = ({ open, toggleDrawer }) => {
 const [openList, setOpenList] = React.useState(true);

 const handleClick = () => {
    setOpenList(!openList);
 };

 return (
    <div>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon sx={{color: 'white'}} />
          </IconButton>
        </Toolbar>  
        <Divider />
        <List
          sx={{
            marginTop: "1rem",
          }}
        >
          <CustomListItem to="/dashboard" primary="Dashboard" icon={<GridViewSharpIcon />} />
          <CustomListItem to="/dashboard/account" primary="Admin Management" icon={<ManageAccountsIcon />} />
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <GroupsIcon sx={{color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary="About Us" sx={{color: 'white'}} />
            {openList ? <ExpandLess sx={{color: 'white'}} /> : <ExpandMore sx={{color: 'white'}} />}
          </ListItemButton>
          <Collapse in={openList} timeout="auto" unmountOnExit>
            <List disablePadding>
              <CustomListItem
                to="/dashboard/news"
                primary="News"
                icon={<ArticleIcon sx={{color: 'white'}} />}
              />
              <CustomListItem
                to="/dashboard/our-team"
                primary="Our Team"
                icon={<GroupIcon sx={{color: 'white'}} />}
              />
              <CustomListItem
                to="/dashboard/gallery"
                primary="Gallery"
                icon={<CollectionsIcon sx={{color: 'white'}} />}
              />
            </List>
          </Collapse>
          <CustomListItem to="/dashboard/programs" primary="Program" icon={<SchoolIcon />} />
          <CustomListItem to="/dashboard/courses" primary="Courses" icon={<SlowMotionVideoIcon />} />
          <CustomListItem to="/dashboard/partners" primary="Partners" icon={<HandshakeIcon />} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
      </Box>
    </div>
 );
};

export default Dashboardsidebar;
