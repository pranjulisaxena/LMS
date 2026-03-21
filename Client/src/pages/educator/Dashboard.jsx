import React, { useContext, useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import style from '../educator/CSS/Dashboard.module.css'

const Dashboard = () => {
  const {currency} = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async () =>{
    setDashboardData(dummyDashboardData)
  }

  useEffect(() =>{
    fetchDashboardData()
  }, [])
  return dashboardData ? (
    <div className={style.parentDiv}>
      <div style={{marginTop: "2vh"}}>
        <div className={style.FlexDiv}>
          <div className={style.componentDiv}>
            <img src={assets.patients_icon} alt="patients_icon" />
            <div>
              <p className={style.p1}>{dashboardData.enrolledStudentsData.length}</p>
              <p className={style.p2}>Total Enrolments</p>
            </div>
          </div>
          <div className={style.componentDiv}>
            <img src={assets.appointments_icon} alt="patients_icon" />
            <div>
              <p className={style.p1}>{dashboardData.totalCourses}</p>
              <p className={style.p2}>Total Courses</p>
            </div>
          </div>
          <div className={style.componentDiv}>
            <img src={assets.earning_icon} alt="patients_icon" />
            <div>
              <p className={style.p1}>{currency} {dashboardData.totalEarnings}</p>
              <p className={style.p2}>Total Earnings</p>
            </div>
          </div>
        </div>

        <div>
        <h2 style={{paddingBottom: '3vh', fontSize: '1.3vw', fontWeight: '600', marginTop: '6vh'}}>Latest Enrolments</h2>
        <div className={style.inputDiv}>
          <table className={style.table}>
            <thead className={style.thead}>
              <tr>
                <th className={style.th1}>#</th>
                <th className={style.th2}>Student Name</th>
                <th className={style.th2}>Course Title</th>
              </tr>
            </thead>
            <tbody className={style.tbody}>
            {
              dashboardData.enrolledStudentsData.map((item, index) =>(
                <tr key={index} className={style.tr}>
                  <td className={style.td1}>
                    {index + 1}
                  </td>
                  <td className={style.td2}>
                    <img src={item.student.imageUrl} alt="Profile" className={style.img} />
                    <span className={style.span}>{item.student.name}</span>
                  </td>
                  <td className={style.tdTitle}>{item.courseTitle}</td>
                </tr>
              ))
            }
            </tbody>

          </table>
        </div>

        </div>

      </div>
    </div>
  ) : <Loading />
}

export default Dashboard