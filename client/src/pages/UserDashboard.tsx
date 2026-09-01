import { useState } from "react";

type SaleStatus = "pending" | "done" | "failed";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user";
}

interface Sale {
  id: string;
  title: string;
  category: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  assignedBy: string;
  status: SaleStatus;
  assignedAt: string;
}

const UserDashboard = () => {
  /* ================= USER ================= */

  const user: User = {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  };

  /* ================= ASSIGNED SALES ================= */

  const [sales, setSales] = useState<Sale[]>([
    {
      id: "sale-1",
      title: "Laptop Order",
      category: "Electronics",
      amount: 50000,
      customerName: "Rahul Kumar",
      customerEmail: "rahul@example.com",
      assignedBy: "Arjun Sharma",
      status: "pending",
      assignedAt: "01 Sep 2026",
    },
    {
      id: "sale-2",
      title: "Office Chair Sale",
      category: "Furniture",
      amount: 15000,
      customerName: "Priya Singh",
      customerEmail: "priya@example.com",
      assignedBy: "Arjun Sharma",
      status: "pending",
      assignedAt: "31 Aug 2026",
    },
    {
      id: "sale-3",
      title: "Mobile Phone Order",
      category: "Electronics",
      amount: 30000,
      customerName: "Aman Verma",
      customerEmail: "aman@example.com",
      assignedBy: "Rahul Sharma",
      status: "done",
      assignedAt: "29 Aug 2026",
    },
    {
      id: "sale-4",
      title: "Book Collection",
      category: "Books",
      amount: 5000,
      customerName: "Sneha Gupta",
      customerEmail: "sneha@example.com",
      assignedBy: "Arjun Sharma",
      status: "failed",
      assignedAt: "28 Aug 2026",
    },
  ]);

  /* ================= UPDATE SALE STATUS ================= */

  const updateSaleStatus = (
    saleId: string,
    newStatus: SaleStatus
  ) => {
    setSales((previousSales) =>
      previousSales.map((sale) =>
        sale.id === saleId
          ? {
              ...sale,
              status: newStatus,
            }
          : sale
      )
    );
  };

  /* ================= STATISTICS ================= */

  const totalSales = sales.length;

  const pendingSales = sales.filter(
    (sale) => sale.status === "pending"
  ).length;

  const completedSales = sales.filter(
    (sale) => sale.status === "done"
  ).length;

  const failedSales = sales.filter(
    (sale) => sale.status === "failed"
  ).length;

  /* ================= STATUS STYLE ================= */

  const getStatusStyle = (status: SaleStatus) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700";

      case "done":
        return "bg-green-100 text-green-700";

      case "failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
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
              My Sales
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


        {/* ================= PAGE HEADER ================= */}

        <div className="mb-8">

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            User Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your assigned sales.
          </p>

        </div>


        {/* ================= USER PROFILE ================= */}

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            {/* AVATAR */}

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-2xl font-semibold text-white">

              {user.name.charAt(0)}

            </div>


            {/* USER INFORMATION */}

            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-3">

                <h2 className="text-xl font-semibold text-slate-900">
                  {user.name}
                </h2>

                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase text-indigo-700">
                  {user.role}
                </span>

              </div>


              <p className="mt-2 text-sm text-slate-500">

                <span className="font-medium text-slate-700">
                  Email:
                </span>{" "}

                {user.email}

              </p>

            </div>

          </div>

        </section>


        {/* ================= STATISTICS ================= */}

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">


          {/* TOTAL */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Total Assigned
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalSales}
            </p>

          </div>


          {/* PENDING */}

          <div className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {pendingSales}
            </p>

          </div>


          {/* COMPLETED */}

          <div className="rounded-xl border border-green-100 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {completedSales}
            </p>

          </div>


          {/* FAILED */}

          <div className="rounded-xl border border-red-100 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Failed
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {failedSales}
            </p>

          </div>

        </section>


        {/* ================= ASSIGNED SALES ================= */}

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">


          {/* SECTION HEADER */}

          <div className="border-b border-slate-200 p-6">

            <h2 className="text-xl font-semibold text-slate-900">
              My Assigned Sales
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete or mark your assigned sales as failed.
            </p>

          </div>


          {/* ================= TABLE ================= */}

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Sale
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Assigned By
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-200">

                {sales.map((sale) => (

                  <tr
                    key={sale.id}
                    className="transition hover:bg-slate-50"
                  >


                    {/* SALE */}

                    <td className="px-6 py-4">

                      <p className="font-medium text-slate-900">
                        {sale.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Assigned: {sale.assignedAt}
                      </p>

                    </td>


                    {/* CATEGORY */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {sale.category}
                    </td>


                    {/* AMOUNT */}

                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">

                      ₹{sale.amount.toLocaleString()}

                    </td>


                    {/* CUSTOMER */}

                    <td className="px-6 py-4">

                      <p className="text-sm font-medium text-slate-800">
                        {sale.customerName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {sale.customerEmail}
                      </p>

                    </td>


                    {/* ASSIGNED BY */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {sale.assignedBy}
                    </td>


                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                          sale.status
                        )}`}
                      >

                        {sale.status}

                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td className="px-6 py-4">

                      {sale.status === "pending" ? (

                        <div className="flex items-center gap-2">


                          {/* DONE */}

                          <button
                            type="button"
                            onClick={() =>
                              updateSaleStatus(
                                sale.id,
                                "done"
                              )
                            }
                            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700"
                          >
                            Mark Done
                          </button>


                          {/* FAILED */}

                          <button
                            type="button"
                            onClick={() =>
                              updateSaleStatus(
                                sale.id,
                                "failed"
                              )
                            }
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                          >
                            Mark Failed
                          </button>

                        </div>

                      ) : (

                        <span className="text-sm text-slate-400">
                          No actions available
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* ================= FOOTER ================= */}

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">

            <p className="text-sm text-slate-500">

              Showing {sales.length} assigned sale
              {sales.length !== 1 ? "s" : ""}

            </p>

          </div>

        </section>

      </main>

    </div>
  );
};

export default UserDashboard;