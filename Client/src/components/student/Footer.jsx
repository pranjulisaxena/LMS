import {assets} from '../../assets/assets'
import styles from './CSS/Footer.module.css'
const Footer = () => {
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
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Privacy policy</a></li>
        </ul>
      </div>
      <div className={styles.hiddenContainer}>
        <h2>Subscribe to our newsletter</h2>
        <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
        <div >
          <input type="email" placeholder='Enter your email' />
          <button>Subscribe</button>
        </div>
      </div>
      </div>
      <p className={styles.copyright}>Copyright 2026 @ LMS. All Rights Reserved</p>
    </footer>
  )
}

export default Footer