import React from 'react'
import styles from './CSS/Hero.module.css'
import SearchBar from './SearchBar'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const navigate = useNavigate();
  return (
    <div className={styles.hero}>
      {/* Background Overlay */}
      <div className={styles.overlay}></div>

      {/* Floating Elements */}
      <div className={styles.floatingShapes}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
      </div>

      <div className={styles.container}>
        {/* Main Content */}
        <div className={styles.content}>

          <h1 className={styles.title}>
            Master New Skills with
            <span className={styles.highlight}> Expert-Led</span>
            <br />
            Courses
          </h1>

          <p className={styles.subtitle}>
            Join thousands of learners worldwide and unlock your potential with our
            comprehensive course library. Learn at your own pace, anywhere, anytime.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            <button className={styles.primaryBtn} onClick={() => navigate('/course-list')}>
              Explore Courses
              <span className={styles.arrow}>→</span>
            </button>
            <button className={styles.secondaryBtn} onClick={() => navigate('/about')}>
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50K+</span>
              <span className={styles.statLabel}>Students</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1,200+</span>
              <span className={styles.statLabel}>Courses</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>Success Rate</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className={styles.searchSection}>
          <SearchBar />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>Scroll to explore</div>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </div>
  )
}

export default Hero