import React from "react";
import type { User } from "../types/user.types";
import type { SaleData } from "../pages/AdminDashboard";
import type{ ChangeEvent, FormEvent } from "react";

const SalesCard = ({ saleData, handleChange, handleCreateSale, selectedUser, setSelectedUser }: { saleData: SaleData, handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, handleCreateSale: (e: FormEvent<HTMLFormElement>) => void, selectedUser: User | null, setSelectedUser: React.Dispatch<React.SetStateAction<User | null>> }) => {

    return <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7">

        {/* HEADER */}

        <div className="mb-6 flex items-start justify-between border-b border-slate-100 pb-4">

            <div>

                <h2 className="text-xl font-semibold text-slate-900">
                    Create Sale
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Create a sale and assign it to an admin.
                </p>

            </div>


            <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                Inbox
            </span>

        </div>


        <form
            onSubmit={handleCreateSale}
            className="space-y-5"
        >


            {/* SALE TITLE */}

            <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Sale Title
                </label>

                <input
                    type="text"
                    name="title"
                    placeholder="Enter sale title"
                    value={saleData.title}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

            </div>


            {/* CATEGORY + AMOUNT */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">


                {/* CATEGORY */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Category
                    </label>

                    <select
                        name="category"
                        value={saleData.category}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option value="Electronics">
                            Electronics
                        </option>

                        <option value="Clothing">
                            Clothing
                        </option>

                        <option value="Books">
                            Books
                        </option>

                        <option value="Furniture">
                            Furniture
                        </option>

                    </select>

                </div>


                {/* AMOUNT */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Amount
                    </label>

                    <input
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        value={saleData.amount}
                        onChange={handleChange}
                        min="0"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                </div>

            </div>


            {/* CUSTOMER NAME */}

            <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Customer Name
                </label>

                <input
                    type="text"
                    name="customerName"
                    placeholder="Enter customer name"
                    value={saleData.customerName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

            </div>


            {/* CUSTOMER EMAIL */}

            <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Customer Email
                </label>

                <input
                    type="email"
                    name="customerEmail"
                    placeholder="Enter customer email"
                    value={saleData.customerEmail}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

            </div>


            {/* SELECTED ADMIN */}

            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">

                <p className="text-sm font-medium text-slate-500">
                    Assigned To
                </p>


                {selectedUser ? (

                    <div className="mt-2 flex items-center justify-between">

                        <div>

                            <p className="font-semibold text-indigo-600">
                                {selectedUser.name}
                            </p>

                            <p className="text-xs text-slate-500">
                                {selectedUser.email}
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() => setSelectedUser(null)}
                            className="text-sm font-medium text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>

                    </div>

                ) : (

                    <p className="mt-2 font-medium text-amber-600">
                        No admin selected
                    </p>

                )}

            </div>


            {/* SUBMIT */}

            <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Create & Assign Sale
            </button>

        </form>

    </section>
}


export default SalesCard;