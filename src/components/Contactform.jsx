import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { FormControl, InputLabel, FormHelperText } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';
import './css/Contactform.css';
import { useTranslation } from 'react-i18next';

const Contactform = ({ onSubmit, cardData}) => {  
    const location = useLocation();
    const defaultCourse = location.state?.courseTitle || '';
    const { t, i18n } = useTranslation();
    const [selectedCourse, setSelectedCourse] = useState(defaultCourse || '');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        message: '',
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
        if (name === 'phoneNumber' && !/^0\d{8,10}$/.test(value)) {
            error = true;
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleCourseChange = (event, child) => {
        const course = child ? child.props.value : event.target.value;
        console.log('Course selected: ', course);
        setSelectedCourse(course); // Update the selected course when the user selects from the dropdown
    };
    
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || Object.values(errors).some(error => error)) {
            event.stopPropagation();
        } else {
            // Include selectedCourse in formData before submitting
            const updatedFormData = {
                ...formData,
                course: selectedCourse, // Add this line to include selectedCourse
            };
            onSubmit(updatedFormData);
            setFormData({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                message: '',
                course: '',
            });
            setErrors({
                firstName: false,
                phoneNumber: false,
                course: false,
            });
            setSelectedCourse('');
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
                    
                    <FormControl error={errors.course} sx={{ width: '20%', marginLeft: '16px', marginTop: '16px'}}>
                        <InputLabel id="course-label" sx={{fontFamily: "Kantumruy Pro"}}>{t('courses')}</InputLabel>
                        <Select
                            labelId="course-label"
                            value={selectedCourse } // Use the selected course from state or defaultCourse
                            onChange={handleCourseChange}
                            label={t('courses')}
                            name='course'
                            sx={{fontFamily: "Kantumruy Pro"}}
                        >
                            <MenuItem value="">None</MenuItem>
                            {cardData.map((course) => (
                                <MenuItem key={course.id} value={course.enTitle} sx={{fontFamily: "Kantumruy Pro"}}>
                                    {i18n.language === 'kh' ? course.khTitle : course.enTitle}
                                </MenuItem>
                            ))}
                        </Select>
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
                        multiline
                        rows={10}
                        value={formData.message}
                        onChange={handleChange}
                        sx={{ "& label": {fontFamily: "Kantumruy Pro",}}}
                        helperText={errors.message ? "Please provide a message." : ""}
                    />
                </Box>
                <Button style={{fontFamily: "Kantumruy Pro",  marginBottom: '40px', backgroundColor: '#006C44', color: 'white', marginLeft: '18px', borderRadius: '10px', padding: '10px 60px'}} type="submit">
                    {t('submit')}
                </Button>
            </Box>
        </div>
    );
};

export default Contactform;
