import { useContext } from 'react'
import {assets} from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import styles from './CSS/CoursesCard.module.css'


const CoursesCard = ({course}) => {

  const {currency,calculateRating} = useContext(AppContext)

  return (
    <Link to={'/course/'+ course._id} onClick={() => scrollTo(0,0,)} className={styles.Link} >
      <img className={styles.image} src={course.courseThumbnail} alt="" />
      <div className={styles.container}>
        <h3>{course.courseTitle}</h3>
        <p className={styles.educator}>{course.educator?.name}</p>
        <div className={styles.starsContainer}>
          <p>{calculateRating(course)}</p>
          <div className={styles.stars}>
            {
              [...Array(5)].map((_,i)=>(
                <img key={i} src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} alt=''/>
              ))
            }
          </div>
          <p className={styles.educator}>{course.courseRatings.length} </p>
        </div>
        <p className={styles.price}>{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default CoursesCard