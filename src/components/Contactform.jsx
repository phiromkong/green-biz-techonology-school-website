import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import './css/Contactform.css';

const Contactform = () => {
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);

    const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    if (event.target.value === "") {
        setFirstNameError(true);
    } else {
        setFirstNameError(false);
    }
    };
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <div className="contact-form-wrapper">
            <div className='form-heading'>
                <h1>Send Us a Message</h1>
            </div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '20%' },
                }}
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <TextField
                    error={firstNameError}
                    onChange={handleFirstNameChange}    
                    id="validationTooltip01"
                    label="First name"
                    defaultValue=""
                    required
                    helperText="Please provide your first name."
                />
                <TextField
                    error
                    id="validationTooltip02"
                    label="Last name"
                    defaultValue=""
                    required
                    helperText="Please provide your last name."
                />
                 <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '20%'},
                }}
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                    <TextField
                        id="validationTooltip03"
                        label="Email Address"
                        defaultValue=""
                        type="email" // Set type to email for email validation
                        helperText="Please provide a valid email address."
                        
                    />
                    <TextField
                        id="validationTooltip03"
                        label="Phone Number"
                        required
                        defaultValue=""
                        helperText="Please provide a valid phone number."
                        
                    />
                </Box>
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '42%'},
                    '& .MuiInputBase-input': { height: '200px' }, // Adjust this value

                }}
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                    <TextField
                        id="validationTooltip03"
                        label="Message"
                        defaultValue=""
                        
                    />
                </Box>
                {/* Add other TextField components here */}
                <Button style={{marginBottom: '40px', backgroundColor: '#006C44', color: 'white', marginLeft: '18px'}} type="submit">
                    Submit
                </Button>
            </Box>
        </div>
    );
};

export default Contactform;
