// PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import Firebase hook for authentication state
import { auth } from '../firebase'; // Import Firebase auth instance

const Privateroute = ({ element, ...rest }) => {
  const [user] = useAuthState(auth); // Get the current user from Firebase authentication

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/admin" replace />
  );
};

export default Privateroute;
