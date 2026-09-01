import { Routes, Route, useNavigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
function App() {
  const { isAuth, role } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
    else if (role === "user") {
      navigate("/user/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  }, [isAuth]);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route path="/user/dashboard" element={<UserDashboard />} />
    </Routes>
  )
}

export default App
