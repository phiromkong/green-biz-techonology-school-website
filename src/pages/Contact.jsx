import React from 'react';
import Navbar from '../components/Navbar';
import ContactHeader from '../components/Contactheader';
import ContactForm from '../components/Contactform';
import Footer from '../components/Footer';

const Contact = () => {
    const handleFormSubmit = (formData) => {
        // Send formData to Telegram bot using an HTTP request
        fetch(`https://api.telegram.org/bot6254588965:AAH4nb5FOeZcLNpeKWi4UpaHQD7lxcTjABY/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: '5053535829',
            text: `New message from ${formData.firstName} ${formData.lastName}, Email: ${formData.email}, Phone: ${formData.phoneNumber}, Message: ${formData.message}`,
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
            <ContactForm onSubmit={handleFormSubmit} />
            <Footer />
        </div>
    );
};

export default Contact;

