import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { triggerPageTransition } from './Transition';
import './styles/Contact.css';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      details: 'support@biteverse.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: '📍',
      title: 'Office',
      details: 'Delhi University, North Block',
      description: 'Visit our campus office'
    },
    {
      icon: '🕐',
      title: 'Hours',
      details: '9 AM - 6 PM IST',
      description: 'Monday to Friday'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: 'Available on Dashboard',
      description: 'Real-time support for members'
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', url: '#', color: '#000' },
    { name: 'Instagram', icon: '📷', url: '#', color: '#E1306C' },
    { name: 'LinkedIn', icon: '💼', url: '#', color: '#0077B5' },
    { name: 'Discord', icon: '💜', url: '#', color: '#5865F2' }
  ];

  const faqs = [
    {
      question: 'How do I get started with BiteVerse?',
      answer: 'Click "Get Started" on the landing page, sign up with your email or Google, verify via OTP, and start exploring food stalls on your campus!'
    },
    {
      question: 'How do I earn XP points?',
      answer: 'You earn XP by reviewing dishes (+50 pts), daily logins (+10 pts), referrals (+100 pts), and achievements. The more you engage, the more you earn!'
    },
    {
      question: 'Can I redeem my points?',
      answer: 'Absolutely! Visit the Rewards section to redeem your points for discounts, coupons, merchandise, and exclusive perks based on your tier.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes! We use JWT-based authentication with OTP verification for maximum security. Your personal information is encrypted and never shared.'
    },
    {
      question: 'Can I use BiteVerse offline?',
      answer: 'Currently, BiteVerse is an online-only platform. We\'re working on offline features for future releases.'
    },
    {
      question: 'How do I report a stall or review?',
      answer: 'Use the report button on any stall or review page. Our moderation team reviews all reports within 48 hours.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! We\'ll get back to you soon. 🎉'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const handleBack = async () => {
    await triggerPageTransition(0, 0, { duration: 700 });
    navigate('/');
  };

  return (
    <div className="contact-container">
      {/* Header */}
      <header className="contact-header">
        <button className="contact-back-btn" onClick={handleBack}>
          ← Back
        </button>
        <h1>Get in Touch</h1>
        <p className="contact-subtitle">We'd love to hear from you. Drop us a message or reach out through any of our channels.</p>
      </header>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="contact-info-grid">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="info-card">
              <div className="info-icon">{info.icon}</div>
              <h4>{info.title}</h4>
              <p className="info-details">{info.details}</p>
              <p className="info-description">{info.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="contact-wrapper">
          {/* Form */}
          <div className="contact-form-wrapper">
            <h2>📧 Or Send Me a Message</h2>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  rows="6"
                  required
                />
              </div>

              {submitStatus && (
                <div className={`submit-status ${submitStatus.type}`}>
                  <span className="status-icon">
                    {submitStatus.type === 'success' ? '✓' : '✕'}
                  </span>
                  <span className="status-message">{submitStatus.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Side Content */}
          <div className="contact-side-content">
            <div className="side-card">
              <h3>💡 Quick Tips</h3>
              <ul className="tips-list">
                <li>Include your college name for faster support</li>
                <li>Be specific about your issue or feedback</li>
                <li>Check our FAQ section first</li>
                <li>Average response time: 24 hours</li>
              </ul>
            </div>

            <div className="side-card social-card">
              <h3>🌐 Follow Us</h3>
              <div className="social-links">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    className="social-link"
                    style={{ '--social-color': link.color }}
                    title={link.name}
                  >
                    <span className="social-icon">{link.icon}</span>
                    <span className="social-name">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <div className="faq-header">
                <h4>{faq.question}</h4>
                <span className="faq-icon">?</span>
              </div>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Response Time Info */}
      <section className="response-time-section">
        <div className="response-card">
          <div className="response-icon">⏱️</div>
          <h3>We Value Your Time</h3>
          <p>Our support team typically responds within 24 hours. For urgent issues, use the live chat feature available in your dashboard.</p>
          <button className="dashboard-link" onClick={async () => {
            await triggerPageTransition(0, 0, { duration: 700 });
            navigate('/dashboard');
          }}>
            Go to Dashboard →
          </button>
        </div>
      </section>
    </div>
  );
}
