import { Outlet } from "react-router-dom"

const AuthLayout = () => {

    return <section className="bg-black w-screen h-screen flex justify-center items-center overflow-hidden">
        <div className="w-lg rounded-md bg-white">
            <Outlet />
        </div>
    </section>
}

export default AuthLayout;