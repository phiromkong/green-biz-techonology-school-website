import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import News from './pages/News';
import NewsDetails from './components/NewsDetail';
import Faculty from './pages/Faculty';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CoursesDetail from './components/Coursedetail'; 
import NotFound from './components/NotFound';
import Privateroute from './components/Privateroute';
import AdminProfile from './pages/AdminProfile';
import AdminAccount from './pages/AdminAccount';
import i18n from './i18next';
import AdminNews from './pages/AdminNews';
import AddNews from './pages/AddNews';
import EditNews from './pages/EditNews';
import AdminOurTeam from './pages/AdminOurTeam';
import AddOurTeam from './pages/AddOurTeam';
import EditOurTeam from './pages/EditOurTeam';
import AdminPartners from './pages/AdminPartners';
import AddPartners from './pages/AddPartners';
import EditPartners from './pages/EditPartners';
import AdminProgram from './pages/AdminProgram';
import AdminGallery from './pages/AdminGallery';
import ProgramCourses from './pages/ProgramCourses';
import EditPrograms from './pages/EditProgram';
import AddProgram from './pages/AddProgram';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';
import AddAdmin from './pages/AddAdmin';
import AddImage from './pages/AddImage';
import AdminCourses from './pages/AdminCourses';
import AddCourses from './pages/AddCourses';
import EditCourses from './pages/EditCourses';
import EditGallery from './pages/EditGallery';
import AddImagesToGallery from './pages/AddImagesToGallery';
import AdminSlider from './pages/AdminSlider';
import MetaHeader from './components/MetaHeader';
import MessengerChat from './components/MessengerChat';


function App() {
  const [setIsI18nInitialized] = useState(false);
  useEffect(() => {
    i18n.on('initialized', () => setIsI18nInitialized(true));
  });

  
  
  return (
    <>
    <MetaHeader
        title="Green Biz Technology School - Your Education Partner"
        description="Green Biz Technology School, or GBT School, offers a wide range of courses and partnerships to enhance your learning experience."
        keywords="education, courses, partnerships, GBT School, Green Biz Technology, computer, BMC, Banteay Meanchey"
        ogTitle="Green Biz Technology School, or GBT School - Your Education Partner"
        ogDescription="GBT School offers a wide range of courses and partnerships to enhance your learning experience."
        ogImage="https://www.gbtschool.org/gbt_logo.png"
        ogUrl="https://www.gbtschool.org"
      />
      <MessengerChat />
      <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CoursesDetail/>} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/our-team" element={<Faculty />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<Privateroute/>}>
              <Route path='/dashboard' element={<AdminDashboard/>} />
              <Route path='/dashboard/profile' element={<AdminProfile/>} />
              <Route path='/dashboard/account' element={<AdminAccount/>} />
              <Route path='/dashboard/account/add' element={<AddAdmin/>} />
              <Route path='/dashboard/news' element={<AdminNews/>} />
              <Route path='/dashboard/news/add' element={<AddNews/>} />
              <Route path='/dashboard/news/edit/:postId' element={<EditNews/>} />
              <Route path='/dashboard/our-team' element={<AdminOurTeam/>} />
              <Route path='/dashboard/our-team/add' element={<AddOurTeam/>} />
              <Route path='/dashboard/our-team/edit/:memberId' element={<EditOurTeam/>} />
              <Route path='/dashboard/partners' element={<AdminPartners/>} />
              <Route path='/dashboard/partners/add' element={<AddPartners/>} />
              <Route path='/dashboard/partners/edit/:partnerId' element={<EditPartners/>} />
              <Route path='/dashboard/programs' element={<AdminProgram />} />
              <Route path='/dashboard/programs/:programId' element={<ProgramCourses />} />
              <Route path='/dashboard/programs/add' element={<AddProgram/>} />
              <Route path='/dashboard/programs/edit/:programId' element={<EditPrograms/>} />
              <Route path='/dashboard/programs/:programId/addCourse' element={<AddCourse />} />
              <Route path='/dashboard/programs/:programId/addImage' element={<AddImage />} />
              <Route path='/dashboard/programs/:programId/edit/:courseId' element={<EditCourse />} />
              <Route path='/dashboard/courses' element={<AdminCourses />} />
              <Route path='/dashboard/courses/add' element={<AddCourses />} />
              <Route path='/dashboard/courses/edit/:courseId' element={<EditCourses />} />
              <Route path='/dashboard/gallery' element={<AdminGallery />} />
              <Route path='/dashboard/gallery/slider' element={<AdminSlider />} />
              <Route path='/dashboard/gallery/add' element={<AddImagesToGallery />} />
              <Route path='/dashboard/gallery/edit/:imageId' element={<EditGallery />} />
        </Route>       
        <Route path="/" element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>

    </>
  );
}

export default App;
