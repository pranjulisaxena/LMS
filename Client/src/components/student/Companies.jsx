import {assets} from '../../assets/assets'
import styles from './CSS/Companies.module.css'
const Companies = () => {
  return (
    <div className={styles.companiesContainer}>
      <p>Trusted by learners from</p>
      <div className={styles.companiesLogoContainer}>
        <img src={assets.microsoft_logo} alt="Microsoft" />
        <img src={assets.walmart_logo} alt="Walmart" />
        <img src={assets.accenture_logo} alt="Accenture" />
        <img src={assets.adobe_logo} alt="Adobe" />
        <img src={assets.paypal_logo} alt="PayPal" />
      </div>

    </div>
  )
}

export default Companies