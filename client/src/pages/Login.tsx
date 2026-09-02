import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { LoginData } from "../context/AuthContext";
import { toast } from "react-toastify";


const Login = () => {

    const { loginUser } = useAuth();
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: ""
    });

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();
        try {
            await loginUser(loginData);
            toast.success("Login successful!");
        } catch (err) {
            console.error(err);
            toast.error("An Error occured!");
        }
    }

    const disableForm = (): boolean => {

        if(loginData.email === "" || loginData.password === ""
        ) return true;

        return false;
    }

    return <form className="flex flex-col gap-8 p-4 w-full min-h-full items-center" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold w-full mb-16">Login</h1>

        <label htmlFor="email" className="w-full">
            <input 
            value={loginData.email}
            onChange={(e) => (
                setLoginData((prev: LoginData) => ({
                    ...prev,
                    email: e.target.value
                }))
            )}
            type="email" name="email" id="email" placeholder="Enter your email" className="w-full border-2 border-grey-300 rounded-sm p-2" />
        </label>

        <label htmlFor="password" className="w-full">
            <input 
            value={loginData.password}
            onChange={(e) => (
                setLoginData((prev: LoginData) => ({
                    ...prev,
                    password: e.target.value
                }))
            )}
            type="password" name="password" id="password" placeholder="Enter your password" className="w-full border-2 border-grey-300 rounded-sm p-2" />
        </label>

        <button type="submit" disabled={disableForm()} className="disabled:cursor-not-allowed disabledopacity-40 w-full bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-300 cursor-pointer">Login</button>

        <span className="text-sm text-gray-500">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></span>
    </form>
}

export default Login;