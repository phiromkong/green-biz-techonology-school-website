import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

const Privateroute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        await auth.onAuthStateChanged((user) => {
          setIsAuthenticated(!!user);
        });
      } catch (error) {
        console.error('Error checking authentication state:', error);
      }
    };

    checkAuthState();
  }, []);

  if (isAuthenticated === null) {
    // You can render a loading spinner or any other UI indicating that authentication is being checked
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" state={{ from: location }} replace />
  );
};

export default Privateroute;
