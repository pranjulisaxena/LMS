import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { AppContext } from "../Context/AppContext";

export default function Login() {
  const [form, setForm] = useState({ name: "", password: "" });
  const navigate = useNavigate();
  const {getToken} = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await API.post("/admin/login", form);
    // localStorage.setItem("adminToken", res.data.token);
    console.log(form)
    if(form.name === 'Pranjuli' && form.password === "admin@123"){
      console.log('Hit')
      const {token} = await getToken();
      localStorage.setItem("adminToken", token);

    navigate("/dashboard");
    }
    else{
      navigate('/')
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Admin Login</h2>

        <input
          className={styles.input}
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className={styles.button}>Login</button>
      </form>
    </div>
  );
}