import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const AuthLayout = () => {

    const navigate = useNavigate();
    const { isAuth, id, role, loading } = useAuth();


    if (loading) return <div>loading...</div>;

    if (isAuth) {
        return <Navigate to={`/dashboard/${role}/${id}`} replace />;
    }

    return (
        <section className="bg-blue-600 w-screen h-screen flex justify-center items-center overflow-hidden">
            <div className="w-lg rounded-md bg-white">
                <Outlet />
            </div>
        </section>
    );

}

export default AuthLayout;
