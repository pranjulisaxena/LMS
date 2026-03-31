import { useContext, useEffect, useState } from "react";
// import API from "../services/api";
import styles from "./Users.module.css";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [viewingUser, setViewingUser] = useState(null);
  const {allCourses, backendUrl} = useContext(AppContext);

 const fetchAllUsers = async () =>{
  try {
    const {data} = await axios.get(backendUrl + '/api/admin/allUsers');

    if(data.success){
      setUsers(data.users)
    }
  } catch (error) {
    toast.error(error.message);
  }
 }

 const deleteUser = async(userId) => {
try {
    const { data } = await axios.delete(
      `${backendUrl}/api/admin/deleteUser/${userId}`
    );

    if (data.success) {
      toast.success("User deleted");

      // update UI instantly
      setUsers(prev => prev.filter(user => user._id !== userId));
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
 }

 const viewUser = (user) => {
  setViewingUser(user);
 }

 const closeViewModal = () => {
  setViewingUser(null);
 }

 useEffect(() =>{
  fetchAllUsers()
 },[])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>

  {users.map(user => (
  <div key={user._id} className={styles.card}>

    {/* Top Row */}
    <div className={styles.topRow}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.email}>{user.email}</p>
          <p className={styles.userId}>ID: {user._id}</p>
        </div>
      </div>

      <span className={styles.role}>User</span>
    </div>

    {/* Stats */}
    <div className={styles.stats}>
      <span>📚 {user.enrolledCourses?.length || 0} Courses</span>
    </div>

    {/* Footer */}
    <div className={styles.footer}>
      <button 
        className={styles.viewBtn}
        onClick={() => viewUser(user)}
      >
        View
      </button>

      <button 
        className={styles.deleteBtn}
        onClick={() => deleteUser(user._id)}
      >
        Delete
      </button>
    </div>

  </div>
))}

    {/* View User Modal */}
    {viewingUser && (
      <div className={styles.modalOverlay} onClick={closeViewModal}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>User Details</h2>
            <button className={styles.closeBtn} onClick={closeViewModal}>×</button>
          </div>
          
          <div className={styles.modalBody}>
            <div className={styles.userDetail}>
              <div className={styles.userAvatar}>
                {viewingUser.name?.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userInfo}>
                <h3>{viewingUser.name}</h3>
                <p>{viewingUser.email}</p>
                <p className={styles.userId}>ID: {viewingUser._id}</p>
              </div>
            </div>

            <div className={styles.detailSection}>
              <h4>Account Information</h4>
              <p><strong>Role:</strong> User</p>
              <p><strong>Joined:</strong> {new Date(viewingUser.createdAt).toLocaleDateString()}</p>
              <p><strong>Last Updated:</strong> {new Date(viewingUser.updatedAt).toLocaleDateString()}</p>
            </div>

            <div className={styles.detailSection}>
              <h4>Enrolled Courses ({viewingUser.enrolledCourses?.length || 0})</h4>
              {viewingUser.enrolledCourses?.length > 0 ? (
                <ul className={styles.courseList}>
                  {viewingUser.enrolledCourses.map(courseId => {
                    const course = allCourses.find(c => c._id === courseId);
                    return (
                      <li key={courseId} className={styles.courseItem}>
                        {course ? course.courseTitle : `Course ID: ${courseId}`}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No courses enrolled</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}