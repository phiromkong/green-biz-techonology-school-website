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
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdsClickIcon from '@mui/icons-material/AdsClick';

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
        try {
            // Find the program to delete in the programs state
            const programToDelete = programs.find(program => program.id === programId);
    
            // Check if the program to delete exists
            if (!programToDelete) {
                console.error("Program not found");
                return;
            }
    
            // Retrieve courses associated with the program
            const coursesSnapshot = await getDocs(query(collection(db, "courses"), where("programId", "==", programId)));
            const coursesToDelete = coursesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    
            // Delete each associated course
            await Promise.all(coursesToDelete.map(async course => {
                // Delete the document from Firestore
                await deleteDoc(doc(db, "courses", course.id));
                console.log(`Course document ${course.id} deleted from Firestore`);
            }));
    
            // Delete the program document itself
            await deleteDoc(doc(db, "program", programId));
            console.log("Program document deleted from Firestore");
    
            // Update the local state to reflect the deletion
            setPrograms(programs.filter(program => program.id !== programId));
            setDeleteProgramId(null); // Clear the deleteProgramId state
        } catch (error) {
            console.error("Error deleting program and associated courses:", error);
        }
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

    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'enTitle', headerName: 'English Title', width: 350 },
        { field: 'khTitle', headerName: 'Khmer Title', width: 350 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => navigate(`/dashboard/programs/${params.row.id}`)}>
                        <AdsClickIcon />
                    </IconButton>
                    <IconButton onClick={() => navigate(`/dashboard/programs/edit/${params.row.id}`)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => {
                        setDeleteProgramId(params.row.id);
                        setDeleteDialogOpen(true);
                    }}>
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
                    <div style={{ height: 600, width: '100%', marginTop: '2rem' }}>
                        <DataGrid
                            rows={programs}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </div>
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
