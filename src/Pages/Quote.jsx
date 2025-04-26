import { useState, useRef } from 'react';
import './Quote.css';
import emailjs from '@emailjs/browser';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function QuoteCalculator({ onSubmitSuccess }) {
  // State for all selections
  const [selectedWebFeatures, setSelectedWebFeatures] = useState([]);
  const [selectedAppFeatures, setSelectedAppFeatures] = useState([]);
  const [selectedMarketingFeatures, setSelectedMarketingFeatures] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState('basic');
  const [customRequirements, setCustomRequirements] = useState('');
  const [timeline, setTimeline] = useState('standard');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const [quoteGenerated, setQuoteGenerated] = useState(false);

  // Feature options with lower pricing (₹5,000 to ₹25,000 range)
  const webFeatures = [
    { id: 'responsive', name: 'Responsive Design', price: 8000 },
    { id: 'cms', name: 'Content Management System', price: 15000 },
    { id: 'ecommerce', name: 'E-Commerce Functionality', price: 25000 },
    { id: 'blog', name: 'Blog Module', price: 7500 },
    { id: 'seo', name: 'SEO Optimization', price: 9000 },
    { id: 'analytics', name: 'Analytics Integration', price: 6000 },
    { id: 'security', name: 'Enhanced Security', price: 12000 },
    { id: 'multilingual', name: 'Multilingual Support', price: 14000 }
  ];

  const appFeatures = [
    { id: 'auth', name: 'User Authentication', price: 12000 },
    { id: 'push', name: 'Push Notifications', price: 9000 },
    { id: 'offline', name: 'Offline Mode', price: 18000 },
    { id: 'social', name: 'Social Media Integration', price: 7500 },
    { id: 'payments', name: 'Payment Processing', price: 22000 },
    { id: 'location', name: 'Location Services', price: 10000 },
    { id: 'cloud', name: 'Cloud Synchronization', price: 15000 },
    { id: 'analytics_app', name: 'App Analytics', price: 8000 }
  ];

  // Marketing Features with lower pricing
  const marketingFeatures = [
    { id: 'social_media', name: 'Social Media Management', price: 10000 },
    { id: 'content_creation', name: 'Content Creation', price: 12000 },
    { id: 'email_marketing', name: 'Email Marketing Campaigns', price: 8000 },
    { id: 'ppc', name: 'PPC Advertising', price: 20000 },
    { id: 'seo_marketing', name: 'SEO Marketing Campaign', price: 15000 },
    { id: 'analytics_reporting', name: 'Analytics & Reporting', price: 7000 },
    { id: 'brand_strategy', name: 'Brand Strategy', price: 25000 },
    { id: 'marketing_consultation', name: 'Marketing Consultation', price: 9000 }
  ];

  const designOptions = {
    basic: { name: 'Basic Design', price: 5000 },
    premium: { name: 'Premium Design', price: 15000 },
    custom: { name: 'Custom Design', price: 25000 }
  };

  const timelineOptions = {
    standard: { name: 'Standard (8-12 weeks)', multiplier: 1 },
    expedited: { name: 'Expedited (4-8 weeks)', multiplier: 1.5 },
    rush: { name: 'Rush (2-4 weeks)', multiplier: 2 }
  };

  // Calculate base price
  const calculateBasePrice = () => {
    const webBase = 20000; // Lower base price
    const appBase = 25000; // Lower base price
    const marketingBase = 15000; // Lower base price
    
    const webFeaturesTotal = selectedWebFeatures.reduce((total, featureId) => {
      const feature = webFeatures.find(f => f.id === featureId);
      return total + (feature ? feature.price : 0);
    }, 0);
    
    const appFeaturesTotal = selectedAppFeatures.reduce((total, featureId) => {
      const feature = appFeatures.find(f => f.id === featureId);
      return total + (feature ? feature.price : 0);
    }, 0);

    const marketingFeaturesTotal = selectedMarketingFeatures.reduce((total, featureId) => {
      const feature = marketingFeatures.find(f => f.id === featureId);
      return total + (feature ? feature.price : 0);
    }, 0);
    
    const designPrice = designOptions[selectedDesign].price;
    
    let totalBase = designPrice;
    
    if (selectedWebFeatures.length > 0) {
      totalBase += webBase + webFeaturesTotal;
    }
    
    if (selectedAppFeatures.length > 0) {
      totalBase += appBase + appFeaturesTotal;
    }
    
    if (selectedMarketingFeatures.length > 0) {
      totalBase += marketingBase + marketingFeaturesTotal;
    }
    
    return totalBase;
  };

  // Calculate final price with timeline adjustment
  const calculateTotalPrice = () => {
    const basePrice = calculateBasePrice();
    const timelineMultiplier = timelineOptions[timeline].multiplier;
    return basePrice * timelineMultiplier;
  };

  // Toggle feature selection
  const toggleWebFeature = (featureId) => {
    setSelectedWebFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const toggleAppFeature = (featureId) => {
    setSelectedAppFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const toggleMarketingFeature = (featureId) => {
    setSelectedMarketingFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  // Handle contact info changes
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate selected features list for email
  const generateSelectedFeaturesList = () => {
    let featuresList = '';
    
    if (selectedWebFeatures.length > 0) {
      featuresList += '\nWeb Features:\n';
      selectedWebFeatures.forEach(id => {
        const feature = webFeatures.find(f => f.id === id);
        featuresList += `- ${feature.name}: ₹${feature.price.toLocaleString()}\n`;
      });
    }
    
    if (selectedAppFeatures.length > 0) {
      featuresList += '\nApp Features:\n';
      selectedAppFeatures.forEach(id => {
        const feature = appFeatures.find(f => f.id === id);
        featuresList += `- ${feature.name}: ₹${feature.price.toLocaleString()}\n`;
      });
    }
    
    if (selectedMarketingFeatures.length > 0) {
      featuresList += '\nMarketing Features:\n';
      selectedMarketingFeatures.forEach(id => {
        const feature = marketingFeatures.find(f => f.id === id);
        featuresList += `- ${feature.name}: ₹${feature.price.toLocaleString()}\n`;
      });
    }
    
    featuresList += `\nDesign: ${designOptions[selectedDesign].name} (₹${designOptions[selectedDesign].price.toLocaleString()})`;
    featuresList += `\nTimeline: ${timelineOptions[timeline].name}`;
    
    return featuresList;
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });
    
    const totalPrice = calculateTotalPrice();
    const selectedFeatures = generateSelectedFeaturesList();
    
    // Prepare email data
    const emailData = {
      to_name: contactInfo.name,
      to_email: contactInfo.email,
      from_name: "Your Company Name",
      subject: "Your Custom Project Quote",
      message: `Dear ${contactInfo.name},

Thank you for requesting a quote from us. Based on your selections, we've prepared the following estimate:

${selectedFeatures}

${customRequirements ? `\nAdditional Requirements:\n${customRequirements}\n` : ''}

Base Price: ₹${calculateBasePrice().toLocaleString()}
Total Price: ₹${totalPrice.toLocaleString()}

We'll contact you shortly to discuss your project in more detail.

Best regards,
Your Company Team`,
      client_name: contactInfo.name,
      client_email: contactInfo.email,
      client_phone: contactInfo.phone,
      client_company: contactInfo.company,
      total_price: `₹${totalPrice.toLocaleString()}`
    };
    
    // Send email using EmailJS
    // Replace the service_id, template_id, and user_id with your actual EmailJS credentials
    emailjs.send(
      'service_hmwgcg9', 
      'template_ptc81te', 
      emailData, 
      '26d0T7tkSvcpp4zd6'
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
      
      // Show popup instead of inline message
      setShowPopup(true);
      setQuoteGenerated(true);
      
      // Call the success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess(emailData);
      }
    })
    .catch((error) => {
      console.error('Email sending failed:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'There was an error sending your quote. Please try again or contact us directly.' 
      });
    })
    .finally(() => {
      setIsSubmitting(false);
      setQuoteGenerated(true); // Enable download button even if email fails
    });
  };

  // Download PDF function
  const downloadQuotePDF = () => {
    const totalPrice = calculateTotalPrice();
    const basePrice = calculateBasePrice();
    
    // Create a new jsPDF instance
    const doc = new jsPDF();
    
    // Add company logo and header
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 128); // Dark blue color
    doc.text('Your Company Name', 105, 20, { align: 'center' });
    
    // Add client info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(`QUOTE #: ${Date.now().toString().substring(5)}`, 20, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 46);
    doc.text(`Client: ${contactInfo.name}`, 20, 52);
    doc.text(`Company: ${contactInfo.company || 'N/A'}`, 20, 58);
    doc.text(`Email: ${contactInfo.email}`, 20, 64);
    doc.text(`Phone: ${contactInfo.phone || 'N/A'}`, 20, 70);
    
    // Add quote details
    let yPos = 85;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 128); // Dark blue color
    doc.text('Project Quote Details', 105, yPos, { align: 'center' });
    yPos += 10;

    // Add selected features tables
    const tableData = [];
    
    // Add web features if selected
    if (selectedWebFeatures.length > 0) {
      tableData.push([{ content: 'Web Development Base', colSpan: 2, styles: { fontStyle: 'bold', fillColor: [220, 220, 220] } }]);
      tableData.push(['Base Cost', `₹${(20000).toLocaleString()}`]);
      
      selectedWebFeatures.forEach(id => {
        const feature = webFeatures.find(f => f.id === id);
        tableData.push([feature.name, `₹${feature.price.toLocaleString()}`]);
      });
    }
    
    // Add app features if selected
    if (selectedAppFeatures.length > 0) {
      tableData.push([{ content: 'App Development Base', colSpan: 2, styles: { fontStyle: 'bold', fillColor: [220, 220, 220] } }]);
      tableData.push(['Base Cost', `₹${(25000).toLocaleString()}`]);
      
      selectedAppFeatures.forEach(id => {
        const feature = appFeatures.find(f => f.id === id);
        tableData.push([feature.name, `₹${feature.price.toLocaleString()}`]);
      });
    }
    
    // Add marketing features if selected
    if (selectedMarketingFeatures.length > 0) {
      tableData.push([{ content: 'Marketing Services Base', colSpan: 2, styles: { fontStyle: 'bold', fillColor: [220, 220, 220] } }]);
      tableData.push(['Base Cost', `₹${(15000).toLocaleString()}`]);
      
      selectedMarketingFeatures.forEach(id => {
        const feature = marketingFeatures.find(f => f.id === id);
        tableData.push([feature.name, `₹${feature.price.toLocaleString()}`]);
      });
    }
    
    // Add design option
    tableData.push([{ content: 'Design Package', colSpan: 2, styles: { fontStyle: 'bold', fillColor: [220, 220, 220] } }]);
    tableData.push([designOptions[selectedDesign].name, `₹${designOptions[selectedDesign].price.toLocaleString()}`]);
    
    // Add timeline option
    tableData.push([{ content: 'Timeline', colSpan: 2, styles: { fontStyle: 'bold', fillColor: [220, 220, 220] } }]);
    tableData.push([
      timelineOptions[timeline].name, 
      timelineOptions[timeline].multiplier > 1 ? 
        `${(timelineOptions[timeline].multiplier * 100).toFixed(0)}% of base` : 
        'Standard rate'
    ]);
    
    // Add totals
    tableData.push([{ content: 'Quote Summary', colSpan: 2, styles: { fontStyle: 'bold', fillColor: [200, 200, 255] } }]);
    tableData.push(['Base Price', `₹${basePrice.toLocaleString()}`]);
    tableData.push([{ content: 'Total Quote', styles: { fontStyle: 'bold' } }, { content: `₹${totalPrice.toLocaleString()}`, styles: { fontStyle: 'bold' } }]);
    
    // Add the table to the document
    doc.autoTable({
      startY: yPos,
      head: [['Item', 'Price']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 128], textColor: [255, 255, 255] },
      margin: { top: 20 },
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 40, halign: 'right' }
      }
    });
    
    // Add custom requirements if any
    if (customRequirements) {
      const finalY = doc.lastAutoTable.finalY || 120;
      doc.text('Additional Requirements:', 20, finalY + 10);
      
      // Add a simple text box with the requirements
      const splitText = doc.splitTextToSize(customRequirements, 170);
      doc.text(splitText, 20, finalY + 18);
    }
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      
      // Add footer text
      const footer = "This quote is valid for 30 days from the date of issue. Terms and conditions apply.";
      doc.text(footer, 105, doc.internal.pageSize.height - 10, { align: 'center' });
      
      // Add page number
      doc.text(`Page ${i} of ${pageCount}`, 190, doc.internal.pageSize.height - 10, { align: 'right' });
    }
    
    // Save the PDF
    doc.save(`Project_Quote_${contactInfo.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="quote-calculator">
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-content">
              <h3>Thank you!</h3>
              <p>We will contact you shortly.</p>
              <button onClick={closePopup} className="popup-close-btn">Close</button>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="features-grid">
          {/* Web Development Features */}
          <div className="feature-section">
            <h2 className="section-title">Web Development Features</h2>
            <div className="feature-list">
              {webFeatures.map(feature => (
                <div key={feature.id} className="feature-item">
                  <div className="feature-label">
                    <input
                      type="checkbox"
                      id={`web-${feature.id}`}
                      checked={selectedWebFeatures.includes(feature.id)}
                      onChange={() => toggleWebFeature(feature.id)}
                    />
                    <label htmlFor={`web-${feature.id}`}>{feature.name}</label>
                  </div>
                  <span className="feature-price">₹{feature.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* App Development Features */}
          <div className="feature-section">
            <h2 className="section-title">App Development Features</h2>
            <div className="feature-list">
              {appFeatures.map(feature => (
                <div key={feature.id} className="feature-item">
                  <div className="feature-label">
                    <input
                      type="checkbox"
                      id={`app-${feature.id}`}
                      checked={selectedAppFeatures.includes(feature.id)}
                      onChange={() => toggleAppFeature(feature.id)}
                    />
                    <label htmlFor={`app-${feature.id}`}>{feature.name}</label>
                  </div>
                  <span className="feature-price">₹{feature.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Marketing Features */}
          <div className="feature-section">
            <h2 className="section-title">Marketing Services</h2>
            <div className="feature-list">
              {marketingFeatures.map(feature => (
                <div key={feature.id} className="feature-item">
                  <div className="feature-label">
                    <input
                      type="checkbox"
                      id={`marketing-${feature.id}`}
                      checked={selectedMarketingFeatures.includes(feature.id)}
                      onChange={() => toggleMarketingFeature(feature.id)}
                    />
                    <label htmlFor={`marketing-${feature.id}`}>{feature.name}</label>
                  </div>
                  <span className="feature-price">₹{feature.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Additional Options */}
        <div className="additional-options">
          <h2 className="section-title">Additional Options</h2>
          
          <div className="options-grid">
            {/* Design Options */}
            <div className="option-group">
              <h3 className="option-title">Design Package</h3>
              <div className="option-list">
                {Object.entries(designOptions).map(([key, option]) => (
                  <div key={key} className="option-item">
                    <div className="option-label">
                      <input
                        type="radio"
                        id={`design-${key}`}
                        name="design"
                        checked={selectedDesign === key}
                        onChange={() => setSelectedDesign(key)}
                      />
                      <label htmlFor={`design-${key}`}>{option.name}</label>
                    </div>
                    <span className="option-price">₹{option.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Timeline Options */}
            <div className="option-group">
              <h3 className="option-title">Timeline</h3>
              <div className="option-list">
                {Object.entries(timelineOptions).map(([key, option]) => (
                  <div key={key} className="option-item">
                    <input
                      type="radio"
                      id={`timeline-${key}`}
                      name="timeline"
                      checked={timeline === key}
                      onChange={() => setTimeline(key)}
                    />
                    <label htmlFor={`timeline-${key}`} className="timeline-label">
                      {option.name} 
                      {option.multiplier > 1 && <span className="multiplier">(+{(option.multiplier - 1) * 100}%)</span>}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Custom Requirements */}
          <div className="custom-requirements">
            <h3 className="option-title">Additional Requirements</h3>
            <textarea
              value={customRequirements}
              onChange={(e) => setCustomRequirements(e.target.value)}
              rows="3"
              placeholder="Describe any additional requirements or special requests..."
            ></textarea>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="contact-section">
          <h2 className="section-title">Contact Information</h2>
          <div className="contact-fields">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactInfo.name}
                onChange={handleContactChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={contactInfo.phone}
                onChange={handleContactChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={contactInfo.company}
                onChange={handleContactChange}
              />
            </div>
          </div>
        </div>
        
        {/* Quote Summary */}
        <div className="quote-summary">
          <div className="base-price">
            <span>Base Price:</span>
            <span>₹{calculateBasePrice().toLocaleString()}</span>
          </div>
          <div className="total-price">
            <span>Total Quote:</span>
            <span>₹{calculateTotalPrice().toLocaleString()}</span>
          </div>
        </div>
        
        {submitMessage.text && (
          <div className={`submit-message ${submitMessage.type}`}>
            {submitMessage.text}
          </div>
        )}
        
        <div className="action-buttons">
          <button 
            type="submit" 
            className="submit-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Generating Quote...' : 'Generate Quote'}
          </button>
          
          {quoteGenerated && (
            <button 
              type="button" 
              className="download-button" 
              onClick={downloadQuotePDF}
            >
              Download Quotation PDF
            </button>
          )}
        </div>
      </form>
    </div>
  );
}