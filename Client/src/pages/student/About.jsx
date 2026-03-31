import { useEffect, useState } from "react";
import styles from "./CSS/About.module.css";
import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate();

  // Dynamic Features Data
  const features = [
    { title: "Expert Courses", desc: "Learn from industry experts." },
    { title: "Fast Learning", desc: "Short & effective lessons." },
    { title: "Practical Skills", desc: "Hands-on real projects." },
    { title: "Learn Anywhere", desc: "Access anytime, anywhere." },
  ];

  // Stats Counter Animation
  const [counts, setCounts] = useState({
    students: 0,
    courses: 0,
    instructors: 0,
    success: 0,
  });

  useEffect(() => {
    const target = {
      students: 10000,
      courses: 500,
      instructors: 50,
      success: 95,
    };

    const interval = setInterval(() => {
      setCounts((prev) => ({
        students: prev.students < target.students ? prev.students + 200 : target.students,
        courses: prev.courses < target.courses ? prev.courses + 10 : target.courses,
        instructors: prev.instructors < target.instructors ? prev.instructors + 1 : target.instructors,
        success: prev.success < target.success ? prev.success + 1 : target.success,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>

      {/* HERO */}
     <section className={styles.hero}>
  <div className={styles.overlay}></div>

  <h1 className={styles.title}>
    Learn <span>Without Limits</span>
  </h1>

  <p className={styles.subtitle}>
    Unlock your potential with world-class courses, interactive lessons,
    and real-world projects.
  </p>

  <div className={styles.btnGroup}>
    <button className={styles.primaryBtn} onClick={() => navigate('/')}>Start Learning</button>
    <button className={styles.secondaryBtn} onClick={() => navigate('/course-list')}>Explore Courses</button>
  </div>

  {/* Floating Shapes */}
  <div className={styles.circle1}></div>
  <div className={styles.circle2}></div>
  <div className={styles.circle3}></div>
</section>

      {/* FEATURES */}
      <section className={styles.features}>
        <h2>Why Choose Us</h2>

        <div className={styles.cardContainer}>
          {features.map((item, index) => (
            <div key={index} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className={styles.mission}>
        <h2>Our Mission</h2>
        <p>
          We make education accessible, affordable, and engaging for everyone.
        </p>
      </section>

      {/* STATS */}
      <section className={styles.stats}>
        <div>
          <h3>{counts.students}+</h3>
          <p>Students</p>
        </div>
        <div>
          <h3>{counts.courses}+</h3>
          <p>Courses</p>
        </div>
        <div>
          <h3>{counts.instructors}+</h3>
          <p>Instructors</p>
        </div>
        <div>
          <h3>{counts.success}%</h3>
          <p>Success Rate</p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2>Ready to Start?</h2>
        <button className={styles.ctaBtn} onClick={() => navigate('/')}>Join Now</button>
      </section>

    </div>
  );
}

export default About;