// LearnAbout.jsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './CSS/About.module.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [counters, setCounters] = useState({
    students: 0,
    courses: 0,
    instructors: 0,
    countries: 0
  });
  const statsRef = useRef(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  const navigate = useNavigate();

  const statsData = [
    { id: 'students', label: 'Happy Students', value: 50000, suffix: '+', icon: '👨‍🎓' },
    { id: 'courses', label: 'Courses Available', value: 250, suffix: '+', icon: '📚' },
    { id: 'instructors', label: 'Expert Instructors', value: 120, suffix: '+', icon: '👩‍🏫' },
    { id: 'countries', label: 'Countries Reached', value: 45, suffix: '+', icon: '🌍' }
  ];

  const teamMembers = [
    { name: 'Dr. Sarah Johnson', role: 'Founder & CEO', bio: 'Former Stanford professor with 15+ years in ed-tech', image: '👩‍🔬', color: '#B8D5F4' },
    { name: 'Michael Chen', role: 'Head of Learning', bio: 'Curriculum expert and learning experience designer', image: '👨‍💻', color: '#C5E0F4' },
    { name: 'Dr. Emily Rodriguez', role: 'Research Director', bio: 'PhD in Educational Psychology', image: '👩‍🎓', color: '#D0E8F4' },
    { name: 'David Kim', role: 'Technology Lead', bio: 'Full-stack architect and AI specialist', image: '👨‍🔧', color: '#B8D5F4' }
  ];

  const milestones = [
    { year: '2020', title: 'Platform Launch', description: 'Launched with 50 courses and 1000 beta users', icon: '🚀' },
    { year: '2021', title: 'Global Expansion', description: 'Reached learners in 30+ countries worldwide', icon: '🌎' },
    { year: '2022', title: 'AI Integration', description: 'Introduced personalized learning paths', icon: '🤖' },
    { year: '2023', title: 'Mobile App Launch', description: 'Learn on-the-go with our mobile platform', icon: '📱' },
    { year: '2024', title: 'Community Milestone', description: '1M+ learning hours completed', icon: '🎯' },
    { year: '2025', title: 'Future Ready', description: 'Expanding into AR/VR learning experiences', icon: '🔮' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isStatsVisible) {
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;

      statsData.forEach(stat => {
        let current = 0;
        const increment = stat.value / steps;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            setCounters(prev => ({ ...prev, [stat.id]: stat.value }));
            clearInterval(timer);
          } else {
            setCounters(prev => ({ ...prev, [stat.id]: Math.floor(current) }));
          }
        }, stepTime);
      });
    }
  }, [isStatsVisible]);

  const tabContent = {
    mission: {
      title: 'Our Mission',
      content: 'To democratize education by making high-quality learning accessible, engaging, and affordable for everyone, everywhere.',
      details: [
        'Provide world-class education at accessible prices',
        'Bridge the skills gap in emerging technologies',
        'Empower lifelong learning and career growth',
        'Create a supportive global learning community'
      ]
    },
    vision: {
      title: 'Our Vision',
      content: 'A world where anyone, regardless of their background or location, can acquire the skills they need to thrive in the digital economy.',
      details: [
        'Leading the future of online education',
        'Creating meaningful learning experiences',
        'Building bridges between education and employment',
        'Fostering innovation through continuous learning'
      ]
    },
    values: {
      title: 'Our Values',
      content: 'Excellence, Accessibility, Innovation, and Community drive everything we do at LMS Platform.',
      details: [
        '🎯 Excellence: Never compromise on quality',
        '🌍 Accessibility: Education for all',
        '💡 Innovation: Embrace new technologies',
        '🤝 Community: Learn better together'
      ]
    }
  };

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className={styles.background}>
        <div className={styles.animatedBg}>
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
          <div className={styles.circle3}></div>
          <div className={styles.circle4}></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeIcon}>✨</span>
            <span>Welcome to LMS Platform</span>
          </div>
          <h1 className={styles.heroTitle}>
            Learn About <span className={styles.accentText}>Our Journey</span>
          </h1>
          <p className={styles.heroDescription}>
            Discover who we are, what drives us, and how we're transforming education 
            for learners around the globe.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.statNumber}>5+</span>
              <span className={styles.statLabel}>Years of Excellence</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.statNumber}>50k+</span>
              <span className={styles.statLabel}>Active Learners</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.statNumber}>250+</span>
              <span className={styles.statLabel}>Expert Courses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <div 
              key={stat.id} 
              className={styles.statCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>
                {counters[stat.id].toLocaleString()}{stat.suffix}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statGlow}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission/Vision/Tabs Section */}
      <div className={styles.tabsSection}>
        <div className={styles.tabsContainer}>
          <div className={styles.tabsHeader}>
            <button
              className={`${styles.tabBtn} ${activeTab === 'mission' ? styles.active : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              <span>🎯</span> Our Mission
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'vision' ? styles.active : ''}`}
              onClick={() => setActiveTab('vision')}
            >
              <span>👁️</span> Our Vision
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'values' ? styles.active : ''}`}
              onClick={() => setActiveTab('values')}
            >
              <span>💎</span> Our Values
            </button>
          </div>
          <div className={styles.tabContent}>
            <div className={styles.tabContentInner}>
              <h2>{tabContent[activeTab].title}</h2>
              <p className={styles.tabMainText}>{tabContent[activeTab].content}</p>
              <div className={styles.tabDetails}>
                {tabContent[activeTab].details.map((detail, idx) => (
                  <div key={idx} className={styles.detailItem}>
                    <span className={styles.detailDot}>✦</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.tabIllustration}>
              <div className={styles.illustrationCircle}>
                {activeTab === 'mission' && <span>🎯</span>}
                {activeTab === 'vision' && <span>🌟</span>}
                {activeTab === 'values' && <span>💎</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className={styles.timelineSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Our History</span>
          <h2>Journey Through <span className={styles.accentText}>Milestones</span></h2>
          <p>From humble beginnings to global impact — our story of growth and innovation</p>
        </div>
        <div className={styles.timeline}>
          {milestones.map((milestone, index) => (
            <div 
              key={index} 
              className={styles.timelineItem}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.timelineDot}>
                <span>{milestone.icon}</span>
                <div className={styles.timelinePulse}></div>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>{milestone.year}</div>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className={styles.teamSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Leadership</span>
          <h2>Meet Our <span className={styles.accentText}>Team</span></h2>
          <p>Passionate educators, technologists, and innovators driving our mission forward</p>
        </div>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={styles.teamCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.teamImage} style={{ background: member.color }}>
                <span>{member.image}</span>
              </div>
              <div className={styles.teamInfo}>
                <h3>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
                <p className={styles.teamBio}>{member.bio}</p>
              </div>
              <div className={styles.teamSocial}>
                <span>🔗</span>
                <span>🐦</span>
                <span>💼</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaIcon}>🎓</div>
          <h2>Ready to Start Your Learning Journey?</h2>
          <p>Join thousands of learners who are transforming their careers with our platform</p>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaPrimary} onClick={() => navigate('/course-list')}>
              Explore Courses →
            </button>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button className={styles.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span>↑</span>
      </button>
    </div>
  );
};

export default About;