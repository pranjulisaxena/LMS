import { useState, useContext } from "react";
import styles from "./CSS/becomeEducator.module.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function BecomeEducator() {

  const { backendUrl, getToken } = useContext(AppContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    experience: "",
    skills: "",
    portfolio: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
  const { name, email, experience, skills, portfolio, image } = form;

  if (!name || !email || !experience || !skills || !portfolio || !image) {
    toast.error("Please fill all fields");
    return false;
  }
  return true;
};

  const submitRequest = async () => {

  if (!validateForm()) return;   // 🔥 stop submission

    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/educator/request-role",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Request sent!");
        setForm({
          name: "",
          email: "",
          experience: "",
          skills: "",
          portfolio: "",
          image: ""
        });
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>

        <h2>Become an Educator</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} value={form.name} required />
        <input name="email" placeholder="Email" onChange={handleChange} value={form.email} required />
        <input name="image" placeholder="Profile Image URL" onChange={handleChange} value={form.image} required/>
        <input name="experience" placeholder="Experience (e.g. 3 years)" onChange={handleChange} value={form.experience} required />
        <input name="skills" placeholder="Skills (React, Node, etc)" onChange={handleChange} value={form.skills} required />
        <input name="portfolio" placeholder="Portfolio Link" onChange={handleChange} value={form.portfolio} required />

        <button onClick={submitRequest}>Send Request</button>

      </div>
    </div>
  );
}