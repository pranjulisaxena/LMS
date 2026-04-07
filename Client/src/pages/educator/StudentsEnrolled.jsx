import React, { useContext, useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/educator/Loading'
import style from '../educator/CSS/StudentsEnrolled.module.css'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const StudentsEnrolled = () => {
  const {backendUrl, getToken, isEducator } = useContext(AppContext)
  const [enrolledStudents, setEnrolledStudents] = useState(null)

  const fetchEnrolledStudents = async () =>{
    try {
      const token = await getToken()
      const {data} = await axios.get(backendUrl + '/api/educator/enrolled-students', {headers: {Authorization: `Bearer ${token}`}})
      if(data.success){
        setEnrolledStudents(data.enrolledStudents.reverse())
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() =>{
    if(isEducator){
  fetchEnrolledStudents()
    }
  }, [isEducator])

  return  enrolledStudents ?(
    <div className={style.div1}>
      <div className={style.div2}>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr>
              <th className={style.th1}>#</th>
              <th className={style.th2}>Student Name</th>
              <th className={style.th2}>Course Title</th>
              <th className={style.th1}>Date</th>
            </tr>
          </thead>
          <tbody style={{fontSize: '1.2vw', color: 'rgb(119, 118, 118)'}}>
            {enrolledStudents.map((item, index) =>(
              <tr key={index} style={{borderBottom: '1px solid rgb(175, 175, 175)'}}> 
                <td style={{padding: '3vh 2vw', textAlign: 'center', display: 'table-cell'}}>
                {index + 1}
                </td>
                <td style={{padding: '3vh 2vw', display: 'flex', alignItems: 'center', rowGap: '2vw'}}>
                  <img src={item.student.imageUrl} alt="" style={{width: '2rem', borderRadius: '100%'}} />
                  <span style={{overflow: 'hidden', wordWrap: 'nowrap',textOverflow: 'ellipsis', paddingLeft: '1vw'}}>{item.student.name}</span>
                </td>
                <td style={{padding: '3vh 2vw',overflow: 'hidden', wordWrap: 'nowrap',textOverflow: 'ellipsis', }}>{item.courseTitle}</td>
                <td style={{padding: '3vh 2vw', display: 'table-cell'}}>{new Date(item.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />
}

export default StudentsEnrolled