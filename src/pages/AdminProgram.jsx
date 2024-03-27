import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { db } from '../firebase';
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
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const defaultTheme = createTheme();

function AdminProgram() {
    const navigate = useNavigate();
    const [programs, setPrograms] = useState([]);
    const [open, setOpen] = React.useState(true);
    const [deleteProgramId, setDeleteProgramId] = useState(null); // State for delete confirmation
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to control dialog visibility
    const [searchTerm, setSearchTerm] = useState("");

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const fetchPrograms = async () => {
            const programsCollection = collection(db, "program");
            let queryRef = query(programsCollection, orderBy("enTitle"));

            // If there's a search term, filter programs by title
            if (searchTerm) {
                queryRef = query(programsCollection, where("enTitle", ">=", searchTerm), where("enTitle", "<=", searchTerm + "\uf8ff"), orderBy("enTitle"));
            }

            const snapshot = await getDocs(queryRef);
            const fetchedPrograms = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setPrograms(fetchedPrograms);
        };

        fetchPrograms();
    }, [searchTerm]); 

    const handleDelete = async (programId) => {
        // Find the program to delete in the programs state
        const programToDelete = programs.find(program => program.id === programId);
        if (programToDelete && programToDelete.image) {
            // Create a reference to the file in Firebase Storage
            const imageRef = ref(getStorage(),  programToDelete.image);
    
            // Delete the file from Firebase Storage
            await deleteObject(imageRef).then(() => {
                console.log("Program's picture deleted from Firebase Storage");
            }).catch((error) => {
                console.error("Error deleting program's picture from Firebase Storage:", error);
            });
        }
    
        // Delete the document from Firestore
        await deleteDoc(doc(db, "program", programId));
        console.log("Program document deleted from Firestore");
    
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
                    <div style={{ marginTop: '80px'}}>
                        <Stack direction="row" spacing={1}>
                            <Button component={Link} to="/dashboard/programs/add" variant="contained" startIcon={<AddIcon />}>
                                New Program
                            </Button>
                            <Paper
                                component="form"
                                sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search Programs"
                                    inputProps={{ "aria-label": "search programs" }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
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
                                        <Button variant="contained" size="small" sx={{backgroundColor: "#198754"}} onClick={() => navigate(`/dashboard/programs/edit/${program.id}`)}>Edit</Button>
                                        <Button variant="contained" size="small" sx={{backgroundColor: '#bb2124'}} onClick={() => {
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

export default AdminProgram;
