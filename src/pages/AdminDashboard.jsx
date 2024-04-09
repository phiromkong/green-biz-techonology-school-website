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
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { db } from '../firebase'; // Assuming db is initialized elsewhere
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import CollectionsIcon from '@mui/icons-material/Collections';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SchoolIcon from '@mui/icons-material/School';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


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
 const [femaleCount, setFemaleCount] = useState(0);
 const [maleCount, setMaleCount] = useState(0);
 const [loading, setLoading] = useState(true);
 
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

  const fetchData = async () => {
    try {
      const adminsCollectionRef = collection(db, "admins");
      const newsCollectionRef = collection(db, "news");
      const teamCollectionRef = collection(db, "team");
      const galleryCollectionRef = collection(db, "gallery");
      const programsCollectionRef = collection(db, "program");
      const coursesCollectionRef = collection(db, "courses");
      const partnersCollectionRef = collection(db, "partners");

      const [
        adminsSnapshot,
        newsSnapshot,
        teamSnapshot,
        gallerySnapshot,
        programsSnapshot,
        coursesSnapshot,
        partnersSnapshot
      ] = await Promise.all([
        getDocs(adminsCollectionRef),
        getDocs(newsCollectionRef),
        getDocs(teamCollectionRef),
        getDocs(galleryCollectionRef),
        getDocs(programsCollectionRef),
        getDocs(coursesCollectionRef),
        getDocs(partnersCollectionRef)
      ]);

      setAdminsCount(adminsSnapshot.size);
      setNewsCount(newsSnapshot.size);
      setTeamCount(teamSnapshot.size);
      setGalleryCount(gallerySnapshot.size);
      setProgramCount(programsSnapshot.size);
      setCourseCount(coursesSnapshot.size);
      setPartnerCount(partnersSnapshot.size);

      const femaleQuery = query(teamCollectionRef, where("sex", "==", "Female"));
      const maleQuery = query(teamCollectionRef, where("sex", "==", "Male"));
      const [femaleSnapshot, maleSnapshot] = await Promise.all([
        getDocs(femaleQuery),
        getDocs(maleQuery)
      ]);

      setFemaleCount(femaleSnapshot.size);
      setMaleCount(maleSnapshot.size);

      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  fetchData();

  // Cleanup subscription on component unmount
  return () => unsubscribe();
}, []); // Empty dependency array means this effect runs once on mount

 const toggleDrawer = () => {
    setOpen(!open);
 };

 if (loading) {
  return (
    <div>
      <Backdrop
        sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

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
            
            <Card sx={{ maxWidth: 400, position: 'relative' }}>
            <ManageAccountsIcon sx={{ position: 'absolute', top: 0, left: 180, width: '30%', height: 'auto' }} />
            <Link to="/dashboard/account">
            <CardActionArea sx={{ color: '#088A5B' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: 'black' }}>
                  Admin Account
                </Typography>
                <Typography gutterBottom variant="h4" component="div" sx={{ color: 'red' }}>
                  {adminsCount}
                </Typography>
              </CardContent>
            </CardActionArea>
            </Link>
          </Card>
            <Card sx={{ maxWidth: 400, position: 'relative' }}>
            <ArticleIcon sx={{ position: 'absolute', top: 0, left: 180, width: '30%', height: 'auto' }} />
              <Link to="/dashboard/news">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      News 
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div" sx={{color:'red'}}>
                    {newsCount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400, position: 'relative' }}>
            <GroupIcon sx={{ position: 'absolute', top: 0, left: 180, width: '30%', height: 'auto' }} />
              <Link to="/dashboard/our-team">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      Our Team
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div" sx={{color:'red'}}>
                    {teamCount}
                    <Typography variant="h5" component="div" sx={{color:'red'}}>
                    Females: {femaleCount}
                    </Typography>
                    <Typography variant="h5" component="div" sx={{color:'red'}}>
                    Males: {maleCount}
                    </Typography>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400, position: 'relative' }}>
            <CollectionsIcon sx={{ position: 'absolute', top: 0, left: 180, width: '30%', height: 'auto' }} />
              <Link to="/dashboard/gallery">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      Gallery
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div" sx={{color:'red'}}>
                    {galleryCount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400, position: 'relative' }}>
            <SchoolIcon sx={{ position: 'absolute', top: 0, left: 180, width: '30%', height: 'auto' }} />
              <Link to="/dashboard/programs">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      Program
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div" sx={{color:'red'}}>
                    {programCount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400, position: 'relative' }}>
            <SlowMotionVideoIcon sx={{ position: 'absolute', top: 0, left: 180, width: '30%', height: 'auto' }} />
              <Link to="/dashboard/courses">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      Courses
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div" sx={{color:'red'}}>
                    {courseCount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{ maxWidth: 400, position: 'relative'}}>
            <HandshakeIcon sx={{ position: 'absolute', top: 0, left: 180, width: '30%', height: 'auto' }} />
              <Link to="/dashboard/partners">
                <CardActionArea sx={{ color: '#088A5B'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                      Partners
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div" sx={{color:'red'}}>
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
