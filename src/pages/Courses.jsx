import React from 'react';
import Navbar from '../components/Navbar';
import Coursesbox from '../components/Coursesbox'; // Replace with the actual path to your CoursesBox component
import Footer from '../components/Footer';

const Courses = () => {
  const cardData = [
    { title: "Course 1", image: "./Img1.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation", link: "/course-details1" },
    { title: "Course 2", image: "./Img2.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation", link: "/course-details2" },
    { title: "Course 3", image: "./Img3.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation", link: "/course-details3" },
    { title: "Course 4", image: "./Img1.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation", link: "/course-details4" },
    { title: "Course 5", image: "./Img2.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation", link: "/course-details5" },
    { title: "Course 6", image: "./Img3.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation", link: "/course-details6" },
  ];

  return (
    <div>
      <Navbar />
      <Coursesbox courses={cardData} />
      <Footer />
    </div>
  );
};

export default Courses;
