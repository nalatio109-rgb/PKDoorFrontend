import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import AboutHome from '../components/AboutHome';
import Structure from '../components/Structure';
import ProjectsGallery from '../components/ProjectsGallery';
import Footer from '../components/Footer';
import ConsultationPopup from '../components/ConsultationPopup';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero />
        <AboutHome />
        <Structure />
        <Categories />
        <ProjectsGallery />
      </main>
      <Footer />
      <ConsultationPopup />
    </div>
  );
};

export default Home;
