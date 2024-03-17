import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Coursesbox from '../components/Coursesbox';
import Footer from '../components/Footer';
import '../components/css/Coursecard.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const Courses = () => {
 const [courses, setCourses] = useState([]);

 useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, "courses"); // Replace "courses" with your actual collection name
      const querySnapshot = await getDocs(coursesCollection);
      const coursesList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCourses(coursesList);
    };

    fetchCourses();
 }, []);

 return (
    <div>
      <Navbar />
      <Coursesbox courses={courses} />
      <Footer />
    </div>
 );
};

export default Courses;
