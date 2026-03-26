import { useContext, useEffect, useState } from 'react'
import style from '../student/CSS/MyEnrollments.module.css'
import { AppContext } from '../../context/AppContext'
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyEnrollments = () => {

  const {enrolledCourses, calculateCourseDuration, navigate, userData, fetchUserEnrolledCourses, backendUrl, getToken, calculateNoOfLectures} = useContext(AppContext)
  const [progressArray, setProgressArray] = useState([]);

  const getCourseProgress  = async () =>{
    try {
      const token = await getToken();
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) =>{
          const {data} = await axios.post(`${backendUrl}/api/user/get-course-progress`, {courseId: course._id}, {headers: {Authorization: `Bearer ${token}`}})
          let totalLectures = calculateNoOfLectures(course);

      const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
      return {totalLectures, lectureCompleted}
        })
      )
      setProgressArray(tempProgressArray);

      
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() =>{
    if(userData){
      fetchUserEnrolledCourses()
    }
  }, [userData])
  useEffect(() =>{
    if(enrolledCourses.length > 0){
     getCourseProgress()
    }
  }, [enrolledCourses])
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