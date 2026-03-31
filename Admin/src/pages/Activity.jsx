import { useEffect, useState, useContext } from "react";
import styles from "./Activity.module.css";
import axios from "axios";
import { AppContext } from "../Context/AppContext";

const Activity = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const { backendUrl } = useContext(AppContext);

  const fetchActivity = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/activity"
      );

      setActivity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Recent Activity</h1>

      {loading ? (
        <p className={styles.loading}>Loading activity...</p>
      ) : activity.length === 0 ? (
        <p className={styles.empty}>No activity found</p>
      ) : (
        <div className={styles.list}>
          {activity.map((item, index) => (
            <div key={index} className={styles.card}>
              
              {/* LEFT SIDE */}
              <div className={styles.icon}>
                {getIcon(item.message)}
              </div>

              {/* CENTER */}
              <div className={styles.content}>
                <p className={styles.message}>{item.message}</p>
                <span className={styles.time}>
                  {formatTime(item.createdAt)}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 🧠 ICON BASED ON TYPE
const getIcon = (message) => {
  if (message.includes("user")) return "👤";
  if (message.includes("Course")) return "📚";
  if (message.includes("Payment")) return "💳";
  return "🔔";
};

// 🧠 TIME FORMAT
const formatTime = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;

  return new Date(date).toLocaleDateString();
};

export default Activity;