import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: "admin";
}

interface SaleData {
  title: string;
  category: string;
  amount: string;
  customerName: string;
  customerEmail: string;
}

const AdminDashboard = () => {
  // ================= LOGGED-IN ADMIN =================

  const admin = {
    name: "Arjun Sharma",
    email: "arjun@example.com",
    role: "admin",
  };

  // ================= TEMPORARY ADMIN DATA =================

  const admins: Admin[] = [
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "admin",
    },
    {
      id: "2",
      name: "Priya Singh",
      email: "priya@example.com",
      role: "admin",
    },
    {
      id: "3",
      name: "Aman Verma",
      email: "aman@example.com",
      role: "admin",
    },
    {
      id: "4",
      name: "Sneha Gupta",
      email: "sneha@example.com",
      role: "admin",
    },
  ];

  // ================= STATE =================

  const [selectedAdmin, setSelectedAdmin] =
    useState<Admin | null>(null);

  const [saleData, setSaleData] = useState<SaleData>({
    title: "",
    category: "",
    amount: "",
    customerName: "",
    customerEmail: "",
  });

  // ================= HANDLE INPUT =================

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setSaleData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ================= CREATE SALE =================

  const handleCreateSale = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!selectedAdmin) {
      alert("Please select an admin to assign the sale.");
      return;
    }

    const newSale = {
      ...saleData,
      amount: Number(saleData.amount),

      assignedTo: selectedAdmin.id,
      assignedAdmin: selectedAdmin.name,

      status: "pending",
    };

    console.log("Sale Created:", newSale);

    alert(
      `Sale successfully assigned to ${selectedAdmin.name}`
    );

    setSaleData({
      title: "",
      category: "",
      amount: "",
      customerName: "",
      customerEmail: "",
    });

    setSelectedAdmin(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <div className="text-xl font-bold tracking-tight text-indigo-600">
            SalesFlow
          </div>

          {/* NAVIGATION */}
          <div className="flex items-center gap-2 sm:gap-4">

            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
            >
              Dashboard
            </button>

            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              Sales
            </button>

            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              Analytics
            </button>

            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Logout
            </button>

          </div>

        </div>
      </nav>


      {/* ================= MAIN CONTENT ================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage administrators and assign sales.
          </p>

        </div>


        {/* ================= ADMIN PROFILE ================= */}

        <section className="mb-8 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          {/* AVATAR */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-2xl font-semibold text-white">
            {admin.name.charAt(0)}
          </div>


          {/* ADMIN INFO */}
          <div>

            <div className="flex items-center gap-3">

              <h2 className="text-xl font-semibold text-slate-900">
                {admin.name}
              </h2>

              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase text-indigo-700">
                {admin.role}
              </span>

            </div>


            <p className="mt-2 text-sm text-slate-500">

              <span className="font-medium text-slate-700">
                Email:
              </span>{" "}

              {admin.email}

            </p>

          </div>

        </section>


        {/* ================= DASHBOARD GRID ================= */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">


          {/* ================= CREATE SALE ================= */}

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7">

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


                {selectedAdmin ? (

                  <div className="mt-2 flex items-center justify-between">

                    <div>

                      <p className="font-semibold text-indigo-600">
                        {selectedAdmin.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {selectedAdmin.email}
                      </p>

                    </div>


                    <button
                      type="button"
                      onClick={() => setSelectedAdmin(null)}
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


          {/* ================= ADMIN LIST ================= */}

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5">


            {/* HEADER */}

            <div className="mb-6 border-b border-slate-100 pb-4">

              <h2 className="text-xl font-semibold text-slate-900">
                Assign Admin
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Click an admin to assign the sale.
              </p>

            </div>


            {/* ADMIN CARDS */}

            <div className="space-y-3">

              {admins.map((currentAdmin) => {

                const isSelected =
                  selectedAdmin?.id === currentAdmin.id;

                return (

                  <button
                    key={currentAdmin.id}
                    type="button"
                    onClick={() =>
                      setSelectedAdmin(currentAdmin)
                    }
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                        : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-center justify-between">


                      {/* ADMIN INFO */}

                      <div className="flex items-center gap-3">


                        {/* AVATAR */}

                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${
                            isSelected
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >

                          {currentAdmin.name.charAt(0)}

                        </div>


                        <div>

                          <h3 className="text-sm font-semibold text-slate-900">
                            {currentAdmin.name}
                          </h3>

                          <p className="text-xs text-slate-500">
                            {currentAdmin.email}
                          </p>

                        </div>

                      </div>


                      {/* STATUS */}

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >

                        {isSelected
                          ? "Selected"
                          : "Admin"}

                      </span>

                    </div>

                  </button>

                );

              })}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;