import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Users from "./pages/Users";

// import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from 'react-toastify';
import Activity from "./pages/Activity";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

      console.log('hit')
  return (
    <>  
    <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <Dashboard />
              </div>
              </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <Courses />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <Users />
              </div>
            </ProtectedRoute>
          }
        />
          
  

        <Route
          path="/users"
          element={
              <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <Users />
              </div>
              </ProtectedRoute>
           
          }
        />
        <Route
          path="/activity"
          element={
              <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <Activity />
              </div>
              </ProtectedRoute>
           
          }
        />
      </Routes>


    </>
    
    
    

  );
}

export default App;