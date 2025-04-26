import React, { useState, useRef } from 'react';
import { ArrowRight, Briefcase, Code, Palette, ChartBar, MessageSquare, PlusCircle, X, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './openPosition.css';

const OpenPositions = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  
  const formRef = useRef();
  
  // Email.js configuration
  // You'll need to sign up at emailjs.com and replace these with your actual values
  const emailjsServiceId = 'YOUR_SERVICE_ID';
  const emailjsTemplateId = 'YOUR_TEMPLATE_ID';
  const emailjsPublicKey = 'YOUR_PUBLIC_KEY';
  
  const positions = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      category: "development",
      location: "Remote (US/Europe)",
      type: "Full-time",
      description: "We're looking for an experienced Full Stack Developer to help build and scale our core platform. You'll work with modern technologies to create innovative solutions for our clients.",
      responsibilities: [
        "Design and develop high-quality web applications using React, Node.js, and related technologies",
        "Collaborate with product managers and designers to implement new features",
        "Write clean, maintainable, and efficient code",
        "Participate in code reviews and team discussions"
      ],
      requirements: [
        "5+ years of experience in web development",
        "Strong knowledge of JavaScript/TypeScript, React, and Node.js",
        "Experience with database design and ORM tools",
        "Passion for clean code and software craftsmanship",
        "Excellent problem-solving and communication skills"
      ]
    },
    {
      id: 2,
      title: "UI/UX Designer",
      category: "design",
      location: "Remote (Global)",
      type: "Full-time",
      description: "Join our growing design team to create intuitive and engaging user experiences for our products. You'll be involved in all aspects of the design process from research to implementation.",
      responsibilities: [
        "Create wireframes, mockups, and interactive prototypes",
        "Conduct user research and usability testing",  
        "Collaborate with developers to ensure high-quality implementation",
        "Maintain and evolve our design system"
      ],
      requirements: [
        "3+ years of experience in UI/UX design",
        "Proficiency with design tools like Figma or Adobe XD",
        "Understanding of design principles and accessibility standards",
        "Strong portfolio demonstrating your design process",
        "Excellent visual design skills"
      ]
    },
    {
      id: 3,
      title: "Business Development Manager",
      category: "business",
      location: "Hybrid (HQ + Remote)",
      type: "Full-time",
      description: "We're seeking a driven Business Development Manager to help expand our market presence and identify new opportunities for growth.",
      responsibilities: [
        "Identify and pursue new business opportunities",
        "Build and maintain relationships with key clients and partners",
        "Develop and execute strategic sales plans",
        "Represent the company at industry events and conferences"
      ],
      requirements: [
        "4+ years of experience in business development or sales",
        "Proven track record of meeting and exceeding targets",
        "Experience in the tech industry preferred",
        "Strong negotiation and communication skills",
        "Ability to understand technical concepts and explain them to non-technical audiences"
      ]
    },
    {
      id: 4,
      title: "Cloud Infrastructure Engineer",
      category: "development",
      location: "Remote (Global)",
      type: "Full-time",
      description: "Help us build and maintain the infrastructure that powers our applications. You'll work with modern cloud technologies to ensure our systems are reliable, secure, and scalable.",
      responsibilities: [
        "Design, implement, and manage cloud infrastructure on AWS/Azure/GCP",
        "Implement CI/CD pipelines and automation tools",
        "Monitor system performance and troubleshoot issues",
        "Collaborate with development teams to optimize application deployment"
      ],
      requirements: [
        "3+ years of experience with cloud infrastructure",
        "Strong knowledge of AWS, Docker, and Kubernetes",
        "Experience with infrastructure as code tools like Terraform",
        "Understanding of security best practices",
        "Problem-solving mindset and ability to work in a fast-paced environment"
      ]
    },
    {
      id: 5,
      title: "Product Marketing Specialist",
      category: "marketing",
      location: "Remote (US/Europe)",
      type: "Full-time",
      description: "Join our marketing team to help shape and promote our product offerings. You'll work closely with product and sales teams to create compelling messaging and drive adoption.",
      responsibilities: [
        "Develop product positioning and messaging",
        "Create marketing materials including website content, case studies, and white papers",
        "Collaborate with product teams to understand feature releases",
        "Analyze market trends and competitor activities"
      ],
      requirements: [
        "3+ years of experience in product marketing, preferably in B2B SaaS",
        "Excellent writing and communication skills",
        "Ability to translate technical concepts into clear value propositions",
        "Experience with digital marketing channels",
        "Data-driven approach to measuring marketing effectiveness"
      ]
    },
    {
      id: 6,
      title: "Junior Frontend Developer",
      category: "development",
      location: "Remote (Global)",
      type: "Full-time",
      description: "We're looking for a motivated Junior Frontend Developer to join our team. This is a great opportunity to grow your skills working on real-world projects with experienced mentors.",
      responsibilities: [
        "Implement user interfaces using React and modern CSS",
        "Work closely with designers to ensure pixel-perfect implementation",
        "Write unit tests for frontend components",
        "Participate in code reviews and continuous improvement"
      ],
      requirements: [
        "1+ years of experience with React development",
        "Strong HTML, CSS, and JavaScript skills",
        "Familiarity with responsive design principles",
        "Eagerness to learn and grow as a developer",
        "CS degree or equivalent practical experience"
      ]
    }
  ];

  const filteredPositions = activeCategory === 'all' 
    ? positions 
    : positions.filter(position => position.category === activeCategory);

  const handleApplyClick = (position) => {
    setCurrentPosition(position);
    setShowModal(true);
    setFormError('');
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    
    try {
      // Get form data
      const formData = new FormData(formRef.current);
      const formDataObject = Object.fromEntries(formData);
      
      // Add position info to the form data
      const emailData = {
        ...formDataObject,
        position_title: currentPosition.title,
        position_category: currentPosition.category,
        position_location: currentPosition.location,
        to_email: 'your-email@example.com' // Set recipient email
      };
      
      // Send email using Email.js
      await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        emailData,
        emailjsPublicKey
      );
      
      // Show confirmation message
      setShowModal(false);
      setShowConfirmation(true);
      
      // Reset confirmation message after 5 seconds
      setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);
    } catch (error) {
      console.error('Email.js error:', error);
      setFormError('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="careers-container">
      <div className="careers-header">
        <h1>Open Positions</h1>
        <p>Join our team and help us build innovative solutions for tomorrow's challenges</p>
      </div>

      <div className="careers-intro">
        <div className="intro-content">
          <h2>Why Work With Us?</h2>
          <p>
            At Nexovate, we believe that great products are built by great teams. We're creating an 
            environment where talented individuals can thrive, grow, and make a real impact.
          </p>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Remote-First Culture</h3>
              <p>Work from anywhere with flexible hours that fit your lifestyle</p>
            </div>
            <div className="benefit-card">
              <h3>Continuous Learning</h3>
              <p>Professional development budget and regular knowledge sharing sessions</p>
            </div>
            <div className="benefit-card">
              <h3>Meaningful Work</h3>
              <p>Build products that solve real problems and make a difference</p>
            </div>
            <div className="benefit-card">
              <h3>Competitive Compensation</h3>
              <p>Salary, equity, and benefits package designed to reward excellence</p>
            </div>
          </div>
        </div>
      </div>

      <div className="positions-section">
        <div className="filter-container">
          <h2>Current Openings</h2>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Positions
            </button>
            <button 
              className={`filter-btn ${activeCategory === 'development' ? 'active' : ''}`}
              onClick={() => setActiveCategory('development')}
            >
              Development
            </button>
            <button 
              className={`filter-btn ${activeCategory === 'design' ? 'active' : ''}`}
              onClick={() => setActiveCategory('design')}
            >
              Design
            </button>
            <button 
              className={`filter-btn ${activeCategory === 'business' ? 'active' : ''}`}
              onClick={() => setActiveCategory('business')}
            >
              Business
            </button>
            <button 
              className={`filter-btn ${activeCategory === 'marketing' ? 'active' : ''}`}
              onClick={() => setActiveCategory('marketing')}
            >
              Marketing
            </button>
          </div>
        </div>

        <div className="positions-list">
          {filteredPositions.length > 0 ? (
            filteredPositions.map((position) => (
              <div key={position.id} className="position-card">
                <div className="position-header">
                  <div className="position-icon">
                    {position.category === 'development' && <Code size={24} />}
                    {position.category === 'design' && <Palette size={24} />}
                    {position.category === 'business' && <Briefcase size={24} />}
                    {position.category === 'marketing' && <ChartBar size={24} />}
                  </div>
                  <div className="position-title-container">
                    <h3>{position.title}</h3>
                    <div className="position-meta">
                      <span className="location">{position.location}</span>
                      <span className="dot">•</span>
                      <span className="type">{position.type}</span>
                    </div>
                  </div>
                </div>

                <p className="position-description">{position.description}</p>

                <div className="position-details">
                  <div className="responsibilities">
                    <h4>Responsibilities</h4>
                    <ul>
                      {position.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="requirements">
                    <h4>Requirements</h4>
                    <ul>
                      {position.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="position-footer">
                  <button 
                    className="apply-btn"
                    onClick={() => handleApplyClick(position)}
                  >
                    Apply Now <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-positions">
              <p>No positions currently available in this category.</p>
            </div>
          )}
        </div>
      </div>

      <div className="application-process">
        <h2>Our Application Process</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Application Review</h4>
              <p>Our team reviews your application and resume within 5 business days</p>
            </div>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Initial Interview</h4>
              <p>30-minute call to discuss your experience and expectations</p>
            </div>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Technical Assessment</h4>
              <p>Practical task or project related to the position you're applying for</p>
            </div>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Team Interview</h4>
              <p>Meet with potential teammates and discuss collaboration</p>
            </div>
          </div>
          <div className="process-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>Offer</h4>
              <p>We present our offer and welcome you to the team!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="no-position-cta">
        <h2>Don't See a Position That Fits?</h2>
        <p>
          We're always looking for talented individuals to join our team. Send us your resume and
          tell us how you can contribute to Nexovate's mission.
        </p>
        <button 
          className="general-apply-btn"
          onClick={() => handleApplyClick({
            id: 'general',
            title: 'General Application',
            category: 'general',
            location: 'Remote',
            type: 'Any'
          })}
        >
          <PlusCircle size={20} />
          Submit General Application
        </button>
      </div>
      
      {/* Custom Application Form Modal */}
      {showModal && currentPosition && (
        <div className="application-modal-overlay">
          <div className="application-modal">
            <div className="modal-header">
              <h3>Apply for {currentPosition.title}</h3>
              <button className="close-modal-btn" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <form ref={formRef} onSubmit={handleFormSubmit} className="application-form">
                <div className="form-group">
                  <label htmlFor="full_name">Full Name *</label>
                  <input 
                    type="text" 
                    id="full_name" 
                    name="full_name" 
                    required 
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn Profile</label>
                  <input 
                    type="url" 
                    id="linkedin" 
                    name="linkedin" 
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="portfolio">Portfolio/Website URL</label>
                  <input 
                    type="url" 
                    id="portfolio" 
                    name="portfolio" 
                    placeholder="https://your-website.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">Current Location *</label>
                  <input 
                    type="text" 
                    id="location" 
                    name="location" 
                    required 
                    placeholder="City, Country"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="experience">Years of Relevant Experience *</label>
                  <select id="experience" name="experience" required>
                    <option value="">Select years of experience</option>
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="6-10 years">6-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="resume">Resume/CV (PDF only) *</label>
                  <input 
                    type="file" 
                    id="resume" 
                    name="resume" 
                    accept=".pdf" 
                    required
                  />
                  <small className="file-note">Max file size: 5MB</small>
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="cover_letter">Cover Letter</label>
                  <textarea 
                    id="cover_letter" 
                    name="cover_letter" 
                    rows="4" 
                    placeholder="Tell us why you're interested in this position and how your experience makes you a good fit"
                  ></textarea>
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="additional_info">Additional Information</label>
                  <textarea 
                    id="additional_info" 
                    name="additional_info" 
                    rows="3" 
                    placeholder="Anything else you'd like us to know?"
                  ></textarea>
                </div>
                
                <div className="form-group full-width">
                  <div className="checkbox-group">
                    <input type="checkbox" id="privacy_policy" name="privacy_policy" required />
                    <label htmlFor="privacy_policy">
                      I agree to the processing of my personal data according to the Privacy Policy *
                    </label>
                  </div>
                </div>
                
                {formError && <div className="form-error">{formError}</div>}
                
                <div className="form-submit">
                  <button 
                    type="submit" 
                    className="submit-btn" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Submitting Application...</>
                    ) : (
                      <>Submit Application <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <p className="privacy-note">Your information will be handled according to our Privacy Policy.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="confirmation-message">
          <div className="confirmation-content">
            <div className="success-icon">
              <Check size={32} />
            </div>
            <h3>Application Submitted!</h3>
            <p>Thank you for your interest in {currentPosition?.title}. Our team will review your application and contact you soon.</p>
            <button className="close-confirmation-btn" onClick={() => setShowConfirmation(false)}>
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OpenPositions;