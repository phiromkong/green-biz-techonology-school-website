import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Coursesbox from '../components/Coursesbox';
import Footer from '../components/Footer';
import '../components/css/Coursecard.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import MetaHeader from '../components/MetaHeader'; // Import the MetaHeader component

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
      <MetaHeader
        title="GBT School Courses - Explore Our Offerings"
        description="Discover a wide range of courses at GBT School. Explore our offerings to find the perfect course for your learning needs and career goals."
        keywords="courses, education, GBT School, learning, career, development, web development, python, programming, web desing, graphic design, chinese, video editing, computer fundamental"
        ogTitle="GBT School Courses - Explore Our Offerings"
        ogDescription="Discover a wide range of courses at GBT School. Explore our offerings to find the perfect course for your learning needs and career goals."
        ogImage="https://www.gbtschool.com/logo.png"
        ogUrl="https://www.gbtschool.org/courses"
      />
      <Navbar />
      <Coursesbox courses={courses} />
      <Footer />
    </div>
 );
};

export default Courses;
