import { useEffect, useState, useContext } from "react";
import styles from "./Requests.module.css";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

export default function Requests() {

  const [requests, setRequests] = useState([]);
  const { backendUrl, getToken } = useContext(AppContext);

  const fetchRequests = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(
        backendUrl + "/api/educator/requests",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) setRequests(data.requests);

    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (requestId, userId) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/educator/approve-role",
        { requestId, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Approved");
        fetchRequests();
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  const reject = async (requestId) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/educator/reject-role",
        { requestId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Rejected");
        fetchRequests();
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
  <div className={styles.wrapper}>
  {requests.length === 0 ? (
    <div className={styles.emptyState}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3>No Requests</h3>
      <p>There are no pending requests to display</p>
    </div>
  ) : (
    requests.map((req) => (
      <div key={req._id} className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.top}>
            <img
              src={`${req.image}`}
              className={styles.avatar}
              alt={`User ${req.userId.slice(0, 8)}`}
            />
            <div className={styles.userInfo}>
              <h3 className={styles.userId}>
                <span className={styles.label}>User ID:</span> 
                {req.userId.slice(0, 8)}...
              </h3>
              <p className={styles.requestType}>
                <span className={styles.dot}></span>
                Role Request
              </p>
            </div>
          </div>
          <div className={`${styles.badge} ${styles[req.status]}`}>
            <span className={styles.badgeIcon}>
              {req.status === "pending" && "⏳"}
              {req.status === "approved" && "✓"}
              {req.status === "rejected" && "✗"}
            </span>
            {req.status}
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>💼</div>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>Experience</span>
              <p className={styles.detailValue}>{req.experience || "Not specified"}</p>
            </div>
          </div>

          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>⚡</div>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>Skills</span>
              <div className={styles.skillsContainer}>
                {req.skills ? (
                  req.skills.split(',').map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill.trim()}
                    </span>
                  ))
                ) : (
                  <p className={styles.detailValue}>Not specified</p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>🔗</div>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>Portfolio</span>
              {req.portfolio ? (
                <a 
                    href={
    req.portfolio.startsWith("http")
      ? req.portfolio
      : `https://${req.portfolio}`
  } 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.portfolioLink}
                >
                  <span>View Portfolio</span>
                  <svg className={styles.externalIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              ) : (
                <p className={styles.detailValue}>Not provided</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.footer}>
          <div className={styles.requestMeta}>
            <span className={styles.metaLabel}>Request ID:</span>
            <span className={styles.metaValue}>{req._id.slice(-6)}</span>
          </div>
          
          {req.status === "pending" && (
            <div className={styles.actions}>
              <button
                className={`${styles.actionBtn} ${styles.rejectBtn}`}
                onClick={() => reject(req._id)}
              >
                <svg className={styles.btnIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Reject
              </button>

              <button
                className={`${styles.actionBtn} ${styles.acceptBtn}`}
                onClick={() => approve(req._id, req.userId)}
              >
                <svg className={styles.btnIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Accept
              </button>
            </div>
          )}
        </div>
      </div>
    ))
  )}
</div>
  );
}