import {
    createContext,
    useState,
    useEffect,
    type ReactNode,
    useContext
} from "react";

import {
    login,
    logout,
    register,
    checkIsAuthenticated
} from "../api/auth.api";

import type { User } from "../types/user.types";


export type RegisterData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "user" | "admin";
};

export type LoginData = {
    email: string;
    password: string;
};


const AuthContext = createContext<any>(null);


export const AuthProvider = ({
    children
}: {
    children: ReactNode
}) => {

    const [isAuth, setIsAuth] = useState(false);

    const [role, setRole] =
        useState<"user" | "admin" | null>(null);

    const [id, setId] =
        useState<string | null>(null);

    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);


    const checkAuth = async () => {

        const token = localStorage.getItem("token");

        // No token
        if (!token) {
            setIsAuth(false);
            setRole(null);
            setId(null);
            setUser(null);

            setLoading(false);
            return;
        }

        try {

            const response =
                await checkIsAuthenticated();

            setIsAuth(true);

            setRole(response.role);

            setId(response.userId);

            setUser(response.userInfo);

        } catch (err) {

            console.error(err);

            setIsAuth(false);
            setRole(null);
            setId(null);
            setUser(null);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        checkAuth();

    }, []);


    const registerUser = async (
        registerData: RegisterData
    ) => {

        try {

            await register(registerData);

            await checkAuth();

        } catch (err) {

            console.error(err);

        }
    };


    const loginUser = async (
        loginData: LoginData
    ) => {

        try {

            const loginResponse =
                await login(loginData);

            localStorage.setItem(
                "token",
                loginResponse.token
            );

            await checkAuth();

        } catch (err) {

            console.error(err);

        }
    };


    const logoutUser = async () => {

        try {

            await logout();

            localStorage.removeItem("token");

            setIsAuth(false);
            setRole(null);
            setId(null);
            setUser(null);

        } catch (err) {

            console.error(err);

        }
    };


    return (

        <AuthContext.Provider
            value={{
                isAuth,
                role,
                id,
                user,
                loading,
                checkAuth,
                registerUser,
                loginUser,
                logoutUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};


export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );

    }

    return context;

};