import api from "./baseURL";
import type { RegisterData, LoginData } from "../context/AuthContext";


export const checkIsAuthenticated = async () => {

    const response = await api.get("/api/auth/check-auth");

    return response.data;
}

export const register = async (registerData: RegisterData) => {

    const { name, email, password, confirmPassword, role } = registerData;

    const response = await api.post("/api/auth/register", {
        name,
        email,
        password,
        confirmPassword,
        role
    });
    return response.data;
}


export const login = async (loginData: LoginData) => {

    const { email, password } = loginData;

    const response = await api.post("/api/auth/login", {
        email,
        password
    });
    return response.data;
}


export const logout = async () => {

    const response = await api.post("/api/auth/logout");
    return response.data;
}