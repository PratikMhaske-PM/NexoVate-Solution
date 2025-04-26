import React, { useState } from 'react';
import { ArrowRight, ArrowDown, Rocket, Users, Briefcase } from 'lucide-react';
import './about.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import OpenPositions from './OpenPosition';
import Profile from '../assets/profile.jpg'
import Nevo from '../assets/Nevo.png'

const About = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleMoreContent = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="about-container">
      <div className="about-content">
        <h2 className="about-title">About Nexovate</h2>
        
        <div className="about-intro">
          <p>
            At Nexovate, we're a fresh, innovative startup dedicated to transforming ideas into 
            market-ready solutions. What sets us apart is our commitment to delivering end-to-end 
            technology solutions that are accessible and scalable for businesses of all sizes.
          </p>
          
          <div className="unique-points">
            <div className="point">
              <h3>End-to-End Solutions</h3>
              <p>From concept development to market deployment, we handle every step of your 
              technology journey with precision and expertise.</p>
            </div>
            
            <div className="point">
              <h3>Startup-Friendly</h3>
              <p>As a startup ourselves, we understand the unique challenges businesses face and offer 
              flexible engagement models that grow with your company.</p>
            </div>
            
            <div className="point">
              <h3>Innovation Focus</h3>
              <p>Our technical team stays at the cutting edge of technology to deliver 
              future-proof solutions for your business needs.</p>
            </div>
          </div>
          
          <div className="mission">
            <h3>Our Mission</h3>
            <p>
              To democratize technological innovation by providing accessible, scalable, and 
              sustainable solutions that empower businesses to thrive in the digital age.
            </p>
          </div>
        </div>
        
        <div className="visual-element">
          <img src={Nevo} alt="Nexovate innovation process" className="about-image" />
        </div>
        
        {/* Founder/CEO Section */}
        <div className="founder-section">
          <div className="founder-content">
            <div className="founder-image-container">
              <img src={Profile} alt="Founder & CEO" className="founder-image" />
            </div>
            <div className="founder-info">
              <h3>Meet Our Founder & CEO</h3>
              <h4>Pratik Mhaske</h4>
              <p className="founder-title">Founder & Chief Executive Officer</p>
              <p className="founder-bio">
                With a background in software development and business strategy, 
                John founded Nexovate to bridge the gap between cutting-edge technology
                and practical business applications. His experience working with both enterprise
                companies and startups has given him unique insights into creating solutions
                that are both innovative and commercially viable.
              </p>
              <p className="founder-quote">
                "At Nexovate, we believe that technology should be an enabler for businesses of all sizes.
                Our goal is to democratize access to innovation and help organizations thrive in an
                increasingly digital world."
              </p>
            </div>
          </div>
        </div>
        
        <div className="cta-container">
          <button className="learn-more-btn" onClick={toggleMoreContent}>
            {showMore ? 'Show Less' : 'Learn More About Us'}
            {showMore ? <ArrowDown className="arrow-icon" size={20} /> : <ArrowRight className="arrow-icon" size={20} />}
          </button>
        </div>
        
        {/* Extended content that appears when "Learn More" is clicked */}
        {showMore && (
          <div className="extended-content">
            <div className="vision-section">
              <h3>Our Vision</h3>
              <p className="vision-text">
                Nexovate envisions a future where cutting-edge technology is accessible to businesses 
                of all sizes, enabling innovation and growth across industries. We're building a company 
                that doesn't just follow tech trends, but helps create them.
              </p>
              
              <div className="future-plans">
                <h4>Where We're Headed</h4>
                <div className="plans-grid">
                  <div className="plan-card">
                    <Rocket size={32} className="plan-icon" />
                    <h5>Innovation Lab</h5>
                    <p>Launching our R&D division to explore emerging technologies and create proprietary solutions.</p>
                  </div>
                  <div className="plan-card">
                    <Users size={32} className="plan-icon" />
                    <h5>Talent Expansion</h5>
                    <p>Growing our team with specialized experts in AI, blockchain, and cloud architecture.</p>
                  </div>
                  <div className="plan-card">
                    <Briefcase size={32} className="plan-icon" />
                    <h5>Industry Partnerships</h5>
                    <p>Forming strategic alliances with key players to enhance our solution capabilities.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="approach-section">
              <h3>Our Approach</h3>
              <div className="approach-content">
                <div className="approach-steps">
                  <div className="approach-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Discover</h4>
                      <p>We start by deeply understanding your business, market, and specific challenges.</p>
                    </div>
                  </div>
                  <div className="approach-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Design</h4>
                      <p>Our team creates tailored solutions that address your unique requirements and goals.</p>
                    </div>
                  </div>
                  <div className="approach-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Develop</h4>
                      <p>We build your solution using best practices and cutting-edge technologies.</p>
                    </div>
                  </div>
                  <div className="approach-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>Deploy</h4>
                      <p>We ensure smooth implementation and provide ongoing support for your success.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="values-section">
              <h3>Our Core Values</h3>
              <div className="values-grid">
                <div className="value-card">
                  <h4>Innovation</h4>
                  <p>We constantly push boundaries and explore new technologies to provide cutting-edge solutions.</p>
                </div>
                <div className="value-card">
                  <h4>Client-Centric</h4>
                  <p>Your success is our success. We prioritize understanding your unique needs and challenges.</p>
                </div>
                <div className="value-card">
                  <h4>Excellence</h4>
                  <p>We maintain the highest standards in everything we do, from code quality to client communication.</p>
                </div>
                <div className="value-card">
                  <h4>Collaboration</h4>
                  <p>We believe the best solutions emerge when diverse minds work together toward common goals.</p>
                </div>
                <div className="value-card">
                  <h4>Integrity</h4>
                  <p>We operate with transparency, honesty, and ethical practices in all our business dealings.</p>
                </div>
                <div className="value-card">
                  <h4>Adaptability</h4>
                  <p>In a rapidly changing tech landscape, we remain agile and embrace change as opportunity.</p>
                </div>
              </div>
            </div>
            
            <div className="join-us-section">
              <h3>Join Our Journey</h3>
              <div className="join-us-content">
                <div className="join-us-message">
                  <p>
                    As we continue to grow and innovate, we're always looking for talented individuals
                    who share our passion for technology and helping businesses succeed. Whether you're
                    a developer, designer, strategist, or business professional, we'd love to hear from you.
                  </p>
                </div>
                <div className="careers-cta">
                  <h4>We're Growing!</h4>
                  <p>
                    Interested in being part of our journey? We're currently hiring passionate individuals
                    in development, design, and business development roles.
                  </p>
                  {/* Replace the a href with Link component */}
                  <Link to="/open-positions" className="careers-btn">View Open Positions</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;