import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className={styles.sidebar}>
      <div>
        <h2 className={styles.title}>Admin Panel</h2>

      <nav className={styles.nav}>
        <Link
          to="/dashboard"
          className={`${styles.link} ${
            location.pathname === "/dashboard" ? styles.active : ""
          }`}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/courses"
          className={`${styles.link} ${
            location.pathname === "/courses" ? styles.active : ""
          }`}
        >
          📚 Courses
        </Link>

        <Link
          to="/users"
          className={`${styles.link} ${
            location.pathname === "/users" ? styles.active : ""
          }`}
        >
          👥 Users
        </Link>
        <Link
          to="/activity"
          className={`${styles.link} ${
            location.pathname === "/activity" ? styles.active : ""
          }`}
        >
          📈 activity
        </Link>
        <Link
          to="/requests"
          className={`${styles.link} ${
            location.pathname === "/request" ? styles.active : ""
          }`}
        >
          👨‍🎓 requests
        </Link>
        <Link
          to="/profile"
          className={`${styles.link} ${
            location.pathname === "/profile" ? styles.active : ""
          }`}
        >
          👨 profile
        </Link>
      </nav>
      </div>

      <div className={styles.logout}>
        <button className={styles.button} onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/";
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}