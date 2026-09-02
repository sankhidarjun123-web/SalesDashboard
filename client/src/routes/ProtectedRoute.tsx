import { Navigate } from "react-router-dom";
import React, { type ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRole: string | string[];
}

const ProtectedRoute = ({
    children,
    allowedRole,
}: ProtectedRouteProps) => {

    const { role } = useAuth();

    const hasAccess =
        typeof allowedRole === "string"
            ? role === allowedRole
            : allowedRole.includes(role);

    if (!hasAccess) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;