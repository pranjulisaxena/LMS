import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;