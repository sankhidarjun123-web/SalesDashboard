import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type{ RegisterData } from "../context/AuthContext";

const Register = () => {

    const { registerUser } = useAuth();
    const [registerData, setRegisterData] = useState<RegisterData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user"
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();


        try {
            await registerUser(registerData);
            console.log("Success");
        } catch (err) {
            console.error(err);
        }
    }

    const disableForm = (): boolean => {

        if(registerData.name === "" || registerData.email === "" || registerData.password === ""
            || registerData.confirmPassword === ""
        ) return true;

        if(registerData.password !== registerData.confirmPassword) return true;

        return false;
    }


    return <form className="flex flex-col gap-4 p-4 w-full min-h-full items-center" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold w-full mb-16">Register</h1>

        <label htmlFor="name" className="w-full">
            <input
            value={registerData.name}
            onChange={(e) => (
                setRegisterData((prev: RegisterData) => ({
                    ...prev,
                    name: e.target.value
                }))
            )} 
            type="text" name="name" id="name" placeholder="Enter your full name" className="w-full border-2 border-grey-300 rounded-sm p-2" />
        </label>

        <label htmlFor="email" className="w-full">
            <input
            value={registerData.email}
            onChange={(e) => (
                setRegisterData((prev: RegisterData) => ({
                    ...prev,
                    email: e.target.value
                }))
            )} 
            type="email" name="email" id="email" placeholder="Enter your email" className="w-full border-2 border-grey-300 rounded-sm p-2" />
        </label>

        <label htmlFor="password" className="w-full">
            <input
            value={registerData.password}
            onChange={(e) => (
                setRegisterData((prev: RegisterData) => ({
                    ...prev,
                    password: e.target.value
                }))
            )}
            type="password" name="password" id="password" placeholder="Enter your password" className="w-full border-2 border-grey-300 rounded-sm p-2" />
        </label>

        <label htmlFor="confirmPassword" className="w-full">
            <input 
            value={registerData.confirmPassword}
            onChange={(e) => (
                setRegisterData((prev: RegisterData) => ({
                    ...prev,
                    confirmPassword: e.target.value
                }))
            )}
            type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" className="w-full border-2 border-grey-300 rounded-sm p-2" />
        </label>

        <label htmlFor="role" className="w-full">
            <select 
            value={registerData.role}
            onChange={(e) => (
                setRegisterData((prev: RegisterData) => ({
                    ...prev,
                    role: e.target.value as "user" | "admin"
                }))
            )}
            name="role" id="role" className="w-full border-2 border-grey-300 rounded-sm p-2">
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        </label>
        <button disabled={disableForm()} type="submit" className="w-full bg-blue-500 disabled:cursor-not-allowed disabledopacity-40 text-white p-2 rounded-sm hover:bg-blue-300 cursor-pointer">Register</button>

        <span className="text-sm text-gray-500">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></span>
    </form>
}

export default Register;