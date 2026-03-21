import React, { useContext } from 'react'
import {assets} from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import style from '../educator/CSS/Sidebar.module.css'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  const {isEducator} = useContext(AppContext);
  const menuItems = [
    {name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    {name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    {name: 'My Course', path: '/educator/my-courses', icon: assets.my_course_icon },
    {name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];
  return isEducator && (
    <div className={style.parentDiv} >
      {
        menuItems.map((item) =>(
         <NavLink to={item.path} key={item.name} end={item.path === '/educator'} className={({isActive}) => (
          (isActive) ? style.SidebarLink : style.SidebarLink2
        
         )}>
          <img src={item.icon} alt='' className={style.img}/>
          <p className={style.ItemName}>{item.name}</p>
         </NavLink>
        ))
      }
    </div>
  )
}

export default Sidebar