import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Book.css';

const Book = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    projectDescription: '',
    budget: '',
    referral: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    'Web Development Consultation',
    'Mobile App Development',
    'UI/UX Design',
    'E-commerce Development',
    'Custom Software Development',
    'Website Maintenance & Support',
    'API Integration',
    'Cloud Solutions'
  ];

  const availableTimes = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  // Updated budget ranges in Indian Rupees
  const budgetRanges = [
    'Under ₹1,000',
    '₹1,000 - ₹2,000',
    '₹2,000 - ₹3,000',
    '₹3,000 - ₹4,000',
    '₹4,000 - ₹5,000',
    '₹5,000+'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // EmailJS configuration
      // Replace these with your actual EmailJS service ID, template ID, and public key
      const serviceID = 'service_hmwgcg9';
      const templateID = 'template_ptc81te';
      const publicKey = '26d0T7tkSvcpp4zd6';
      
      emailjs.sendForm(serviceID, templateID, form.current, publicKey)
        .then((result) => {
          console.log('Email sent successfully:', result.text);
          setIsSubmitted(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error sending email:', error.text);
          setIsLoading(false);
          alert('Failed to send email. Please try again later.');
        });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      companyName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      service: '',
      projectDescription: '',
      budget: '',
      referral: ''
    });
    setIsSubmitted(false);
  };

  // Get tomorrow's date for min date attribute
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get date 60 days from now for max date attribute (longer booking window for tech projects)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);
    return maxDate.toISOString().split('T')[0];
  };

  if (isSubmitted) {
    return (
      <div className="booking-container">
        <div className="booking-confirmation">
          <h2>Consultation Confirmed!</h2>
          <div className="confirmation-details">
            <p><strong>Name:</strong> {formData.name}</p>
            {formData.companyName && <p><strong>Company:</strong> {formData.companyName}</p>}
            <p><strong>Service:</strong> {formData.service}</p>
            <p><strong>Date:</strong> {formatDate(formData.date)}</p>
            <p><strong>Time:</strong> {formData.time}</p>
            <p><strong>Contact:</strong> {formData.email} | {formData.phone}</p>
            {formData.budget && <p><strong>Budget Range:</strong> {formData.budget}</p>}
          </div>
          <div className="project-summary">
            <h3>Project Description</h3>
            <p>{formData.projectDescription}</p>
          </div>
          <p className="confirmation-message">
            Thank you for booking a consultation with our development team! We've sent a confirmation email to {formData.email} with all the details.
            Our team will review your project requirements before the meeting to make our discussion more productive.
          </p>
          <div className="next-steps">
            <h3>Next Steps</h3>
            <ol>
              <li>You'll receive a calendar invite for the scheduled time</li>
              <li>Our team will send you a brief pre-consultation questionnaire</li>
              <li>We'll meet to discuss your project requirements in detail</li>
              <li>You'll receive a project proposal within 3 business days after our consultation</li>
            </ol>
          </div>
          <button className="btn book-another" onClick={resetForm}>
            Book Another Consultation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <h1>Book a Development Consultation</h1>
      <p className="booking-intro">Schedule a consultation with our development team to discuss your project requirements and explore how we can help bring your vision to life.</p>
      <form ref={form} className="booking-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company Name (Optional)</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your company or organization"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="service">Service*</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={errors.service ? 'error' : ''}
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          {errors.service && <span className="error-message">{errors.service}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Preferred Date*</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={getTomorrow()}
              max={getMaxDate()}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="time">Preferred Time*</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={errors.time ? 'error' : ''}
            >
              <option value="">Select a time</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.time && <span className="error-message">{errors.time}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="projectDescription">Project Description*</label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Please describe your project, goals, and any specific requirements or challenges"
            rows="5"
            className={errors.projectDescription ? 'error' : ''}
          ></textarea>
          {errors.projectDescription && 
            <span className="error-message">{errors.projectDescription}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="budget">Estimated Budget (Optional)</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            >
              <option value="">Select budget range</option>
              {budgetRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="referral">How did you hear about us? (Optional)</label>
            <input
              type="text"
              id="referral"
              name="referral"
              value={formData.referral}
              onChange={handleChange}
              placeholder="Google, referral, social media, etc."
            />
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Schedule Consultation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Book;