import React from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user.types";

const UsersList = ({ users, selectedUser, setSelectedUser }: { users: User[], selectedUser: User | null, setSelectedUser: React.Dispatch<React.SetStateAction<User | null>> }) => {

    const navigate = useNavigate();

    return <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5">


        {/* HEADER */}

        <div className="mb-6 border-b border-slate-100 pb-4">

            <h2 className="text-xl font-semibold text-slate-900">
                Assign User
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Right click an user to assign the sale.
            </p>

        </div>


        {/* ADMIN CARDS */}

        <div className="space-y-3">

            {users.map((currentUser) => {

                const isSelected =
                    selectedUser?._id === currentUser._id;

                return (

                    <button
                        key={currentUser._id}
                        type="button"
                        onClick={() => navigate(`/dashboard/user/${currentUser._id}`)}
                        onContextMenu={() =>
                            setSelectedUser(currentUser)
                        }
                        className={`w-full rounded-xl border p-4 text-left transition ${isSelected
                                ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                                : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                            }`}
                    >

                        <div className="flex items-center justify-between">


                            {/* ADMIN INFO */}

                            <div className="flex items-center gap-3">


                                {/* AVATAR */}

                                <div
                                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${isSelected
                                            ? "bg-indigo-600 text-white"
                                            : "bg-slate-200 text-slate-700"
                                        }`}
                                >

                                    {currentUser.name.charAt(0)}

                                </div>


                                <div>

                                    <h3 className="text-sm font-semibold text-slate-900">
                                        {currentUser.name}
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        {currentUser.email}
                                    </p>

                                </div>

                            </div>


                            {/* STATUS */}

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${isSelected
                                        ? "bg-indigo-600 text-white"
                                        : "bg-slate-100 text-slate-600"
                                    }`}
                            >

                                {isSelected
                                    ? "Selected"
                                    : "User"}

                            </span>

                        </div>

                    </button>

                );

            })}

        </div>

    </section>
}

export default UsersList;