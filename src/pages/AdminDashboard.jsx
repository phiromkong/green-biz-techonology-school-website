import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { db } from '../firebase'; // Assuming db is initialized elsewhere

// Create a default theme
const defaultTheme = createTheme();

const AdminDashboard = () => {
 const [open, setOpen] = useState(true);
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [adminsCount, setAdminsCount] = useState(0);
 const [newsCount, setNewsCount] = useState(0);
 const [teamCount, setTeamCount] = useState(0);
 const [galleryCount, setGalleryCount] = useState(0);
 const [programCount, setProgramCount] = useState(0);
 const [courseCount, setCourseCount] = useState(0);
 const [partnerCount, setPartnerCount] = useState(0);
 
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, fetch the profile picture and user details
      const fetchProfilePictureAndDetails = async () => {
        try {
          const docRef = doc(db, "admins", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const adminData = docSnap.data();
            // Set user details
            setFirstName(adminData.firstName);
            setLastName(adminData.lastName);
          }
        } catch (error) {
          console.error("Error fetching admin profile picture and details:", error);
        }
      };

      fetchProfilePictureAndDetails();
    } else {
      // User is signed out, handle accordingly
      setFirstName('');
      setLastName('');
    }
  });

  // Define fetchAdminsCount function inside useEffect
  const fetchAdminsCount = async () => {
    const adminsCollectionRef = collection(db, "admins");
    const snapshot = await getDocs(adminsCollectionRef);
    setAdminsCount(snapshot.size); // Update the state with the count of admins
  };
  const fetchNewsCount = async () => {
    const newsCollectionRef = collection(db, "news");
    const snapshot = await getDocs(newsCollectionRef);
    setNewsCount(snapshot.size); // Update the state with the count of admins
  };
  const fetchTeamsCount = async () => {
    const teamCollectionRef = collection(db, "team");
    const snapshot = await getDocs(teamCollectionRef);
    setTeamCount(snapshot.size); // Update the state with the count of admins
  };
  const fetchGalleryCount = async () => {
    const galleryCollectionRef = collection(db, "gallery");
    const snapshot = await getDocs(galleryCollectionRef);
    setGalleryCount(snapshot.size); // Update the state with the count of admins
  };
  const fetchProgramsCount = async () => {
    const programsCollectionRef = collection(db, "program");
    const snapshot = await getDocs(programsCollectionRef);
    setProgramCount(snapshot.size); // Update the state with the count of admins
  };
  const fetchCoursesCount = async () => {
    const coursesCollectionRef = collection(db, "courses");
    const snapshot = await getDocs(coursesCollectionRef);
    setCourseCount(snapshot.size); // Update the state with the count of admins
  };
  const fetchPartnersCount = async () => {
    const partnersCollectionRef = collection(db, "partners");
    const snapshot = await getDocs(partnersCollectionRef);
    setPartnerCount(snapshot.size); // Update the state with the count of admins
  };

  // Call fetchAdminsCount function
  fetchAdminsCount();
  fetchNewsCount();
  fetchTeamsCount();
  fetchGalleryCount();
  fetchProgramsCount();
  fetchCoursesCount();
  fetchPartnersCount();

  // Cleanup subscription on component unmount
  return () => unsubscribe();
}, []); // Empty dependency array means this effect runs once on mount

 const toggleDrawer = () => {
    setOpen(!open);
 };

 return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Dashboardnav open={open} toggleDrawer={toggleDrawer} />
        <Dashboardsidebar open={open} toggleDrawer={toggleDrawer} />
        <Container style={{marginTop: '5rem'}}>
          <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold'}}>
            Welcome back, {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant="h5" component="h4" sx={{ marginTop: '1rem'}}>
            Dashboard
          </Typography>
          <Box
            sx={{
              width: '100%',
              marginTop: "2rem",
              maxWidth: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 5,
            }}
           >
            
            <Card sx={{ maxWidth: 400 }}>
              <Link to="/dashboard/account">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      Admin Account
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{color:'red'}}>
                    {adminsCount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400 }}>
              <Link to="/dashboard/news">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      News 
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{color:'red'}}>
                    {newsCount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400 }}>
              <Link to="/dashboard/our-team">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      Our Team
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{color:'red'}}>
                    {teamCount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400 }}>
              <Link to="/dashboard/gallery">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      Gallery
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{color:'red'}}>
                    {galleryCount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400 }}>
              <Link to="/dashboard/programs">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      Program
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{color:'red'}}>
                    {programCount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400 }}>
              <Link to="/dashboard/courses">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      Courses
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{color:'red'}}>
                    {courseCount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400}}>
              <Link to="/dashboard/partners">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      Partners
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{color:'red'}}>
                    {partnerCount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Box>
          <Typography variant="h5" component="h4" sx={{ marginTop: '2rem'}}>
            Manage Content
          </Typography>
          <Box
            sx={{
              width: '100%',
              marginTop: "2rem",
              maxWidth: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 5,
            }}
           >
            
            <Card sx={{ maxWidth: 400, backgroundColor: '#2d34d2'}}>
              <Link to="/dashboard/account/add">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                  <Typography variant="h5"  sx={{color:'white'}}>
                      Add Admin
                  </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400, backgroundColor: '#90a659' }}>
              <Link to="/dashboard/news/add">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography variant="h5" component="div" sx={{color:'white'}}>
                      Add News
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400, backgroundColor: '#b44b4c' }}>
              <Link to="/dashboard/our-team/add">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'white'}}>
                      Add Team Member
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400, backgroundColor: '#6b53ac' }}>
              <Link to="/dashboard/gallery/add">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'white'}}>
                      Add Gallery
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400, backgroundColor: '#ae8b51' }}>
              <Link to="/dashboard/programs/add">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'white'}}>
                      Add Program
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400, backgroundColor: '#d12e57' }}>
              <Link to="/dashboard/courses/add">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'white'}}>
                      Add Course
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400, backgroundColor: '#9d627b' }}>
              <Link to="/dashboard/partners/add">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'white'}}>
                      Add Partner
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
 );
};

export default AdminDashboard;
