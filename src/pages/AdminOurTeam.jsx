import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import ImgMediaCard from '../components/TeamCard'; 
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

const defaultTheme = createTheme();
const AdminOurTeam = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteMemberId, setDeleteMemberId] = useState(null);
 const [open, setOpen] = React.useState(true);
 const toggleDrawer = () => {
    setOpen(!open);
 };
 const navigate = useNavigate();
 const [teamMembers, setTeamMembers] = useState([]);
 const [loading, setLoading] = useState(true);

 const fetchTeamMembers = async () => {
    const teamCollection = collection(db, "team");
    const teamSnapshot = await getDocs(teamCollection);
    const teamList = teamSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setTeamMembers(teamList);
    setLoading(false);
 };

 useEffect(() => {
    fetchTeamMembers();
 }, []);

 const handleEdit = (memberId) => {
    console.log("Editing member with ID:", memberId);
    navigate(`/dashboard/our-team/edit/${memberId}`);
 };

 const handleDelete = async (memberId) => {
    console.log("Deleting member with ID:", memberId);
    try {
        await deleteDoc(doc(db, "team", memberId)); // Delete the document
        console.log("Member deleted successfully");
        // Refetch the team members to update the UI
        fetchTeamMembers();
    } catch (error) {
        console.error("Error deleting member:", error);
    }
 };

 const handleDeleteConfirm = async () => {
  if (deleteMemberId) {
     await handleDelete(deleteMemberId);
     setDeleteMemberId(null); // Clear the deleteMemberId state
  }
 };
    

  const handleDeleteCancel = () => {
    setDeleteMemberId(null);
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
            <Button component={Link} to="/dashboard/our-team/add" variant="contained" startIcon={<AddIcon />}>
                New Member
            </Button>
          </Stack>
        </div>
          <Grid container spacing={2} sx={{marginTop: '5rem'}}>
            {!loading && teamMembers.map(member => (
              <Grid item xs={12} sm={6} md={4} key={member.id}>
                <ImgMediaCard
                 member={member}
                 onEdit={handleEdit}
                 onDelete={() => setDeleteMemberId(member.id)} // Pass the member ID to handleDelete
                />
              </Grid>
            ))}
          </Grid>
          <Dialog
          open={deleteDialogOpen || deleteMemberId !== null}
          onClose={handleDeleteCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this news post?
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
};

export default AdminOurTeam;
