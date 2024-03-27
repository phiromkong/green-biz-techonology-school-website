import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { db } from '../firebase'; // Ensure you have this configured correctly
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const defaultTheme = createTheme();

function AdminPartners() {
    const navigate = useNavigate();
    const [partners, setPartners] = useState([]);
    const [open, setOpen] = React.useState(true);
    const [deletePartnerId, setDeletePartnerId] = useState(null); // State for delete confirmation
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to control dialog visibility
    const [searchTerm, setSearchTerm] = useState(""); // State for search term


    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const fetchPartners = async () => {
            const partnersCollection = collection(db, "partners");
            const partnersSnapshot = await getDocs(partnersCollection);
            let partnersList = partnersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
    
            // If there's a search term, filter partners by enName
            if (searchTerm) {
                partnersList = partnersList.filter(partner =>
                    partner.enName.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
    
            setPartners(partnersList);
        };
    
        fetchPartners();
    }, [searchTerm]); // Add searchTerm to the dependency array
    
    

const handleDelete = async (partnerId) => {
    // Find the partner to delete in the partners state
    const partnerToDelete = partners.find(partner => partner.id === partnerId);
    if (partnerToDelete && partnerToDelete.image) {
        // Create a reference to the file in Firebase Storage
        const imageRef = ref(getStorage(), partnerToDelete.image);

        // Delete the file from Firebase Storage
        await deleteObject(imageRef).then(() => {
            console.log("Partner's picture deleted from Firebase Storage");
        }).catch((error) => {
            console.error("Error deleting partner's picture from Firebase Storage:", error);
        });
    }

    // Delete the document from Firestore
    await deleteDoc(doc(db, "partners", partnerId));
    console.log("Partner document deleted from Firestore");

    // Remove the deleted partner from the partners state
    setPartners(partners.filter(partner => partner.id !== partnerId));
    // Clear the deletePartnerId state
    setDeletePartnerId(null);
};


    const handleEdit = (partnerId) => {
        console.log("Editing member with ID:", partnerId);
        navigate(`/dashboard/partners/edit/${partnerId}`);
    };

    const handleDeleteConfirm = async () => {
        if (deletePartnerId) {
            await handleDelete(deletePartnerId);
            setDeletePartnerId(null); // Clear the deletePartnerId state
            setDeleteDialogOpen(false); // Close the dialog
        }
    };    

    const handleDeleteCancel = () => {
        setDeletePartnerId(null);
        setDeleteDialogOpen(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Dashboardnav open={open} toggleDrawer={toggleDrawer} />
                <Dashboardsidebar open={open} toggleDrawer={toggleDrawer} />
                <Container>
                <div style={{marginTop: '80px'}}> 
                <Stack direction="row" spacing={1}>
                    <Button component={Link} to="/dashboard/partners/add" variant="contained" startIcon={<AddIcon />}>
                        New Partner
                    </Button>
                    <Paper
                        component="form"
                        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1, }}
                            placeholder="Search Partners"
                            inputProps={{ "aria-label": "search partners" }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Stack>
                </div>
                <Grid container spacing={2} sx={{marginTop: '5rem'}}>
                    {partners.map(partner => (
                        <Grid item xs={12} sm={6} md={4} key={partner.id}>
                        <Card sx={{ maxWidth: 500 }}>
                            <CardMedia
                                component="img"
                                alt={partner.name}
                                height="auto"
                                image={partner.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{fontSize: '1rem'}}>
                                    {partner.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" size="small" sx={{backgroundColor: "#198754"}} onClick={() => handleEdit(partner.id)}>Edit</Button>
                                <Button variant="contained" size="small" sx={{backgroundColor: '#bb2124'}} onClick={() => {
                                    setDeletePartnerId(partner.id);
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
                            Are you sure you want to delete this partner?
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

export default AdminPartners;
