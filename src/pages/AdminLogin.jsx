import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import "../components/css/AdminLogin.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State for modal
  const [currentUserEmail, setCurrentUserEmail] = useState(null); // State to store current user email

  const logout = () => {
    auth.signOut().then(() => {
      console.log('User logged out');
      setModalOpen(false);
      navigate('/admin'); // Redirect to login page after logout
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email); // Set current user email
        setModalOpen(true); // Open modal if user is logged in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const onLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      setEmailError('Please fill in your email');
      setLoading(false);
      return;
    }

    if (!password) {
      setPasswordError('Please fill in your password');
      setLoading(false);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmailError(null);
        setPasswordError(null);
        navigate('/dashboard'); // Redirect to dashboard after successful login
      })
      .catch((error) => {
        // Handle login errors
        if (error.code === 'auth/invalid-credential') {
          setEmailError('Invalid Credentials');
          setPasswordError('Invalid Credentials');
        } else if (error.code === 'auth/invalid-email') {
          setEmailError('Please enter a valid email address');
          setPasswordError(null);
        } else {
          setEmailError(error.message);
          setPasswordError(error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="loginWrapper">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Typography id="modal-title" level="h2">
            Confirm
          </Typography>
          <Typography id="modal-description" textColor="text.tertiary">
            You are already logged in as "{currentUserEmail}", you need to log out before logging in as a different user.
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button variant="solid" color="primary" onClick={logout}>
              Logout
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                setModalOpen(false); 
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
      <div className="mainContainer">
        <div className={"titleContainer"}>
          <img src="/logo3.png" alt="School Logo" className="logo-admin" />
        </div>
        <div className={"inputContainer"}>
          <TextField
            error={emailError ? true : false}
            helperText={emailError}
            value={email}
            label="Email"
            onChange={ev => setEmail(ev.target.value)}
            className={"inputBox"} />
        </div>

        <div className={"inputContainer"}>
          <div className="passwordContainer">
            <TextField
              error={passwordError ? true : false}
              helperText={passwordError}
              type={showPassword ? "text" : "password"}
              value={password}
              label="Password"
              onChange={ev => setPassword(ev.target.value)}
              className={"inputBox"} />
          </div>
          <div onClick={() => setShowPassword(!showPassword)} className="passwordIcon">
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </div>

        <div className={"inputContainer"}>
          <div className={"buttonContainer"}>
            <button className={"inputButton"} onClick={onLogin} disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            <button className={"inputButtonTwo"}>
              <Link to="/">Homepage</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
