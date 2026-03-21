import React from 'react'
import {assets, dummyEducatorData} from '../../assets/assets'
import {UserButton, useUser} from '@clerk/clerk-react'
import {Link} from 'react-router-dom'
import style from '../educator/CSS/Navbar.module.css'

const Navbar = () => {
  const educatorData = dummyEducatorData
  const {user} = useUser()
  return (
    <div className={style.parentDiv}>
      <Link to='/'>
      <img src={assets.logo} alt="Logo" className={style.img} />
      </Link>
      <div className={style.profileDiv}>
        <p>Hi! {user ? user.fullName : 'Developers'}</p>
        {user ? <UserButton /> : <img src={assets.profile_img} className={style.profile_img}/>} 
      </div>
    </div>
  )
}

export default Navbar