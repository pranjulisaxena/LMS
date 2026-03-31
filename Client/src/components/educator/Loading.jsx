import { useNavigate, useParams } from 'react-router-dom'
import style from './CSS/Loading.module.css'
import { useEffect } from 'react';

const Loading = () => {

  const {path} = useParams()
  const navigate = useNavigate();

  useEffect(() =>{
    if(path){
      const timer = setTimeout(() =>{
        navigate(`/${path}`)
      }, 5000)

      return () => clearTimeout(timer);
    }
  }, [])

  return (
    <div className={style.div1}>
      <div className={style.div2}>
        
      </div>
    </div>
  )
}

export default Loading