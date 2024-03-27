import React, { useState, useEffect } from 'react';
import { getStorage, ref, listAll, getMetadata, deleteObject, uploadBytes } from 'firebase/storage';
import { DataGrid, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
import { Button, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Backdrop, CircularProgress } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboardnav from '../components/Dashboardnav';
import Dashboardsidebar from '../components/Dashboardsidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';

const defaultTheme = createTheme();
const AdminSlider = () => {
 const [images, setImages] = useState([]);
 const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
 const [selectedImage, setSelectedImage] = useState(null);
 const [selectedFile, setSelectedFile] = useState(null);
 const [open, setOpen] = React.useState(true);
 const [loading, setLoading] = useState(false);


 useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const imagesRef = ref(storage, 'gallery/slider');
      const listResult = await listAll(imagesRef);
      const imagesListPromises = listResult.items.map(async (item) => {
        const metadata = await getMetadata(item);
        return {
          id: item.name,
          name: item.name,
          url: metadata.fullPath,
        };
      });
      const imagesList = await Promise.all(imagesListPromises);
      setImages(imagesList);
    };

    fetchImages();
 }, []);

 const toggleDrawer = () => {
    setOpen(!open);
 };

 const handleDeleteConfirmation = async () => {
    if (selectedImage) {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, selectedImage.url);
        await deleteObject(imageRef);
        setImages(images.filter(image => image.url !== selectedImage.url));
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
 };

 const handleReplaceImage = async () => {
    if (selectedImage && selectedFile) {
       setLoading(true); // Start loading
       try {
         const storage = getStorage();
         const imageRef = ref(storage, selectedImage.url);
   
         await deleteObject(imageRef);
   
         const uploadTask = uploadBytes(imageRef, selectedFile);
         await uploadTask;
   
       } catch (error) {
         console.error("Error replacing image:", error);
       } finally {
         setLoading(false); // End loading
       }
    }
   };
   

 const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'url', headerName: 'URL', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            onClick={() => {
              setSelectedImage(params.row);
              document.getElementById('fileInput').click();
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {
              setSelectedImage(params.row);
              setDeleteDialogOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
 ];

 return (
    <ThemeProvider theme={defaultTheme}>
       <Box sx={{ display: 'flex' }}>
         <CssBaseline />
         <Dashboardnav open={open} toggleDrawer={toggleDrawer} />
         <Dashboardsidebar open={open} toggleDrawer={toggleDrawer} />
         <Container style={{ marginTop: '5rem' }}>
           <div style={{ height: 600, width: '100%', marginTop: '3rem' }}>
             <DataGrid
               rows={images}
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
               Are you sure you want to delete this admin?
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
         <input
           type="file"
           accept="image/*"
           onChange={(e) => {
             setSelectedFile(e.target.files[0]);
             handleReplaceImage();
           }}
           style={{ display: 'none' }}
           id="fileInput"
         />
         {loading && (
         <Backdrop
           sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
           open={loading}
           onClick={() => {}}
         >
           <CircularProgress color="inherit" />
         </Backdrop>
         )}
       </Box>
    </ThemeProvider>
   );
   
};

export default AdminSlider;
