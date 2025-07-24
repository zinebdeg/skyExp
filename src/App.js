import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './pages/home/Home';
import BookingPage from './pages/Booking/Booking';
import PrivateFlightPage from './pages/PrivateFlight/PrivateFlight';
import RoyalFlightPage from './pages/royalFlight/RoyalFlight';
import ClassicFlightPage from './pages/classicFlight/ClassicFlight';
import { Footer } from './components/footer/Footer';
import AboutPage from './pages/about/About';

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
        <Route path="/private-flight" element={<PrivateFlightPage />} />
        <Route path="/royal-flight" element={<RoyalFlightPage />} />
        <Route path="/classic-flight" element={<ClassicFlightPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
         <Footer/>
    </Router>
  );
}

export default App;
