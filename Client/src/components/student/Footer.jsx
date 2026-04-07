import { useState } from 'react';
import {assets} from '../../assets/assets'
import styles from './CSS/Footer.module.css'

const Footer = () => {

  const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

const handleSubscribe = (email) => {
  if (!email) {
      setMessage("Please enter your email");
      return;
    }

    console.log("Subscribed with email:", email);

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setMessage("Enter a valid email");
      return;
    }

    // Open mail client
    window.location.href = `mailto:pranjulisaxena3@gmail.com?subject=New Subscriber&body=Email: ${email}`;

    setMessage("");
    setEmail("");
};

  return (
    <footer className={styles.footer}>
      <div className={styles.parentContainer}>
      <div className={styles.container}>
        <img src={assets.logo_dark} alt="logo" />
        <p className={styles.text}>Empowering learners with accessible, high-quality online education anytime, anywhere.</p>
      </div>
      <div className={styles.container}>
        <h2 className={styles.h2}>Company</h2>
        <ul className={styles.ul}>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact-us">Contact us</a></li>
          <li><a href="/privacy-policy">Privacy policy</a></li>
        </ul>
      </div>
      <div className={styles.hiddenContainer}>
        <h2>Subscribe to our newsletter</h2>
        <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
        <div >
          <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => handleSubscribe(email)} >Subscribe</button>
        </div>
        {message && <p className={styles.message}>{message}</p>}
      </div>
      </div>
      <p className={styles.copyright}>Copyright 2026 @ LMS. All Rights Reserved</p>
    </footer>
  )
}

export default Footer