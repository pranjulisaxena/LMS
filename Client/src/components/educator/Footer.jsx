import React from 'react'
import { assets } from '../../assets/assets'
import style from '../educator/CSS/Footer.module.css'

const Footer = () => {
  return (
    <footer className={style.Footer}>
      {/* Left Div */}
      <div className={style.LeftDiv}>
        <img src={assets.logo} alt="" className={style.img} />
        <div className={style.div}></div>
        <p className={style.p}>Copyright 2026 © Pranjuli Saxena. All Right Reserved.</p>
      </div>
        {/* Right Div */}
      <div className={style.RightDiv}>
        <a href="#">
          <img src={assets.facebook_icon} alt="facebook_icon" />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} alt="twitter_icon" />
        </a>
        <a href="#">
          <img src={assets.instagram_icon} alt="instagram_icon" />
        </a>
      </div>
    </footer>
  )
}

export default Footer