import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './pages/home/Home';
import BookingPage from './pages/Booking/Booking';
import PrivateFlightPage from './pages/PrivateFlight/PrivateFlight';
import RoyalFlightPage from './pages/royalFlight/RoyalFlight';
import ClassicFlightPage from './pages/classicFlight/ClassicFlight';
import Footer from './components/footer/Footer';
import About from './pages/about/About';

import AnniversaireDetails from './pages/anniversaire/AnniversaireDetails';
import MariageDetails from './pages/mariage/MariageDetails';
import Contact from './pages/contact/contact';

function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!showContent) {
      const handleScroll = () => setShowContent(true);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showContent]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />

     
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/private-flight" element={<PrivateFlightPage />} />
        <Route path="/royal-flight" element={<RoyalFlightPage />} />
        <Route path="/classic-flight" element={<ClassicFlightPage />} />
        <Route path="/anniversaire-flight" element={<AnniversaireDetails />} />
        <Route path="/mariage-flight" element={<MariageDetails />} />
      </Routes>
         <Footer/>
    </Router>
  );
}

export default App;
