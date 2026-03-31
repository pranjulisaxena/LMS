import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/student/SearchBar';
import { useParams } from 'react-router-dom';
import styles from './CSS/CoursesList.module.css'
import CoursesCard from '../../components/student/CoursesCard';
import { assets } from '../../assets/assets';

const CoursesList = () => {

  const  {navigate, allCourses} = useContext(AppContext);
  const {input} = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(()=>{
    if(allCourses && allCourses.length > 0){
      const tempCourses = allCourses.slice();
      input ? 
      setFilteredCourse(tempCourses.filter(
        item =>item.courseTitle.toLowerCase().includes(input.toLowerCase())
      ))
      : setFilteredCourse(tempCourses)
    }

  },[allCourses, input])

  return (
    <>
    <div className={styles.parentDiv}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.CourseList}>Course List</h1>
           <p className={styles.p}>
          <span onClick={() => navigate('/')}>Home</span> / <span>Course List</span>
        </p>
        </div>
        <SearchBar data={input} />
      </div>
      {
        input && <div className={styles.crossContainer}>
          <p>{input}</p>
          <img src={assets.cross_icon} alt="" className={styles.cross} onClick={() => navigate('/course-list')} />          
           </div>
      }
      <div className={styles.CardContainer}>
      {
        filteredCourse.map((course,i) => <CoursesCard key={i} course={course}/>)
      }
      {
        filteredCourse.map((course,i) => <CoursesCard key={i} course={course}/>)
      }
      {
        filteredCourse.map((course,i) => <CoursesCard key={i} course={course}/>)
      }
      {
        filteredCourse.map((course,i) => <CoursesCard key={i} course={course}/>)
      }
      </div>
    </div>
    </>
  )
}

export default CoursesList