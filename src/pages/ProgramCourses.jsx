import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const defaultTheme = createTheme();

function ProgramCourses() {
    const navigate = useNavigate();
    const { programId } = useParams();
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = React.useState(true);
    const [deleteCourseId, setDeleteCourseId] = useState(null); // State for course ID to be deleted
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to control dialog visibility

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesCollection = collection(db, "courses");
            const q = query(coursesCollection, where("programId", "==", programId));
            const querySnapshot = await getDocs(q);
            const coursesList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setCourses(coursesList);
        };

        fetchCourses();
    }, [programId]);

    const handleDelete = async (courseId) => {
        await deleteDoc(doc(db, "courses", courseId));
        setCourses(courses.filter(course => course.id !== courseId));
        setDeleteCourseId(null);
    };

    const handleDeleteConfirm = async () => {
        if (deleteCourseId) {
            await handleDelete(deleteCourseId);
            setDeleteCourseId(null);
            setDeleteDialogOpen(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteCourseId(null);
        setDeleteDialogOpen(false);
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
                            <Button component={Link} to={`/dashboard/programs/${programId}/addCourse`} variant="contained" startIcon={<AddIcon />}>
                                New Course
                            </Button>
                            <Button component={Link} to={`/dashboard/programs/${programId}/addImage`} variant="contained" startIcon={<AddIcon />}>
                                New Gallery Image
                            </Button>
                        </Stack>
                    </div>
                    <Grid container spacing={2} sx={{ marginTop: '5rem' }}>
                        {courses.map(course => (
                            <Grid item xs={12} sm={6} md={4} key={course.id}>
                                <Card sx={{ margin: 2 }}>
                                    <CardMedia
                                        component="img"
                                        alt={course.enTitle}
                                        height="400px"
                                        image={course.imageURL} // Assuming imageURL is the field name for the image
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {course.enTitle}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {course.enDescription}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => navigate(`/dashboard/programs/${programId}/edit/${course.id}`)}>Edit</Button>
                                        <Button size="small" onClick={() => {
                                            setDeleteCourseId(course.id);
                                            setDeleteDialogOpen(true);
                                        }}>Delete</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Button 
                    onClick={() => navigate(-1)}
                    sx={{ marginTop: '2rem', marginLeft: '1rem' }}
                    variant="contained"
                    color="primary"
                    >
                        Back
                    </Button>
                    <Dialog
                        open={deleteDialogOpen}
                        onClose={handleDeleteCancel}
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
                            <Button onClick={handleDeleteCancel} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default ProgramCourses;
