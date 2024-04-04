import React, { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, query, where, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
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
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
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
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesCollection = collection(db, "courses");
            const q = query(coursesCollection, where("programId", "==", programId));
            const querySnapshot = await getDocs(q);
            let fetchedCourses = await Promise.all(querySnapshot.docs.map(async (courseDoc) => {
                const courseData = courseDoc.data();
                const programDocRef = doc(db, "program", programId);
                const programDocSnap = await getDoc(programDocRef);
                if (programDocSnap.exists()) {
                    const programDetails = programDocSnap.data();
                    return { ...courseData, id: courseDoc.id, programEnTitle: programDetails.enTitle };
                } else {
                    console.log(`No program found for programId: ${programId}`);
                    return { ...courseData, id: courseDoc.id, programEnTitle: "No program found" };
                }
            }));

            // Filter courses based on search term
            if (searchTerm) {
                fetchedCourses = fetchedCourses.filter(course =>
                    course.enTitle.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setCourses(fetchedCourses);
        };

        fetchCourses();
    }, [programId, searchTerm]);
    

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'enTitle', headerName: 'English Title', width: 200 },
        { field: 'khTitle', headerName: 'Khmer Title', width: 200 },
        { field: 'programEnTitle', headerName: 'Program', width: 200 },
        { field: 'enDescription', headerName: 'English Description', width: 300 },
        { field: 'khDescription', headerName: 'Khmer Description', width: 300 },
        { 
            field: 'enProgramOverview', 
            headerName: 'English Overview', 
            width: 300,
            renderCell: (params) => (
                <div dangerouslySetInnerHTML={{ __html: params.value }} />
            )
        },
        { 
            field: 'khProgramOverview', 
            headerName: 'Khmer Overview', 
            width: 300,
            renderCell: (params) => (
                <div dangerouslySetInnerHTML={{ __html: params.value }} />
            )
        },
        { 
            field: 'enProgramOutcome', 
            headerName: 'English Outcome', 
            width: 300,
            renderCell: (params) => (
                <div dangerouslySetInnerHTML={{ __html: params.value }} />
            )
        },
        { 
            field: 'khProgramOutcome', 
            headerName: 'Khmer Outcome',          
            width: 300,
            renderCell: (params) => (
                <div dangerouslySetInnerHTML={{ __html: params.value }} />
            )
        },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
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
                    <IconButton onClick={() => navigate(`/dashboard/programs/${programId}/edit/${params.row.id}`)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row)}>
                        <DeleteIcon />
                    </IconButton>

                </div>
            ),
        },
    ];
    
    const handleDelete = (course) => {
        setCourseToDelete(course);
        setDeleteDialogOpen(true);
    };

    const handleDeleteCourse = async () => {
        setDeleteDialogOpen(false);
        if (courseToDelete && courseToDelete.id) {
            try {
                // Delete the course document from Firestore only if it belongs to the specified program
                await deleteDoc(doc(db, "courses", courseToDelete.id));
                console.log("Course document deleted from Firestore");
    
                // Delete the course image from Firebase Storage if it exists
                if (courseToDelete.imageURL) {
                    const imageRef = ref(getStorage(), courseToDelete.imageURL);
                    await deleteObject(imageRef);
                    console.log("Course image deleted from Firebase Storage");
                }
    
                // Remove the deleted course from the courses state
                setCourses(courses.filter(course => course.id !== courseToDelete.id));
            } catch (error) {
                console.error("Error deleting course:", error);
            }
        } else {
            console.error("courseToDelete or courseToDelete.id is undefined");
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Dashboardnav open={open} toggleDrawer={() => setOpen(!open)} />
                <Dashboardsidebar open={open} toggleDrawer={() => setOpen(!open)} />
                <Container>
                    <div style={{ marginTop: '80px' }}>
                        <Stack direction="row" spacing={1}>
                            <Button component={Link} to={`/dashboard/programs/${programId}/addCourse`} variant="contained" startIcon={<AddIcon />}>
                                New Course
                            </Button>
                            <Paper
                                component="form"
                                sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search Courses"
                                    inputProps={{ "aria-label": "search courses" }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </Stack>
                    </div>
                    <div style={{ height: 600, width: '100%', marginTop: '2rem' }}>
                        <DataGrid
                            rows={courses}
                            columns={columns}
                            pageSize={5}
                            getRowHeight={() => 'auto'}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </div>
                    <Stack direction="row" spacing={1} sx={{marginTop: '2rem'}}>
                        <Button component={Link} to={`/dashboard/programs/`} variant="contained" sx={{ backgroundColor:'#088A5B'}}>
                            Back
                        </Button>
                </Stack>
                </Container>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
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
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}

export default ProgramCourses;
