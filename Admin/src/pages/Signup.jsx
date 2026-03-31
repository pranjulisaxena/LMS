import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../services/api";
import styles from "./Signup.module.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    // await API.post("/admin/signup", form);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Admin Signup</h2>

        <input className={styles.input} placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}/>

        <input type="password" className={styles.input} placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}/>

        <button className={styles.button}>Signup</button>
      </form>
    </div>
  );
}