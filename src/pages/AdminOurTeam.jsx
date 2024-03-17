import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
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

const defaultTheme = createTheme();

const AdminOurTeam = () => {
 const navigate = useNavigate();
 const [teamMembers, setTeamMembers] = useState([]);
 const [open, setOpen] = React.useState(true);
 const [loading, setLoading] = useState(true);
 const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
 const [deleteMemberId, setDeleteMemberId] = useState(null);


 const toggleDrawer = () => {
  setOpen(!open);
};
 useEffect(() => {
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

    fetchTeamMembers();
 }, []);

 const handleDelete = async (memberId) => {
    await deleteDoc(doc(db, "team", memberId));
    setTeamMembers(teamMembers.filter(member => member.id !== memberId));
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
          <Stack direction="row" spacing={1} sx={{ marginTop: '80px', marginLeft: '-50px' }}>
            <Button component={Link} to="/dashboard/our-team/add" variant="contained" startIcon={<AddIcon />}>
              New Member
            </Button>
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
                    <Typography variant="h5" component="div">
                      {`${member.enFirstName} ${member.enLastName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.enPosition}
                    </Typography>
                 </CardContent>
                 <CardActions>
                    <Button size="small" onClick={() => navigate(`/dashboard/our-team/edit/${member.id}`)}>Edit</Button>
                    <Button size="small" onClick={() => {
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
