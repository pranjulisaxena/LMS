import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import style from '../student/CSS/CourseDetail.module.css'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/student/Footer'
import Youtube from 'react-youtube'
import { toast } from 'react-toastify'
import axios from 'axios'

const CourseDetail = () => {

  const {id} = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData, setplayerData] = useState(null)

  const {allCourses, calculateRating,calculateNoOfLectures, calculateCourseDuration, calculateChapterTime, currency, backendUrl, userData, getToken} = useContext(AppContext);

  const fetchCourseData = async () =>{
     try {
      const {data} = await axios.get(backendUrl + '/api/course/' + id)

      if(data.success){
        setCourseData(data.coursesData)
      }
      else{
        toast.error(data.message)
      }
     } catch (error) {
      toast.error(error.message)
     }
  }

  const enrollCourse = async () =>{
    try {
      if(!userData){
        return toast.warn('Login to Enroll')
      }
      if(isAlreadyEnrolled){
        return toast.warn('Already Enrolled')
      }
      const token = await getToken();

      const {data} = await axios.post(backendUrl + '/api/user/purchase', {courseId : courseData._id}, {headers: {Authorization: `Bearer ${token}`}})

      if(data.success){
        const {session_url} = data
        window.location.replace(session_url)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(data.message)
    }
  }

  useEffect(() =>{
    fetchCourseData()
  },[])
  useEffect(() =>{
    if(userData && courseData){
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id))
    }
  },[userData, courseData])

  const toggleSection = (index) =>{
    setOpenSections((prev) =>(
      {
        ...prev,
        [index]: !prev[index],
      }
    ))
  }

  return courseData ? (
    <>
   <div className={style.parent}>

    <div className={style.section}>

    </div>
    {/* // left column */}
    <div className={style.leftParent}>
      <h1>{courseData.courseTitle}</h1>
      <p className={style.leftParentP} dangerouslySetInnerHTML={{__html: courseData.courseDescription.slice(0,200)}}></p>

      {/* review and ratings */}
              <div className={style.starsContainer}>
          <p>{calculateRating(courseData)}</p>
          <div className={style.stars}>
            {
              [...Array(5)].map((_,i)=>(
                <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt=''/>
              ))
            }
          </div>
          <p className={style.educator}>({courseData.courseRatings.length} {
            courseData.courseRatings.length > 1 ? 'ratings' : 'rating'} )</p>

            <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
        </div>

        <p>Course By <span className={style.instructor}>{courseData.educator.name}</span></p>

        <div className={style.chaptersParent}>
          <h2>Course Structure</h2>

          <div>
            {courseData.courseContent.map((chapter, index) =>(
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
                        <img src={assets.play_icon} alt="play_icon" className={style.play_icon} />
                        <div className={style.listDiv}>
                          <p>{lecture.lectureTitle}</p>
                          <div className={style.listDiv2}>
                            {lecture.isPreviewFree && <p className={style.preview}onClick={() => setplayerData({
                              videoId: lecture.lectureUrl.split('/').pop()
                            })}>Preview</p> }
                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, {units: ["h", "m"]})}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>     
                </div>
            ))}
          </div>
        </div>

             <div className={style.desc}>
                      <h3>Course Description</h3>
                       <p className={'rich-text'} dangerouslySetInnerHTML={{__html: courseData.courseDescription}}></p>
                    </div>

    </div>
    {/* // right column */}
    <div className={style.rightColumnParent}>
      {
          playerData ?

              <Youtube videoId={playerData.videoId} opts={{playerVars: {autoplay: 1}}} iframeClassName={style.iframeClass}/>
              : <img className={style.img1} src={courseData.courseThumbnail} alt="" /> 
      }
           
           <div className={style.rightDiv}>
            <div className={style.rightDiv2}>

            
             <img src={assets.time_left_clock_icon} alt="time left clock icon" className={style.Rightimg}/>

              <p className={style.RightP}><span>5 days</span> left at this price!</p>
            </div>
            <div className={style.currencyDiv}>
              <p className={style.p1}>{currency}{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
              <p className={style.p2}>{currency}{courseData.coursePrice}</p>
              <p className={style.p3}>{courseData.discount}% off</p>
            </div>

            <div className={style.RightBottomDiv}>

            <div className={style.RightBottomDiv1}>
              <img src={assets.star} alt="star icon" />
              <p>{calculateRating(courseData)}</p>
            </div>

            <div className={style.RightBottomDiv2}>
            </div>

              <div className={style.RightBottomDiv1}>
              <img src={assets.time_clock_icon} alt="clock icon" />
              <p>{calculateCourseDuration(courseData)}</p>
            </div>

            <div className={style.RightBottomDiv2}>
            </div>

              <div className={style.RightBottomDiv1}>
              <img src={assets.lesson_icon} alt="clock icon" />
              <p>{calculateNoOfLectures(courseData)} lessons</p>
            </div>


            </div>

            <button onClick={enrollCourse} className={style.EnrollBtn}>{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>

            <div className={style.AboutCourseContainer}>
              <p>What's in the course?</p>
              <ul>
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>

           </div>
    </div>
   </div>
   <Footer />
   </>
  ) : <Loading />
}

export default CourseDetail