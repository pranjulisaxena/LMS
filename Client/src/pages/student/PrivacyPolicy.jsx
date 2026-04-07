// PrivacyPolicy.jsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './CSS/PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);
  const sectionsRef = useRef({});

  const policySections = [
    {
      id: 'information',
      title: '📋 Information We Collect',
      content: `We collect information that you provide directly to us, such as when you create an account, enroll in courses, participate in discussions, or contact support. This may include:
        • Name and contact information (email address, phone number)
        • Account credentials (username, password)
        • Profile information (bio, profile picture, areas of interest)
        • Payment information for course purchases (processed securely through third-party payment gateways)
        • Course progress, quiz results, and certificates earned`
    },
    {
      id: 'usage',
      title: '📊 Usage Data & Analytics',
      content: `We automatically collect certain information about your interaction with our LMS platform:
        • Device information (browser type, operating system, device identifiers)
        • Log data (IP address, access times, pages viewed, links clicked)
        • Learning analytics (time spent on courses, completion rates, assessment scores)
        • Feature usage patterns to improve our platform's user experience
        • Performance data to optimize content delivery and loading speeds`
    },
    {
      id: 'cookies',
      title: '🍪 Cookies & Tracking Technologies',
      content: `We use cookies and similar tracking technologies to enhance your learning experience:
        • Essential cookies for platform functionality (login sessions, course progress)
        • Preference cookies to remember your settings and language choices
        • Analytics cookies to understand how users interact with our content
        • Marketing cookies to deliver relevant course recommendations
        You can manage cookie preferences through your browser settings, but disabling certain cookies may affect platform functionality.`
    },
    {
      id: 'sharing',
      title: '🤝 How We Share Information',
      content: `We respect your privacy and limit information sharing to essential purposes:
        • With instructors to provide course feedback and support your learning
        • With service providers who assist in platform operations (hosting, analytics, payment processing)
        • To comply with legal obligations or protect rights and safety
        • In aggregated, anonymized form for research and platform improvement
        • With your explicit consent for specific purposes
        We never sell your personal information to third parties.`
    },
    {
      id: 'security',
      title: '🔒 Data Security & Retention',
      content: `Your data security is our priority:
        • All data encrypted in transit using TLS/SSL protocols
        • Sensitive information encrypted at rest using industry-standard algorithms
        • Regular security audits and vulnerability assessments
        • Access controls limiting employee access to user data
        • Data retained as long as your account is active or as needed for legitimate purposes
        • Account deletion option available with 30-day grace period for data recovery`
    },
    {
      id: 'rights',
      title: '⚖️ Your Privacy Rights',
      content: `Depending on your location, you may have the following rights:
        • Access your personal data and request a copy
        • Correct inaccurate or incomplete information
        • Request deletion of your data (subject to legal obligations)
        • Opt-out of marketing communications
        • Data portability for transferring your learning records
        • Lodge complaints with supervisory authorities
        To exercise these rights, contact our Privacy Team at privacy@lms-platform.com`
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className={styles.background}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeIcon}>🔐</span>
            <span>Updated: March 2026</span>
          </div>
          <h1 className={styles.heroTitle}>
            Privacy <span className={styles.gradientText}>Policy</span>
          </h1>
          <p className={styles.heroDescription}>
            Your trust matters to us. Learn how we protect, manage, and respect your personal information
            while you learn and grow with our Learning Management System.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainGrid}>
        {/* Sidebar Navigation */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Contents</h3>
            <nav className={styles.navMenu}>
              {policySections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`${styles.navItem} ${activeSection === section.id ? styles.navItemActive : ''}`}
                >
                  <span className={styles.navIcon}>{section.title.charAt(0)}</span>
                  <span>{section.title.split(' ').slice(1).join(' ')}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className={styles.sidebarCard}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>💬</div>
              <h4>Have Questions?</h4>
              <p>Our privacy team is here to help</p>
              <button className={styles.contactBtn}>Contact Support</button>
            </div>
          </div>
        </aside>

        {/* Content Sections */}
        <main className={styles.content}>
          {policySections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              ref={(el) => (sectionsRef.current[section.id] = el)}
              className={`${styles.policySection} ${activeSection === section.id ? styles.sectionActive : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>{section.title.charAt(0)}</div>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
              </div>
              <div className={styles.sectionContent}>
                {section.content.split('\n').map((paragraph, idx) => (
                  paragraph.trim() && (
                    <p key={idx} className={styles.paragraph}>
                      {paragraph.trim().startsWith('•') ? (
                        <span className={styles.bulletPoint}>
                          <span className={styles.bulletIcon}>▹</span>
                          {paragraph.trim().substring(1)}
                        </span>
                      ) : (
                        paragraph
                      )}
                    </p>
                  )
                ))}
              </div>
            </div>
          ))}

          {/* Additional Legal Info */}
          <div className={styles.legalFooter}>
            <div className={styles.legalGrid}>
              <div className={styles.legalItem}>
                <h4>Data Controller</h4>
                <p>LMS Platform Inc.<br />123 Learning Avenue, Suite 100<br />San Francisco, CA 94105</p>
              </div>
              <div className={styles.legalItem}>
                <h4>DPO Contact</h4>
                <p>privacy@lms-platform.com<br />+1 (800) 555-0123</p>
              </div>
              <div className={styles.legalItem}>
                <h4>Legal Basis</h4>
                <p>GDPR, CCPA, PIPEDA compliant<br />Last reviewed: March 2026</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <button className={styles.fab} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span>↑</span>
      </button>
    </div>
  );
};

export default PrivacyPolicy;