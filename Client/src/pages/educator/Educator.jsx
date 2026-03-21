import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import styles from '../educator/CSS/Educator.module.css'
import Sidebar from '../../components/educator/Sidebar'
import Footer from '../../components/educator/Footer'

const Educator = () => {
  return (
   <>
    <div className={styles.parentDiv}>
      <Navbar />
    <div style={{display: 'flex'}}>
      <Sidebar />

      <div style={{display: 'flex-1'}}>
      <Outlet />
      </div>

    </div>
    <Footer />
    </div>
   </>
  )
}

export default Educator