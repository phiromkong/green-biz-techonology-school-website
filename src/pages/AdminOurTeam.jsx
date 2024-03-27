import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const defaultTheme = createTheme();

const AdminOurTeam = () => {
 const navigate = useNavigate();
 const [teamMembers, setTeamMembers] = useState([]);
 const [open, setOpen] = React.useState(true);
 const [loading, setLoading] = useState(true);
 const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
 const [deleteMemberId, setDeleteMemberId] = useState(null);
 const [searchTerm, setSearchTerm] = useState(""); // State for search term


 const toggleDrawer = () => {
  setOpen(!open);
};
useEffect(() => {
  const fetchTeamMembers = async () => {
      const teamCollection = collection(db, "team");
      const teamSnapshot = await getDocs(teamCollection);
      let teamList = teamSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));

      // If there's a search term, filter team members by enFirstName, enLastName, or enPosition
      if (searchTerm) {
          teamList = teamList.filter(member =>
              member.enFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              member.enLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              member.enPosition.toLowerCase().includes(searchTerm.toLowerCase())
          );
      }

      setTeamMembers(teamList);
      setLoading(false);
  };

  fetchTeamMembers();
}, [searchTerm]); // Add searchTerm to the dependency array


 const handleDelete = async (memberId) => {
  // Find the team member to delete in the teamMembers state
  const memberToDelete = teamMembers.find(member => member.id === memberId);
  if (memberToDelete && memberToDelete.image) {
      // Create a reference to the file in Firebase Storage
      const imageRef = ref(getStorage(), memberToDelete.image);

      // Delete the file from Firebase Storage
      await deleteObject(imageRef).then(() => {
          console.log("Team member image deleted from Firebase Storage");
      }).catch((error) => {
          console.error("Error deleting team member image from Firebase Storage:", error);
      });
  }

  // Delete the document from Firestore
  await deleteDoc(doc(db, "team", memberId));
  console.log('Deleted team member with ID:', memberId);

  // Filter the teamMembers array to remove the deleted member from the UI using the member index
  const updatedTeamMembers = teamMembers.filter((member) => member.id !== memberId);
  setTeamMembers(updatedTeamMembers);
  setDeleteMemberId(null);
};


 const handleDeleteConfirm = () => {
    if (deleteMemberId) {
      handleDelete(deleteMemberId);
      setDeleteMemberId(null);
      setDeleteDialogOpen(false);
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
          <Stack direction="row" spacing={1} sx={{ marginTop: '80px' }}>
            <Button component={Link} to="/dashboard/our-team/add" variant="contained" startIcon={<AddIcon />}>
              New Member
            </Button>
            <Paper
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
            >
              <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Team Members"
                  inputProps={{ "aria-label": "search team members" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                  <SearchIcon />
              </IconButton>
            </Paper>
          </Stack>
          <Grid container spacing={2} sx={{ marginTop: '5rem' }}>
            {!loading && teamMembers.map(member => (
              <Grid item xs={12} sm={6} md={4} key={member.id}>
                <Card sx={{ margin: 2 }}>
                 <CardMedia
                    component="img"
                    alt={member.name}
                    height="400px"
                    image={member.image} // Assuming imageURL is the field name for the image
                 />
                 <CardContent>
                    <Typography variant="h5" component="div" sx={{fontSize: '1rem'}}>
                      {`${member.enFirstName} ${member.enLastName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{fontSize: '0.7rem'}}>
                      {member.enPosition}
                    </Typography>
                 </CardContent>
                 <CardActions>
                    <Button variant="contained" size="small" sx={{backgroundColor: "#198754"}} onClick={() => navigate(`/dashboard/our-team/edit/${member.id}`)}>Edit</Button>
                    <Button variant="contained" size="small" sx={{backgroundColor: '#bb2124'}} onClick={() => {
                      setDeleteMemberId(member.id);
                      setDeleteDialogOpen(true);
                    }}>Delete</Button>
                 </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this team member?
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
