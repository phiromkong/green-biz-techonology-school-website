import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { FormControl, InputLabel, FormHelperText } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import './css/Contactform.css';
import { useTranslation } from 'react-i18next';

const Contactform = ({ onSubmit, cardData, defaultCourse }) => {  
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        message: '',
        course: defaultCourse || '',  
    });

    const [errors, setErrors] = useState({
        firstName: false,
        phoneNumber: false,
        course: false,
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    
        let error = false;
        if (value.trim() === '' && name !== 'message') {
            error = true;
        } else if (name === 'phoneNumber' && !/^0\d{8,10}$/.test(value)) {
            error = true;
        }else if (name === 'message' && value.trim() === '') {
            error = true;
        }
        setErrors({ ...errors, [name]: error });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || Object.values(errors).some(error => error) || formData.course === '' || formData.message === '') {
            // Check if a course is selected
            setErrors({ ...errors, message: formData.message === '' });
            setErrors({ ...errors, course: formData.course === '' });
            event.stopPropagation();
        } else {
            // Call onSubmit function passed from parent component with form data
            onSubmit(formData);
            // Reset form data after submission
            setFormData({
                firstName: '',
                lastName: '',
                course: '',
                phoneNumber: '',
                message: '',
            });
            // Reset errors state
            setErrors({
                firstName: false,
                course: false,
                phoneNumber: false,
            });
        }
    };


    return (
        <div className="contact-form-wrapper">
            <div className='form-heading'>
                <h1>{t('headerForm')}</h1>
            </div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '20%' },   
                }}
                noValidate
                onSubmit={handleSubmit}
            >
                <TextField
                    error={errors.firstName}
                    onChange={handleChange}    
                    id="validationTooltip01"
                    name="firstName"
                    label={t("firstName")}
                    value={formData.firstName}
                    required
                    helperText={errors.firstName ? "Please provide your first name." : ""}
                    sx={{ "& label": {fontFamily: "Kantumruy Pro",}}}
                    />
                <TextField
                    error={errors.lastName}
                    onChange={handleChange}
                    id="validationTooltip02"
                    name="lastName"
                    label={t("lastName")}
                    value={formData.lastName}
                    required
                    helperText={errors.lastName ? "Please provide your last name." : ""}
                    sx={{ "& label": {fontFamily: "Kantumruy Pro",}}}
                    />
                 <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '20%'},
                }}
                noValidate
                onSubmit={handleSubmit}
            >
                    
                    <TextField
                        error={errors.phoneNumber}
                        onChange={handleChange}
                        id="validationTooltip04"
                        name="phoneNumber"
                        label={t("telegramNum")}
                        value={formData.phoneNumber}
                        required
                        helperText={errors.phoneNumber ? "Please provide a valid phone number." : ""}
                        sx={{ "& label": {fontFamily: "Kantumruy Pro",}}}
                        
                    />
                    
                    <FormControl error={errors.course} required sx={{ width: '20%', marginLeft: '16px', marginTop: '16px' }}>
                        <InputLabel id="course-label" style={{fontFamily: "Kantumruy Pro"}}>{t('courses')}</InputLabel>
                        <Select
                            labelId="course-label"
                            value={formData.course}
                            onChange={handleChange}
                            label='Courses'
                            name='course'

                        >
                            {cardData.map((course, index) => (
                                <MenuItem key={index} value={course.title}>
                                    {course.title}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.course && <FormHelperText>Please select a course.</FormHelperText>}
                    </FormControl>
                </Box>
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '42%'},

                }}
                noValidate
                onSubmit={handleSubmit}
            >
                    <TextField
                        error={errors.message}
                        id="validationTooltip05"
                        name="message"
                        label={t('message')}
                        required
                        multiline
                        rows={10}
                        value={formData.message}
                        onChange={handleChange}
                        sx={{ "& label": {fontFamily: "Kantumruy Pro",}}}
                        helperText={errors.message ? "Please provide a message." : ""}
                    />
                </Box>
                {/* Add other TextField components here */}
                <Button style={{fontFamily: "Kantumruy Pro",  marginBottom: '40px', backgroundColor: '#006C44', color: 'white', marginLeft: '18px', borderRadius: '10px', padding: '10px 60px'}} type="submit">
                    {t('submit')}
                </Button>
            </Box>
        </div>
    );
};

export default Contactform;
