import { useContext, useState } from 'react'
import style from '../student/CSS/MyEnrollments.module.css'
import { AppContext } from '../../context/AppContext'
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer'

const MyEnrollments = () => {

  const {enrolledCourses, calculateCourseDuration, navigate} = useContext(AppContext)
  const [progressArray, setProgressArray] = useState([
    {lectureCompleted: 2, totalLectures: 4},
    {lectureCompleted: 6, totalLectures: 10},
    {lectureCompleted: 0, totalLectures: 3},
    {lectureCompleted: 6, totalLectures: 6},
    {lectureCompleted: 3, totalLectures: 4},
    {lectureCompleted: 7, totalLectures: 10},
    {lectureCompleted: 5, totalLectures: 7},
    {lectureCompleted: 4, totalLectures: 6},
    {lectureCompleted: 3, totalLectures: 8},
    {lectureCompleted: 0, totalLectures: 5},
    {lectureCompleted: 1, totalLectures: 2},
    {lectureCompleted: 5, totalLectures: 7},
    {lectureCompleted: 2, totalLectures: 4},
    {lectureCompleted: 5, totalLectures: 5},
  ]);
  return (
  <>
   <div className={style.parentDiv}>
    <h1>My Enrollments</h1>
   <table>
    <thead>
      <tr>
        <th className={style.th}>Course</th>
        <th className={style.th}>Duration</th>
        <th className={style.th}>Completed</th>
        <th className={style.th}>Status</th>
      </tr>
    </thead>
    <tbody>
      {enrolledCourses.map((course, index) =>(
        <tr key={index} className={style.tr}>
          <td className={style.td1}>
            <img src={course.courseThumbnail} alt="" />
            <div>
              <p>{course.courseTitle}</p>
              <Line strokeWidth={2} percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures : 0} className={style.LineProgress}/>
            </div>
          </td>
          <td className={style.td2}>
          {calculateCourseDuration(course)}
          </td>
          <td className={style.td3}>
            {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures} `} <span>Lectures</span>
          </td>
          <td className={style.td4}>
            <button onClick={() => navigate('/player/' + course._id)}>
              {
                progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 ? 'Completed' : 'On Going'
              }
            </button>
          </td>
        </tr>
      ))}
    </tbody>
   </table>
   </div>
   <Footer />
  </>
  )
}

export default MyEnrollments