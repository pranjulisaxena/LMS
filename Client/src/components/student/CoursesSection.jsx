import {Link} from 'react-router-dom'
import styles from './CSS/CoursesSection.module.css'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import CoursesCard from './CoursesCard';

const CoursesSection = () => {
  

  const {allCourses} = useContext(AppContext);
  
  return (
    <div className={styles.div}>
      <h2 className={styles.text}>Learn from the best</h2>
      <p className={styles.grayText}>Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.</p>

    <div className={styles.coursesContainer}>
      {allCourses.slice(0,4).map((course, index) => <CoursesCard key={index} course={course} />)}
    </div>

      <Link className={styles.ShowAllCourses} to={'/course-list'} onClick={() => scrollTo(0,0)}>Show all courses</Link>
    </div>
  )
}

export default CoursesSection