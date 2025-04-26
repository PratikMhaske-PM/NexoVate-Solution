import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Service from './Pages/Service';
import ServiceCard from './Pages/ServiceCard';
import OpenPosition from './Pages/OpenPosition';
import QuoteCalculator from './Pages/Quote';
import './index.css';
import Footer from './components/Footer';
import Book from './Pages/Book';

const App = () => {
  const [showQuoteCalculator, setShowQuoteCalculator] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  
  const toggleQuoteCalculator = () => {
    setShowQuoteCalculator(!showQuoteCalculator);
  };
  
  const toggleAppointment = () => {
    setShowAppointment(!showAppointment);
  };

  return (
    <Router>
      <div className="app">
        <Navbar onQuoteButtonClick={toggleQuoteCalculator} />
        
        {/* Quote Calculator Modal */}
        {showQuoteCalculator && (
          <div className="quote-modal-overlay">
            <div className="quote-modal">
              <div className="quote-modal-header">
                <h2>Development Quote Calculator</h2>
                <button 
                  className="close-button" 
                  onClick={toggleQuoteCalculator}
                  aria-label="Close quote calculator"
                >
                  ×
                </button>
              </div>
              <div className="quote-modal-body">
                <QuoteCalculator onSubmitSuccess={toggleQuoteCalculator} />
              </div>
            </div>
          </div>
        )}
        
        {/* Appointment Booking Modal */}
        {showAppointment && (
          <div className="quote-modal-overlay">
            <div className="quote-modal">
              <div className="quote-modal-header">
                <h2>Book an Appointment</h2>
                <button 
                  className="close-button" 
                  onClick={toggleAppointment}
                  aria-label="Close appointment booking"
                >
                  ×
                </button>
              </div>
              <div className="quote-modal-body">
                <Book onSubmitSuccess={toggleAppointment} />
              </div>
            </div>
          </div>
        )}
        
        {/* Routes for page navigation */}
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home onGetQuoteClick={toggleQuoteCalculator} onGetAppointmentClick={toggleAppointment} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Service />} />
            <Route path="/services/:id" element={<ServiceCard />} />
            <Route path="/open-positions" element={<OpenPosition />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;