import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from '../firebase';

const Privateroute = () => {
 const [isAuthenticated, setIsAuthenticated] = useState(null);
 const [loading, setLoading] = useState(true); // Add a loading state

 const location = useLocation();

 useEffect(() => {
    const checkAuthState = async () => {
      try {
        await auth.onAuthStateChanged((user) => {
          setIsAuthenticated(!!user);
          setLoading(false); // Set loading to false after checking auth state
        });
      } catch (error) {
        console.error('Error checking authentication state:', error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      }
    };

    checkAuthState();
 }, []);

 if (loading) {
    // Render the loading indicator
    return (
      <div>
        <Backdrop
          sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
 }

 return isAuthenticated ? (
    <Outlet />
 ) : (
    <Navigate to="/admin" state={{ from: location }} replace />
 );
};

export default Privateroute;
