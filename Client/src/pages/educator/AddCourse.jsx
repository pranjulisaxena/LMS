import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import style from '../educator/CSS/AddCourse.module.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddCourse = () => {

  const {backendUrl, getToken} = useContext(AppContext);

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState(
    {
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    }
  )

  const handleChapter = (action, chapterId) => {
    if(action === 'add'){
      const title = prompt('Enter Chapter Name:');
      if(title){
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? {...chapter, collapsed: !chapter.collapsed} : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) =>{
    if(action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    }
    else if(action === 'remove') {
      setChapters(
        chapters.map((chapter) =>{
          if(chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      )
    }
  };

  const AddLecture = () =>{
    setChapters(
      chapters.map((chapter) =>{
        if(chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid()
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) =>{
    try {
      e.preventDefault()
      if(!image){
        toast.error('Thumbnail Not Selected')
      }

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      }

      const formData = new FormData()
      formData.append('courseData', JSON.stringify(courseData))
      formData.append('image', image)

      const token = await getToken()
      const {data} = await axios.post(backendUrl + '/api/educator/add-course', formData, {headers: {Authorization: `Bearer ${token}`}})

      if(data.success){
        toast.success(data.message);
        setCourseTitle('')
        setCoursePrice(0)
        setDiscount(0)
        setImage(null)
        setChapters([])
        quillRef.current.root.innerHTML = ""
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
      
  }


  useEffect(() => {
    // Initiate Quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, [])


  return (
    <div className={style.parentDiv}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.formParentDiv}>
        <p>Course Title</p>
        <input required type="text" value={courseTitle} placeholder='Type here' className={style.CourseTitleInput} onChange={e => setCourseTitle(e.target.value)}/>
        </div>
        <div className={style.formParentDiv}>
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className={style.container}>
          {/* first column */}
          <div className={style.firstColumn}>
          <p>Course Price</p>
          <input type="number" placeholder='0' value={coursePrice} onChange={e => setCoursePrice(e.target.value)} className={style.CoursePriceInput} required/>
          </div>
          {/* second column */}
          <div className={style.secondColumn}>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" style={{display: 'flex', alignItems: 'center', gap: '2vw'}}>
              <img src={assets.file_upload_icon} alt="" className={style.fileUpload}/>
              <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept='image/*' hidden  style={{maxHeight: '8vh'}}/>
              <img src={image ? URL.createObjectURL(image) : null} alt="" style={{maxHeight: '7vh'}}/>
            </label>
          </div>
        </div>
        <div>
          <p>Discount %</p>
          <input type="number" onChange={e => setDiscount(e.target.value)} value={discount} placeholder='0' min={0} max={100} className={style.discountInput} required />
        </div>
        {/* Adding Chapters & Lectures */}
        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className={style.chapterParentDiv}>
              <div className={style.MinChapterDiv}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <img onClick={() => handleChapter('toggle', chapter.chapterId)} src={assets.dropdown_icon} width={14} alt="" className={chapter.collapsed ? style.notCollapsed : style.Collapsed} />
                  <span style={{fontWeight: '700'}}>{chapterIndex + 1} {chapter.chapterTitle}</span>
                </div>
                <span style={{color: 'gray'}}>{chapter.chapterContent.length} Lectures</span>
                <img src={assets.cross_icon} alt="" style={{cursor: 'pointer'}} onClick={() => handleChapter('remove', chapter.chapterId)}/>
              </div>
              {!chapter.collapsed && (
                <div style={{padding: '2vh 1.5vw'}}>
                  {chapter.chapterContent.map((lecture, lectureIndex) =>(
                      <div key={lectureIndex} className={style.lecture}>
                        <span>{lectureIndex + 1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target="_blank" style={{color: 'royalblue'}}>Link</a> - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}</span>
                        <img src={assets.cross_icon} alt="" style={{cursor: 'pointer'}} onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}/>
                      </div>
                  ))}
                  <div className={style.AddLecture} onClick={() => handleLecture('add', chapter.chapterId)}>+ Add Lecture</div>
                </div>
              )}
            </div>
          ))}
          <div className={style.BottomAddChapter} onClick={() => handleChapter('add')}>+ Add Chapter</div>

          {
            showPopup && (
              <div className={style.PopupContainer}>
                <div className={style.Popup}>
                <h2 style={{marginBottom: '3vh', fontWeight: '700', fontSize: '1.7vw'}}>Add Lecture</h2>

                <div style={{marginBottom: '2vh'}}>
                  <p>Lecture Title</p>
                  <input
                  type="text"
                  className={style.LectureTitleInput}
                  value={lectureDetails.lectureTitle}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value})} />
                </div>

                <div style={{marginBottom: '2vh'}}>
                  <p>Duration (minutes)</p>
                  <input
                  type="number"
                  className={style.LectureTitleInput}
                  value={lectureDetails.lectureDuration}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value})} />
                </div>

                <div style={{marginBottom: '2vh'}}>
                  <p>Lecture URL</p>
                  <input
                  type="text"
                  className={style.LectureTitleInput}
                  value={lectureDetails.lectureUrl}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value})} />
                </div>

                <div style={{marginBottom: '2vh'}}>
                  <p>Is Preview Free?</p>
                  <input
                  type="checkbox"
                  className={style.checkbox}
                  value={lectureDetails.isPreviewFree}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked})} />
                </div>

                <button onClick={AddLecture} type='button' className={style.AddButton}>Add</button>

                <img onClick={() => setShowPopup(false) } src={assets.cross_icon} alt="" className={style.Crossimg}/>

                </div>
              </div>
            )
          }
        </div>
        <button type='submit' className={style.SubmitBtn}>ADD</button>
      </form>
    </div>
  )
}

export default AddCourse