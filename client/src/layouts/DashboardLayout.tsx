import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth.api";

const DashboardLayout = () => {

  const { isAuth, loading, checkAuth, role } = useAuth();

  const logoutUser = async () => {

    try {
      await logout();
      localStorage.removeItem("token");
      checkAuth();
    } catch (err) {
      console.error(err);
    }
  }
  if (loading) return <div>loading...</div>
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <section className="min-h-screen bg-slate-50 text-slate-800">
    {/* ================= NAVBAR ================= */}

    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <div className="text-xl font-bold tracking-tight text-indigo-600">
          SalesFlow
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center gap-2 sm:gap-4">

          {role === "admin" && (
            <Link
              to="/dashboard/sales"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Sales
            </Link>
          )}

          <button
            onClick={logoutUser}
            type="button"
            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>

    <Outlet />
  </section>
}

export default DashboardLayout;