import React, { useState, useEffect } from 'react';
import { collection, doc, getDocs, query, orderBy, limit, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Pagination from '../components/Pagination';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import {  useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const defaultTheme = createTheme();
function AdminCourses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Number of items per page
    const [open, setOpen] = React.useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);



    const toggleDrawer = () => {
    setOpen(!open);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
   };   

  useEffect(() => {
    const fetchCourses = async () => {
       const coursesCollection = collection(db, "courses");
       const firstQuery = query(coursesCollection, orderBy("enTitle"), limit(itemsPerPage));
       const firstSnapshot = await getDocs(firstQuery);
       const firstCourses = firstSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
       setCourses(firstCourses);
    };
   
    fetchCourses();
   }, [currentPage]);

   const handleDeleteCourse = async () => {
    if (courseToDelete) {
       await deleteDoc(doc(db, "courses", courseToDelete.id));
       setCourses(courses.filter(course => course.id !== courseToDelete.id));
       setDeleteDialogOpen(false);
    }
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
                    <Button component={Link} to="/dashboard/courses/add" variant="contained" startIcon={<AddIcon />}>
                        New Courses
                    </Button>
                </Stack>
            </div>
            <Grid container spacing={2} sx={{ marginTop: '5rem' }}>
                {courses.map(course => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <Card sx={{ maxWidth: 500 }}>
                            <CardMedia
                                component="img"
                                alt={course.enTitle}
                                height="400px"
                                image={course.imageURL}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {course.enTitle}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate(`/dashboard/courses/edit/${course.id}`)} >Edit</Button>
                                <Button size="small" onClick={() => {
                                    setCourseToDelete(course);
                                    setDeleteDialogOpen(true);
                                }}>Delete</Button>
                            </CardActions>
                        </Card>
                </Grid>
                ))}
            </Grid>
            <div className="pagination-container">
                <Pagination
                postsPerPage={itemsPerPage}
                totalPosts={courses.length}
                paginate={handlePageChange}
                currentPage={currentPage}
                />
            </div>
        </Container>
        <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this course?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                Cancel
                </Button>
                <Button onClick={handleDeleteCourse} color="primary" autoFocus>
                Confirm
                </Button>
            </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );  
}

export default AdminCourses;
