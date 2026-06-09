import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import AboutHome from '../components/AboutHome';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero />
        <AboutHome />
        <Categories />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
