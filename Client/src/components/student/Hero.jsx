import React from 'react'
import styles from './CSS/Hero.module.css'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className={styles.div}  >

      <div className={styles.container}>
          <h2>Future-Ready</h2>
          <h2> Learning Starts</h2>
          <h2>Here👍</h2>
      </div>

      <SearchBar />

    </div>
  )
}

export default Hero