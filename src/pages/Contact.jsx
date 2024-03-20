import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ContactHeader from '../components/Contactheader';
import ContactForm from '../components/Contactform';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


const Contact = () => {
  const location = useLocation();
  const courseTitle = location.state?.courseTitle;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, "courses"); // Adjust the collection name as needed
      const coursesSnapshot = await getDocs(coursesCollection);
      const coursesList = coursesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCourses(coursesList);
    };

    fetchCourses();
 }, []);

  const handleFormSubmit = (formData) => {
    // Send formData to Telegram bot using an HTTP request
    fetch(`https://api.telegram.org/bot6254588965:AAH4nb5FOeZcLNpeKWi4UpaHQD7lxcTjABY/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: '5053535829',
        text: `New message from ${formData.firstName} ${formData.lastName}, Course: ${formData.course}, Phone: ${formData.phoneNumber}, Message: ${formData.message}`,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send message to Telegram bot');
      }
      // Handle success
      console.log('Message sent successfully');
      console.log('Form submitted:', formData);
    })
    .catch(error => {
      // Handle error
      console.error('Error sending message to Telegram bot:', error);
    });
  };
    return (
        <div>
            <Navbar />
            <div className="containerWrapper">
                <ContactHeader />
            </div>
            <ContactForm onSubmit={handleFormSubmit} cardData={courses} defaultCourse={courseTitle} />
            <Footer />
        </div>
    );
};

export default Contact;

