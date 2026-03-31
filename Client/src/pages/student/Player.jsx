import humanizeDuration from 'humanize-duration'
import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import style from '../student/CSS/CourseDetail.module.css'
import styles from '../student/CSS/Player.module.css'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'
import Footer from '../../components/student/Footer'
import Rating from '../../components/student/Rating'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../../components/student/Loading'

const Player = () => {

  const {enrolledCourses, calculateChapterTime, backendUrl, getToken, userData, fetchUserEnrolledCourses } = useContext(AppContext)
  
  const {courseId} = useParams();
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [playerData, setplayerData] = useState(null)
  const [progressData, setProgressData] = useState(null)
  const [initialRating, setInitialRating] = useState(0)

  const getCourseData = () =>{
    enrolledCourses.map((course) =>{
      if(course._id === courseId){
        setCourseData(course)
        course.courseRatings.map((item) =>{
          if(item.userId === userData._id){
          setInitialRating(item.rating)
          }
        })
      }
    }) 
  }

  const toggleSection = (index) =>{
    setOpenSections((prev) =>(
      {
        ...prev,
        [index]: !prev[index]
      }
    ))
  }

  useEffect(() =>{
    if(enrolledCourses.length > 0){
      getCourseData()
    }
  }, [enrolledCourses])

  const markLectureAsCompleted = async (lectureId) =>{
    try {
      const token = await getToken()
      const {data} = await axios.post(backendUrl + '/api/user/update-course-progress', {courseId, lectureId}, {headers: {Authorization: `Bearer ${token}`}})

      if(data.success){
        toast.success(data.message)
        getCourseProgress()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getCourseProgress = async () =>{
    try {
      const token = await getToken()
      const {data} = await axios.post(backendUrl + '/api/user/get-course-progress', {courseId}, {headers: {Authorization: `Bearer ${token}`}})

      if(data.success){
        setProgressData(data.progressData)
       
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleRate = async (rating) =>{
    try {
      const token = await getToken()
      const {data} = await axios.post(backendUrl + '/api/user/add-rating', {courseId, rating}, {headers: {Authorization: `Bearer ${token}`}})

      if(data.success){
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(data.message)
    }
  }

  useEffect(() =>{
    getCourseProgress()
  },[])
  return courseData ? (
    <>
    <div className={styles.parentDiv}>
      {/* left Column */}
      <div className={styles.leftDivParent}>
      <h2>Course Structure</h2>

         <div className={styles.leftDiv}>
            {courseData && courseData.courseContent.map((chapter, index) =>(
              <div key={index} className={style.contentBorder} >
                <div className={style.contentFix} onClick={() => toggleSection(index)}>
                  <div className={style.div3}>
                    <img className={openSections[index]? style.rotate180: ''} src={assets.down_arrow_icon} alt="arrow-down" />
                    <p>{chapter.chapterTitle}</p>
                  </div>
                  <p className={style.time}>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                </div>
                <div className={openSections[index] ? style.motion : style.notmotion }>
                  <ul>
                    {chapter.chapterContent.map((lecture, i) =>(
                      <li key={i}>
                        <img src={progressData && progressData.lectureCompleted.includes(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon} alt="play_icon" className={style.play_icon} />
                        <div className={style.listDiv}>
                          <p>{lecture.lectureTitle}</p>
                          <div className={style.listDiv2}>
                            {lecture.lectureUrl && <p className={style.preview} onClick={() => setplayerData({
                              ...lecture, chapter: index + 1, lecture: i + 1
                            })}>Watch</p> }
                            <p>{humanizeDuration(Number(lecture.lectureDuration) * 60 * 1000, {units: ["h", "m"]})}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>     
                </div>
            ))}
          </div>

          <div className={styles.RateCourseDiv}>
            <h1>Rate This Course:</h1>
            <Rating initialRating={initialRating} onRate={handleRate}/>
          </div>
          
      </div>
      {/* right Column */}
      <div className={styles.rightParent}>
            {
              playerData ? (
                <div>
                  <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName={style.iframeClass} />
                  <div className={styles.playerDiv}>
                    <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                    <button onClick={() => markLectureAsCompleted(playerData.lectureId)} className={styles.rightBtn}>{progressData && progressData.lectureCompleted.includes(playerData.lectureId) ? 'Completed' : 'Mark Complete'}</button>
                  </div>
                </div>
              ) :
              <img src={courseData ? courseData.courseThumbnail : null} alt='thumbnail' className={styles.thumbnail} />
            }
      </div>
    </div>
    <Footer />
    </>
  ) : <Loading />
}

export default Player