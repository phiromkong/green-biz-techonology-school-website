import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
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

const defaultTheme = createTheme();

function AdminPartners() {
    const navigate = useNavigate();
    const [partners, setPartners] = useState([]);
    const [open, setOpen] = React.useState(true);
    const [deletePartnerId, setDeletePartnerId] = useState(null); // State for delete confirmation
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to control dialog visibility

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const fetchPartners = async () => {
            const partnersCollection = collection(db, "partners");
            const partnersSnapshot = await getDocs(partnersCollection);
            const partnersList = partnersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setPartners(partnersList);
        };

        fetchPartners();
    }, []);

    const handleDelete = async (partnerId) => {
        await deleteDoc(doc(db, "partners", partnerId));
        setPartners(partners.filter(partner => partner.id !== partnerId));
        setDeletePartnerId(null); // Clear the deleteMemberId state
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
                <div style={{marginTop: '80px', marginLeft: '-50px'}}> 
                <Stack direction="row" spacing={1}>
                    <Button component={Link} to="/dashboard/partners/add" variant="contained" startIcon={<AddIcon />}>
                        New Partner
                    </Button>
                </Stack>
                </div>
                <Grid container spacing={2} sx={{marginTop: '5rem'}}>
                    {partners.map(partner => (
                        <Grid item xs={12} sm={6} md={4} key={partner.id}>
                        <Card sx={{ maxWidth: 500 }}>
                            <CardMedia
                                component="img"
                                alt={partner.name}
                                height="400px"
                                image={partner.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{fontSize: '1rem'}}>
                                    {partner.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleEdit(partner.id)}>Edit</Button>
                                <Button size="small" onClick={() => {
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
