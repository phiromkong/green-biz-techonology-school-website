import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
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
import { getAuth, onAuthStateChanged, deleteUser, sendPasswordResetEmail } from "firebase/auth";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const defaultTheme = createTheme();
const options = ['Reset Password', 'Delete'];
const ITEM_HEIGHT = 48;

function AdminAccount() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(true);
    const [admins, setAdmins] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteAdminId, setDeleteAdminId] = useState(null);
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleClick = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId); // Ensure this is correctly setting the admin ID
        console.log("Selected admin ID:", rowId); // Debugging line
    };
    

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is signed in:", user);
            } else {
                console.log("User is signed out");
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchAdmins = async () => {
            const adminsRef = collection(db, "admins");
            const snapshot = await getDocs(adminsRef);
            const adminsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setAdmins(adminsData);
        };

        fetchAdmins();
    }, []);

    const handleDelete = (adminId) => {
        setDeleteAdminId(adminId); // Set the admin ID to be deleted
        setDeleteDialogOpen(true); // Open the delete confirmation dialog
    };

    const handleDeleteConfirmation = async () => {
        console.log("handleDeleteConfirmation called");
        setDeleteDialogOpen(false);

        console.log("Attempting to delete document with ID:", deleteAdminId);
        try {
            await deleteDoc(doc(db, "admins", deleteAdminId));
            console.log("User document deleted from Firestore");
            // Remove the deleted admin from the admins state
            setAdmins(admins.filter(admin => admin.id !== deleteAdminId));
            // Clear the deleteAdminId state
            setDeleteAdminId(null);
        } catch (error) {
            console.error("Error deleting user document from Firestore:", error);
        }
        window.location.reload();
    };

    
    
    
    const handleResetPassword = async (email) => {
        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email);
            console.log("Password reset email sent successfully", email);
            // Optionally, show a success message to the user
        } catch (error) {
            console.error("Error sending password reset email:", error);
            // Handle error appropriately, e.g., show an error message to the user
        }
    };
    

    const columns = [
        { field: 'id', headerName: 'UID', width: 210 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'profilePicture', headerName: 'Profile Picture', width: 230 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            align: 'right', // Aligns the cell content to the right
            headerAlign: 'right', // Aligns the header content to the right
            renderCell: (params) => (
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, params.row.id)}
                >
                    <MoreVertIcon />
                </IconButton>
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
                    <div style={{ marginTop: '80px', marginLeft: '-50px' }}>
                        <Stack direction="row" spacing={1}>
                            <Button component={Link} to="/dashboard/account/add" variant="contained" startIcon={<AddIcon />}>
                                New Admin
                            </Button>
                        </Stack>
                    </div>
                    <div style={{ height: 800, width: '100%', marginTop: '3rem' }}>
                        <DataGrid
                            rows={admins}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10]}
                            checkboxSelection
                        />
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            {options.map((option) => (
                            <MenuItem
                                key={option}
                                onClick={() => {
                                    if (option === 'Reset Password') {
                                        const selectedAdmin = admins.find(admin => admin.id === selectedRowId);
                                        if (selectedAdmin) {
                                            handleResetPassword(selectedAdmin.email);
                                        }
                                    } else if (option === 'Delete') {
                                        handleDelete(selectedRowId); // Pass the selectedRowId to handleDelete
                                    }
                                    handleClose();
                                }}
                            >
                                {option}
                            </MenuItem>
                            ))}
                        </Menu>
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
            </Box>
        </ThemeProvider>
    );
}

export default AdminAccount;
