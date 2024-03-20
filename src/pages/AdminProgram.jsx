import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you have this configured correctly
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { useNavigate, Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const defaultTheme = createTheme();

function AdminCourses() {
    const navigate = useNavigate();
    const [programs, setPrograms] = useState([]);
    const [open, setOpen] = React.useState(true);
    const [deleteProgramId, setDeleteProgramId] = useState(null); // State for delete confirmation
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to control dialog visibility

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const fetchPrograms = async () => {
            const programsCollection = collection(db, "program"); // Adjust the collection name as needed
            const programsSnapshot = await getDocs(programsCollection);
            const programsList = programsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setPrograms(programsList);
        };

        fetchPrograms();
    }, []);

    const handleDelete = async (programId) => {
        // Fetch all courses associated with the program
        const coursesCollection = collection(db, "courses"); // Adjust the collection name as needed
        const querySnapshot = await getDocs(query(coursesCollection, where("programId", "==", programId)));
    
        // Delete each course associated with the program
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
    
        // Now delete the program
        await deleteDoc(doc(db, "program", programId));
    
        // Update the local state to reflect the deletion
        setPrograms(programs.filter(program => program.id !== programId));
        setDeleteProgramId(null); // Clear the deleteProgramId state
    };
    

    const handleDeleteConfirm = async () => {
        if (deleteProgramId) {
            await handleDelete(deleteProgramId);
            setDeleteProgramId(null); // Clear the deleteProgramId state
            setDeleteDialogOpen(false); // Close the dialog
        }
    };

    const handleDeleteCancel = () => {
        setDeleteProgramId(null);
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
                            <Button component={Link} to="/dashboard/programs/add" variant="contained" startIcon={<AddIcon />}>
                                New Program
                            </Button>
                        </Stack>
                    </div>
                    <Grid container spacing={2} sx={{ marginTop: '5rem' }}>
                        {programs.map(program => (
                            <Grid item xs={12} sm={6} md={4} key={program.id}>
                                <Card sx={{ maxWidth: 500 }}>
                                    <CardMedia
                                        onClick={() => navigate(`/dashboard/programs/${program.id}`)}
                                        component="img"
                                        alt={program.enTitle}
                                        height="400px"
                                        image={program.image}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" sx={{fontSize: '1rem'}}>
                                            {program.enTitle}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => navigate(`/dashboard/programs/edit/${program.id}`)}>Edit</Button>
                                        <Button size="small" onClick={() => {
                                            setDeleteProgramId(program.id);
                                            setDeleteDialogOpen(true);
                                        }}>Delete</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this program?
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
            </Box>
        </ThemeProvider>
    );
}

export default AdminCourses;
