import React, { useState, useEffect } from 'react';
import { collection, doc, getDocs, deleteDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { db } from '../firebase';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { useNavigate, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const defaultTheme = createTheme();
const options = ['Edit', 'Delete'];

function AdminCourses() {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesCollection = collection(db, "courses");
            const snapshot = await getDocs(coursesCollection);
            const fetchedCourses = await Promise.all(snapshot.docs.map(async (courseDoc) => {
                const courseData = courseDoc.data();
                // Create a reference to the program document using doc()
                const programDocRef = doc(db, "program", courseData.programId);
                const programDocSnap = await getDoc(programDocRef);
                if (programDocSnap.exists()) {
                    const programDetails = programDocSnap.data();
                    return { ...courseData, id: courseDoc.id, programEnTitle: programDetails.enTitle };
                } else {
                    console.log(`No program found for programId: ${courseData.programId}`);
                    return { ...courseData, id: courseDoc.id, programEnTitle: "No program found" };
                }
            }));
            setCourses(fetchedCourses);
        };
        
    
        fetchCourses();
    }, []);

    const handleDelete = (course) => {
        setCourseToDelete(course); 
        setDeleteDialogOpen(true);
    };    

    const handleDeleteCourse = async () => {
        setDeleteDialogOpen(false);
        if (courseToDelete && courseToDelete.id) {
            // Delete the course document from Firestore
            await deleteDoc(doc(db, "courses", courseToDelete.id));
            console.log("Course document deleted from Firestore");
    
            // Delete the course image from Firebase Storage
            if (courseToDelete.imageURL) {
                const imageRef = ref(getStorage(), courseToDelete.imageURL);
                await deleteObject(imageRef).then(() => {
                    console.log("Course image deleted from Firebase Storage");
                }).catch((error) => {
                    console.error("Error deleting course image from Firebase Storage:", error);
                });
            }
    
            // Remove the deleted course from the courses state
            setCourses(courses.filter(course => course.id !== courseToDelete.id));
            setDeleteDialogOpen(false);
        } else {
            console.error("courseToDelete or courseToDelete.id is undefined");
        }
    };
    
    
    

    const handleEditCourse = (courseId) => {
        navigate(`/dashboard/courses/edit/${courseId}`); // Navigate to edit page with course ID
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'enTitle', headerName: 'Title', width: 200 },
        { field: 'programEnTitle', headerName: 'Program', width: 200 },
        { field: 'enDescription', headerName: 'Description', width: 300 },
        { field: 'enProgramOverview', headerName: 'Overview', width: 300 },
        { field: 'enProgramOutcome', headerName: 'Outcome', width: 300 },
        {
            field: 'image',
            headerName: 'Image',
            width: 80,
            renderCell: (params) => (
                <img src={params.row.imageURL} alt={params.row.enTitle} style={{ width: '100%', height: 'auto' }} />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => handleEditCourse(params.row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];
    

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Dashboardnav open={open} toggleDrawer={() => setOpen(!open)} />
                <Dashboardsidebar open={open} toggleDrawer={() => setOpen(!open)}  />
                <Container sx={{marginTop: '5rem'}}>
                    <Stack sx={{marginBottom: '2rem'}} direction="row" spacing={1}>
                        <Button component={Link} to="/dashboard/courses/add" variant="contained" startIcon={<AddIcon />}>
                            New Courses
                        </Button>
                    </Stack>
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={courses}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
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
