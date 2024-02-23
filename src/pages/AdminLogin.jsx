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
       
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validatePassword = (password) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return re.test(password);
    }

    
    const onLogin = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Invalid email format');
            return;
        }

        if (!validatePassword(password)) {
            setError('Invalid password format');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                navigate('/admin');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    return (
        <div className="loginWrapper">
            <div className="mainContainer">
                <div className={"titleContainer"}>
                    <img src="/logo3.png" alt="School Logo" className="logo" />
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
                    <div className={"buttonContainer"}>
                        <button className={"inputButton"} onClick={onLogin}>
                            Log in
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
