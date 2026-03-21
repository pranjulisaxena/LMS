import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import style from '../educator/CSS/MyCourses.module.css'


const MyCourses = () => {

  const {currency, allCourses} = useContext(AppContext)
  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = async () =>{
    setCourses(allCourses)
  }

  useEffect(() =>{
    fetchEducatorCourses()
  },[])

  return courses ? (
    <div className={style.parentDiv}>
      <div style={{ width: '100%'}}>
      <h1 className={style.h1}>My Courses</h1>
      <div className={style.tableDiv}>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr>
              <th className={style.th}>All Courses</th>
              <th className={style.th}>Earnings</th>
              <th className={style.th}>Students</th>
              <th className={style.th}>Published On</th>
            </tr>
          </thead>
          <tbody style={{fontSize: '1vw', color: 'gray'}}>
            {
              courses.map((course) =>(
                <tr key={course._id} className={style.tr}>
                  <td className={style.td1}>
                    <img src={course.courseThumbnail} alt="Course Image" style={{width: '4vw'}} />
                    <span className={style.span}>{course.courseTitle}</span>
                  </td>
                  <td style={{padding: '2vh 2vw'}}>
                  {currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}
                  </td>
                  <td style={{padding: '2vh 2vw'}}>
                    {course.enrolledStudents.length}
                  </td>
                  <td style={{padding: '2vh 2vw'}}>
                   {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
    </div>
  ) : <Loading />
}

export default MyCourses