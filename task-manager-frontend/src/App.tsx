import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import RegisterForm from "./components/RegisterForm"; // 👈 correct path

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route
          path="/"
          element={
            !user ? <LoginForm onLogin={setUser} /> : <Navigate to={`/${user.role}`} />
          }
        />

        {/* Register route */}
        <Route path="/register" element={<RegisterForm />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard user={user} />} />
        <Route path="/employee" element={<EmployeeDashboard user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
