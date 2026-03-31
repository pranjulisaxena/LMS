import { useContext, useEffect, useState } from "react";
import styles from "./Courses.module.css";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Courses() {

  const {backendUrl} = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  // /deleteCourse/:courseId

 
  const fetchDashboardData = async () =>{
    try {
      const {data} = await axios.get(backendUrl + '/api/admin/allCourses')

     
      if(data.success){
        setDashboardData(data.courses)
        
      }
     
    } catch (error) {
      toast.error(error.message)
    }
  }

   const deleteCourse = async(courseId) => {
  try {
    const { data } = await axios.delete(
      `${backendUrl}/api/admin/deleteCourse/${courseId}`
    );

    if (data.success) {
      toast.success("Course deleted");

      // update UI instantly
      setDashboardData(prev => prev.filter(course => course._id !== courseId));
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
 }

 const editCourse = (course) => {
  setEditingCourseId(course._id);
  setEditedTitle(course.courseTitle);
  setEditedDescription(course.courseDescription);
 }

 const saveEdit = async (courseId) => {
  try {
    const { data } = await axios.put(
      `${backendUrl}/api/admin/updateCourse/${courseId}`,
      { courseTitle: editedTitle, courseDescription: editedDescription }
    );

    if (data.success) {
      // Update local state with the response
      setDashboardData(prev => prev.map(course => 
        course._id === courseId 
          ? { ...course, courseTitle: editedTitle, courseDescription: editedDescription }
          : course
      ));
      setEditingCourseId(null);
      toast.success("Course updated successfully");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message || "Failed to update course");
  }
 }

 const cancelEdit = () => {
  setEditingCourseId(null);
  setEditedTitle('');
  setEditedDescription('');
 }

  useEffect(() =>{
    fetchDashboardData();
  }, [])



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Courses</h1>
{dashboardData.map(course => (
  <div key={course._id} className={styles.card}>

    <div className={styles.topRow}>
      {editingCourseId === course._id ? (
        <input 
          type="text" 
          value={editedTitle} 
          onChange={(e) => setEditedTitle(e.target.value)} 
          className={styles.editInput}
        />
      ) : (
        <h3 className={styles.title}>{course.courseTitle}</h3>
      )}

      {course.isPublished ? (
        <span className={styles.published}>Published</span>
      ) : (
        <span className={styles.draft}>Draft</span>
      )}
    </div>

    {editingCourseId === course._id ? (
      <textarea 
        value={editedDescription} 
        onChange={(e) => setEditedDescription(e.target.value)} 
        className={styles.editTextarea}
      />
    ) : (
      <p className={styles.desc}>
        {course.courseDescription.replace(/<[^>]+>/g, "").slice(0, 100)}...
      </p>
    )}

    <div className={styles.infoRow}>
      <span>💰 ${course.coursePrice}</span>
      <span>🎯 {course.discount}% Off</span>
      <span>👨‍🎓 {Array.isArray(course.enrolledStudents) ? course.enrolledStudents.length : 0 } Students</span>
    </div>

    <div className={styles.footer}>
      {editingCourseId === course._id ? (
        <>
          <button 
            className={styles.saveBtn}
            onClick={() => saveEdit(course._id)}
          >
            Save
          </button>
          <button 
            className={styles.cancelBtn}
            onClick={cancelEdit}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button 
            className={styles.editBtn}
            onClick={() => editCourse(course)}
          >
            Edit
          </button>
          <button 
            className={styles.deleteBtn}
            onClick={() => deleteCourse(course._id)}
          >
            Delete
          </button>
        </>
      )}
    </div>

  </div>
))}
    </div>
  );
}