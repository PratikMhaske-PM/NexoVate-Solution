import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const [emailjs, setEmailjs] = useState(null);

  useEffect(() => {
    // Dynamically import emailjs-com only on the client side
    import('emailjs-com').then((module) => {
      setEmailjs(module);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailjs) return;

    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null }
    });

    // EmailJS configuration - replace with your actual service, template, and user IDs
    emailjs.send(
      'service_ic368nn',  // Replace with your EmailJS service ID
      'template_dm2su6h', // Replace with your EmailJS template ID
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      },
      'vzrCFom8VVrwUL9Zl'      // Replace with your EmailJS user ID
    )
      .then(response => {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: 'Message sent successfully!' }
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch(error => {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: 'An error occurred. Please try again later.' }
        });
      });
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>Get in Touch</h2>
        <p className="contact-intro">Have questions or feedback? We'd love to hear from you!</p>
        
        {status.info.error && (
          <div className="error-message">
            {status.info.msg}
          </div>
        )}
        
        {status.submitted && (
          <div className="success-message">
            {status.info.msg}
          </div>
        )}
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this regarding?"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              rows="5"
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={status.submitting}
          >
            {status.submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="contact-info">
          <div className="info-item">
            <i className="icon email-icon"></i>
            <p>pratikmhaske@gmail.com</p>
          </div>
          <div className="info-item">
            <i className="icon phone-icon"></i>
            <p>+91 9529214473</p>
          </div>
          <div className="info-item">
            <i className="icon location-icon"></i>
            <p>Wagholi, Pune-412207</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
