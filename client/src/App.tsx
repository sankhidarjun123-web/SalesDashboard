import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { useAuth } from "./context/AuthContext";

import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import SalesDashboard from "./pages/SalesDashboard";


function HomeRedirect() {
  const { isAuth, role, id, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (role === "user") {
    return <Navigate to={`/dashboard/user/${id}`} replace />;
  }

  if (role === "admin") {
    return <Navigate to={`/dashboard/admin/${id}`} replace />;
  }

  return <Navigate to="/login" replace />;
}


function App() {

  return (<>
    <Routes>

      {/* Root redirect */}
      <Route path="/" element={<HomeRedirect />} />


      {/* Authentication routes */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>


      {/* Dashboard routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>

        <Route
          path="admin/:adminId"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="sales"
        element={<ProtectedRoute allowedRole="admin"><SalesDashboard /></ProtectedRoute>} />

        <Route
          path="user/:usersId"
          element={
            <UserDashboard />
          }
        />

      </Route>

    </Routes>
    <ToastContainer />
  </>);
}

export default App;