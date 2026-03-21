import React, { useContext } from 'react'
import styles from './CSS/Navbar.module.css'
import { assets } from '../../assets/assets'
import '../../index.css'
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const {navigate, isEducator} = useContext(AppContext);

  const isCourseListPage = location.pathname.includes('/course-list');

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className={`${styles.navbar} ${isCourseListPage ? styles.courseListNavbar : ''}`}>
      <img onClick={() => navigate('/')} src={assets.logo} className={styles.logo} alt="Logo" />
      <div className={styles.userSignIn}>
        {user && <>
          <div className={styles.login}>
            <div onClick={() => navigate('/educator')} >{isEducator ? 'Educator Dashboard' : 'Become Educator'}</div> <div>|</div>
            <div><Link to="/my-enrollments" className={styles.link}>MyEnrollments</Link></div>
          </div>
        </>
        }

        {
          user ? <UserButton  /> :
            <button onClick={() => openSignIn()} className={styles.button}>Create Account</button>
        }

      </div>
      
      { !user && <button className={styles.userButton}>
           <FaRegUserCircle size={30} onClick={() => openSignIn()} />
        
      </button>}

    </div>
  )
}

export default Navbar