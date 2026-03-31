import { useContext, useEffect, useState } from "react";
// import API from "../services/api";
import styles from "./Dashboard.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import { act } from "react";

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [dashboardData, setDashboardData] = useState([])
  const [purchases, setPurchases] = useState([])
  const [revenue, setRevenue] = useState(0)
  const [activity, setActivity] = useState([]);

  const {backendUrl} = useContext(AppContext);

  const formatTime = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;

  return new Date(date).toLocaleDateString();
};

  const fetchActivityData = async () =>{
    try {
      const {data} = await axios.get(backendUrl + '/api/admin/activity')
      
         setActivity(data)
    } catch (error) {
      toast.error(error.message)
    }
  }

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
     const fetchAllPurchases = async () =>{
      try {
        const {data} = await axios.get(backendUrl + '/api/admin/allPurchases');
    
        if(data.success){
          setPurchases(data.purchases)
        }
      } catch (error) {
        toast.error(error.message);
      }
     }

     const CalculateRevenue = () =>{
      let totalRevenue = 0;
       purchases.map((purchase) => {
       totalRevenue += purchase.amount;
       })
       setRevenue(totalRevenue)
     } 

     useEffect(() =>{
      fetchAllUsers()
      fetchDashboardData()
      fetchAllPurchases()
      fetchActivityData()
     },[])

     useEffect(() =>{
      CalculateRevenue()
     }, [purchases])

     useEffect(() =>{
      console.log(activity);
     }, [activity])

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Welcome back 👋</p>
      </div>

      {/* Cards */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <span>👤</span>
          <h3>Total Users</h3>
          <h2>{users.length}</h2>
        </div>

        <div className={styles.card}>
          <span>📚</span>
          <h3>Total Courses</h3>
          <h2>{dashboardData.length}</h2>
        </div>

        <div className={styles.card}>
          <span>💰</span>
          <h3>Total Revenue</h3>
          <h2>${revenue}</h2>
        </div>
      </div>

      {/* Activity Section */}
      {console.log(activity[0]?.createdAt)}
      <div className={styles.activity}>
        <h2>Recent Activity</h2>

        <div className={styles.activityItem}>
          <p>{activity[0]?.message}</p>
          <span>{formatTime(activity[0]?.createdAt)}</span>
        </div>
        <div className={styles.activityItem}>
          <p>{activity[1]?.message}</p>
          <span>{formatTime(activity[1]?.createdAt)}</span>
        </div>
        <div className={styles.activityItem}>
          <p>{activity[2]?.message}</p>
          <span>{formatTime(activity[2]?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}