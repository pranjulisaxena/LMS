import { useNavigate } from 'react-router-dom'
import {assets} from '../../assets/assets'
import styles from './CSS/CallToAction.module.css'

const CallToAction = () => {

  const navigate = useNavigate()
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Learn anything, anytime, anywhere</h1>
      <p className={styles.p}>Incididunt sint fugiat pariatur cupidatat consectetur sitcillum anim id veniam alliqua proident excepteur commodo do ea.</p>
      <div className={styles.bottomDiv}>
        <button className={styles.btn1 } onClick={() => navigate('/course-list')}>Get Started</button>
        <button  onClick={() => navigate('/about')} className={styles.btn2}>Learn More <img src={assets.arrow_icon} alt="arrow_icon"/></button>

      </div>

    </div>
  )
}

export default CallToAction