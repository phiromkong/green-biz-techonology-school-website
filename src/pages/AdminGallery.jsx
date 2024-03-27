import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { db } from '../firebase';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const defaultTheme = createTheme();

function AdminGallery() {
    const [open, setOpen] = React.useState(true);
    const [galleryData, setGalleryData] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchGalleryData = async () => {
            const galleryCollection = collection(db, "gallery");
            const snapshot = await getDocs(galleryCollection);
            const galleryList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setGalleryData(galleryList);
        };

        fetchGalleryData();
    }, []);

    

    const handleEdit = (id) => {
        navigate(`/dashboard/gallery/edit/${id}`);
    };
    

    const handleDelete = (galleryID) => {
      setSelectedImageId(galleryID); 
      setDeleteDialogOpen(true);
     }     

     const handleDeleteConfirmation = async () => {
      setDeleteDialogOpen(false);
      try {
           // Delete the document from Firestore
           await deleteDoc(doc(db, "gallery", selectedImageId)); // Use selectedImageId directly
           console.log("Image document deleted from Firestore");
     
           // Find the image URL in the galleryData state
           const imageToDelete = galleryData.find(image => image.id === selectedImageId);
           if (imageToDelete && imageToDelete.image) {
               // Create a reference to the file in Firebase Storage
               const imageRef = ref(getStorage(), imageToDelete.image);
     
               // Delete the file from Firebase Storage
               await deleteObject(imageRef).then(() => {
                   console.log("Image deleted from Firebase Storage");
               }).catch((error) => {
                   console.error("Error deleting image from Firebase Storage:", error);
               });
           }
     
           // Remove the deleted image from the galleryData state
           setGalleryData(galleryData.filter(image => image.id !== selectedImageId));
      } catch (error) {
           console.error("Error deleting image document from Firestore:", error);
      }
     };
     

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, },
    { field: 'image', headerName: 'Image URL', width: 220, height: 400 },
    { field: 'enTitle', headerName: 'English Title', width: 200 },
    { field: 'khTitle', headerName: 'Khmer Title', width: 200 },
    { field: 'programId', headerName: 'Program ID', width: 220 },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
            <div>
                <IconButton onClick={() => handleEdit(params.row.id)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => {
                    setSelectedImageId(params.row.id);
                    handleDelete(params.row.id);
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
                <Dashboardnav open={open} toggleDrawer={() => setOpen(!open)} />
                <Dashboardsidebar open={open} toggleDrawer={() => setOpen(!open)} />
                <Container>
                    <div style={{ marginTop: '80px' }}>
                        <Stack direction="row" spacing={1}>
                            <Button component={Link} to="/dashboard/gallery/add" variant="contained" startIcon={<AddIcon />}>
                                New Image
                            </Button>
                            <Button component={Link} to="/dashboard/gallery/slider" variant="contained" >
                                Slider Image
                            </Button>
                    
                        </Stack>
                    </div>
                    <div style={{ height: 800, width: '100%', marginTop: '2rem' }}>
                        <DataGrid
                            rows={galleryData}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10]}
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
                            Are you sure you want to delete this image?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteConfirmation} color="primary" autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}

export default AdminGallery;
