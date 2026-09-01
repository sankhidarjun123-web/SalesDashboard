import { createContext, useState, useEffect, type ReactNode, useContext } from "react";
import { login, logout, register, checkIsAuthenticated } from "../api/auth.api";


export type RegisterData = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: "user" | "admin",
};

export type LoginData = {
    email: string,
    password: string,
};


const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [role, setRole] = useState<"user" | "admin">("user");
    const [id, setId] = useState<string | null>(null);

    const checkAuth = async () => {
        const token = localStorage.getItem("token");

        if(!token) {
            setIsAuth(false);
            return;
        }
        try {
            const response = await checkIsAuthenticated(token);
            setIsAuth(true);
            setRole(response.role);
            setId(response.userId);
        } catch (err) {
            console.error(err);
            setIsAuth(false);
        }

    }
    useEffect(() => {
        checkAuth();
    }, []);


    const registerUser = async (registerData: RegisterData) => {

        try {
            await register(registerData);
            checkAuth();
        } catch (err) {
            console.error(err);
        }
    }

    const loginUser = async (loginData: LoginData) => {

        try {
            const loginResponse = await login(loginData);
            localStorage.setItem("token", loginResponse.token);
            checkAuth();
        } catch (err) {
            console.error(err);
        }
    }


    const logoutUser = async () => {

        try {
            await logout();
            localStorage.removeItem("token");
            checkAuth();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuth, registerUser, loginUser, logoutUser, role, id }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}