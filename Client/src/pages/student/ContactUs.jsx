// ContactUs.jsx
import React, { useState, useEffect } from 'react';
import styles from './CSS/ContactUs.module.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: '💬' },
    { value: 'technical', label: 'Technical Support', icon: '🔧' },
    { value: 'billing', label: 'Billing & Payments', icon: '💰' },
    { value: 'course', label: 'Course Related', icon: '📚' },
    { value: 'partnership', label: 'Partnership', icon: '🤝' }
  ];

  const contactMethods = [
    { icon: '📧', title: 'Email Us', detail: 'support@lms-platform.com', sub: 'Response within 24 hours' },
    { icon: '📞', title: 'Call Us', detail: '+1 (800) 555-0123', sub: 'Mon-Fri, 9AM-6PM EST' },
    { icon: '💬', title: 'Live Chat', detail: 'Click to start chatting', sub: 'Available 24/7' },
    { icon: '📍', title: 'Visit Us', detail: '123 Learning Avenue, SF', sub: 'By appointment only' }
  ];

  const faqs = [
    { q: 'How do I reset my password?', a: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.' },
    { q: 'Can I get a refund for a course?', a: 'Yes, we offer a 30-day money-back guarantee for all courses.' },
    { q: 'How do I access my certificates?', a: 'Certificates are available in your profile under "Achievements" section.' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '', inquiryType: 'general' });
    
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className={styles.background}>
        <div className={styles.gridPattern}></div>
        <div className={styles.wave1}></div>
        <div className={styles.wave2}></div>
        <div className={styles.particle1}></div>
        <div className={styles.particle2}></div>
        <div className={styles.particle3}></div>
      </div>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgePulse}></span>
            <span>We're Here to Help</span>
          </div>
          <h1 className={styles.heroTitle}>
            Get in <span className={styles.gradientText}>Touch</span>
          </h1>
          <p className={styles.heroDescription}>
            Have questions about our courses, platform, or anything else? 
            Our team is ready to assist you with personalized support.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainGrid}>
        {/* Contact Methods Cards */}
        <div className={styles.methodsSection}>
          {contactMethods.map((method, index) => (
            <div 
              key={index} 
              className={styles.methodCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.methodIcon}>{method.icon}</div>
              <div className={styles.methodInfo}>
                <h3>{method.title}</h3>
                <p className={styles.methodDetail}>{method.detail}</p>
                <span className={styles.methodSub}>{method.sub}</span>
              </div>
              <div className={styles.methodArrow}>→</div>
            </div>
          ))}
        </div>

        {/* Form and Info Grid */}
        <div className={styles.formGrid}>
          {/* Contact Form */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <div className={styles.formHeaderIcon}>✉️</div>
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={`${styles.formGroup} ${focusedField === 'name' ? styles.focused : ''}`}>
                  <label>Full Name</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>👤</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className={`${styles.formGroup} ${focusedField === 'email' ? styles.focused : ''}`}>
                  <label>Email Address</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>📧</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Inquiry Type</label>
                <div className={styles.inquiryGrid}>
                  {inquiryTypes.map(type => (
                    <label key={type.value} className={styles.inquiryOption}>
                      <input
                        type="radio"
                        name="inquiryType"
                        value={type.value}
                        checked={formData.inquiryType === type.value}
                        onChange={handleChange}
                      />
                      <span className={styles.inquiryContent}>
                        <span className={styles.inquiryIcon}>{type.icon}</span>
                        <span>{type.label}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={`${styles.formGroup} ${focusedField === 'subject' ? styles.focused : ''}`}>
                <label>Subject</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>📝</span>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              <div className={`${styles.formGroup} ${focusedField === 'message' ? styles.focused : ''}`}>
                <label>Message</label>
                <div className={styles.textareaWrapper}>
                  <span className={styles.textareaIcon}>💬</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows="5"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className={styles.btnArrow}>→</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  <span>✓</span> Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* FAQ Section */}
          <div className={styles.faqCard}>
            <div className={styles.faqHeader}>
              <div className={styles.faqHeaderIcon}>❓</div>
              <h2>Frequently Asked Questions</h2>
              <p>Quick answers to common questions</p>
            </div>

            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <details key={index} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>
                    <span className={styles.faqIcon}>📌</span>
                    {faq.q}
                    <span className={styles.faqToggle}>▼</span>
                  </summary>
                  <div className={styles.faqAnswer}>
                    <p>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <div className={styles.faqFooter}>
              <p>Can't find what you're looking for?</p>
              <button className={styles.viewAllBtn}>View All FAQs →</button>
            </div>
          </div>
        </div>

        {/* Social Connect Section */}
        <div className={styles.socialSection}>
          <div className={styles.socialCard}>
            <h3>Connect With Us</h3>
            <p>Follow us on social media for updates, tips, and community discussions</p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <span>📘</span> Facebook
              </a>
              <a href="#" className={styles.socialLink}>
                <span>🐦</span> Twitter
              </a>
              <a href="#" className={styles.socialLink}>
                <span>📸</span> Instagram
              </a>
              <a href="#" className={styles.socialLink}>
                <span>💼</span> LinkedIn
              </a>
              <a href="#" className={styles.socialLink}>
                <span>🎥</span> YouTube
              </a>
            </div>
          </div>

          <div className={styles.mapCard}>
            <h3>📍 Our Location</h3>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapPin}>
                <span>📌</span>
                <div className={styles.mapPinPulse}></div>
              </div>
              <div className={styles.mapAddress}>
                <p>123 Learning Avenue, Suite 100</p>
                <p>San Francisco, CA 94105</p>
                <p>United States</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time Banner */}
      <div className={styles.responseBanner}>
        <div className={styles.responseContent}>
          <div className={styles.responseIcon}>⚡</div>
          <div>
            <strong>Average response time: &lt; 4 hours</strong>
            <p>Our support team is available 24/7 to assist you</p>
          </div>
          <div className={styles.responseStats}>
            <span>98%</span> Customer Satisfaction
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button className={styles.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span>↑</span>
      </button>
    </div>
  );
};

export default ContactUs;