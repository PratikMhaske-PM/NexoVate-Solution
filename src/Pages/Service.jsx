import React, { useEffect, useState } from 'react';
import './Service.css';

// Import icons - In a real project, you'd use an icon library like react-icons
const WebIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const MobileIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12" y2="18" />
  </svg>
);

const CloudIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const AutomationIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
);

const SEOIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SocialIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const AdsIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const BrandingIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 9c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3z" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
  </svg>
);

const ConsultingIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 20V10"></path>
    <path d="M12 20V4"></path>
    <path d="M6 20v-6"></path>
  </svg>
);

const SecurityIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const servicesData = {
  techServices: [
    {
      icon: <WebIcon />,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies'
    },
    {
      icon: <MobileIcon />,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android'
    },
    {
      icon: <CloudIcon />,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment strategies'
    },
    {
      icon: <AutomationIcon />,
      title: 'Automation',
      description: 'Streamlined workflows and process automation solutions'
    }
  ],
  marketingServices: [
    {
      icon: <SEOIcon />,
      title: 'SEO Optimization',
      description: 'Boost your search rankings and organic traffic'
    },
    {
      icon: <SocialIcon />,
      title: 'Social Media',
      description: 'Engage audiences across all social platforms'
    },
    {
      icon: <AdsIcon />,
      title: 'Digital Advertising',
      description: 'Targeted ad campaigns that convert'
    },
    {
      icon: <BrandingIcon />,
      title: 'Branding Strategy',
      description: 'Build a memorable and cohesive brand identity'
    }
  ],
  // Additional services that will be shown when "View All Services" is clicked
  additionalTechServices: [
    {
      icon: <ConsultingIcon />,
      title: 'IT Consulting',
      description: 'Expert guidance on technology strategy and implementation'
    },
    {
      icon: <SecurityIcon />,
      title: 'Cybersecurity',
      description: 'Protect your business with robust security solutions'
    }
  ],
  additionalMarketingServices: [
    {
      icon: <AnalyticsIcon />,
      title: 'Data Analytics',
      description: 'Turn your data into actionable business insights'
    },
    {
      icon: <EmailIcon />,
      title: 'Email Marketing',
      description: 'Engage customers with targeted email campaigns'
    }
  ]
};

const ServiceCard = ({ icon, title, description, index, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, (index * 100) + delay);
    return () => clearTimeout(timer);
  }, [index, delay]);

  return (
    <div className={`service-card ${isVisible ? 'visible' : ''}`}>
      <div className="icon-container">
        {icon}
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
    </div>
  );
};

const Service = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleShowAllServices = () => {
    setShowAllServices(!showAllServices);
  };

  return (
    <section className="services-overview">
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'visible' : ''}`}>
          Our Services
        </h2>
        
        <div className="services-grid">
          {/* Tech Services Column */}
          <div className="services-column">
            <h3 className={`column-title ${isVisible ? 'visible' : ''}`}>Tech Services</h3>
            <div className="services-cards">
              {servicesData.techServices.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  index={index}
                />
              ))}
              
              {/* Additional Tech Services */}
              {showAllServices && servicesData.additionalTechServices.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  index={index}
                  delay={300} // Add delay for animation effect
                />
              ))}
            </div>
          </div>

          {/* Marketing Services Column */}
          <div className="services-column">
            <h3 className={`column-title ${isVisible ? 'visible' : ''}`}>Marketing Services</h3>
            <div className="services-cards">
              {servicesData.marketingServices.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  index={index + 4}
                />
              ))}
              
              {/* Additional Marketing Services */}
              {showAllServices && servicesData.additionalMarketingServices.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  index={index}
                  delay={300} // Add delay for animation effect
                />
              ))}
            </div>
          </div>
        </div>

        <div className={`view-all-button-container ${isVisible ? 'visible' : ''}`}>
          <button className="view-all-button" onClick={toggleShowAllServices}>
            {showAllServices ? 'Show Less' : 'View All Services'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Service;