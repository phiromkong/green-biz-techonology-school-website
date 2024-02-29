import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import "../components/css/AdminLogin.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);

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
        if (error.code === 'auth/invalid-credential' ) {
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
  }

    return (
        <div className="loginWrapper">
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
