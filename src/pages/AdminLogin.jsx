import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import "../components/css/AdminLogin.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';

const AdminLogin = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
       
    const onLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
        setError('Please fill in both fields');
        return;
    }
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/")
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-credential') {
            setError('Invalid Credentials');
        } else {
            setError(errorMessage);
        }
        console.log(errorCode, errorMessage)
    });
}

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <img src="/logo2.png" alt="School Logo" className="logo" />
        </div>
        <div className={"inputContainer"}>
            <TextField
                error={error ? true : false}
                helperText={error}
                value={email}
                label="Email"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
        </div>

        <div className={"inputContainer"}>
            <div className="passwordContainer">
                <TextField
                    error={error ? true : false}
                    helperText={error}
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
            <input
                className={"inputButton"}
                type="button"
                onClick={onLogin}
                value={"Log in"} />
        </div>
        <Link to="/"><button className="inputButtonTwo">Homepage</button></Link>

    </div>
}

export default AdminLogin;