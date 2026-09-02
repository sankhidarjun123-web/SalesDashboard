import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUsersInfo } from "../api/users.api";
import type { User } from "../types/user.types";
import { updateSales } from "../api/sales.api";
import { toast } from "react-toastify";

type SaleStatus = "pending" | "shipped" | "cancelled";

interface Sale {
  _id: string;
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

  const { usersId } = useParams();

  const [fetchedUser, setFetchedUser] =
    useState<User | null>(null);

  const [sales, setSales] = useState<Sale[]>([]);


  useEffect(() => {

    const getUserInfo = async () => {

      if (!usersId) return;

      try {

        const info = await getUsersInfo(usersId);

        setFetchedUser(info.userInfo);
        setSales(info.sales);
        toast.success("Welcome back: ", info.userInfo.name);

      } catch (err) {

        console.error(err);
        toast.error("An Error occured while accessing the dashboard!");
      }

    };

    getUserInfo();

  }, [usersId]);


  const updateSaleStatus = async (
    saleId: string,
    newStatus: SaleStatus
  ) => {

    try {

      let update: boolean = false;
      if(newStatus === "shipped") update = true;
      else if (newStatus === "cancelled") update = false;

      else return;
      await updateSales(saleId, update);

      setSales((previousSales) =>
        previousSales.map((sale) =>
          sale._id === saleId
            ? {
                ...sale,
                status: newStatus
              }
            : sale
        )
      );

      toast.success(`Sales status set to: ${newStatus} successfully!`);

    } catch (err) {

      console.error(err);
      toast.error("Error updating the Sales status!");

    }

  };


  const totalSales = sales.length;

  const pendingSales = sales.filter(
    (sale) => sale.status === "pending"
  ).length;

  const shippedSales = sales.filter(
    (sale) => sale.status === "shipped"
  ).length;

  const cancelledSales = sales.filter(
    (sale) => sale.status === "cancelled"
  ).length;


  const getStatusStyle = (status: SaleStatus) => {

    switch (status) {

      case "pending":
        return "bg-amber-100 text-amber-700";

      case "shipped":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";

    }

  };


  if (!fetchedUser) {
    return <div>Loading...</div>;
  }


  return (

    <div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* PAGE HEADER */}

        <div className="mb-8">

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            User Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your assigned sales.
          </p>

        </div>


        {/* USER PROFILE */}

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-2xl font-semibold text-white">

              {fetchedUser.name?.charAt(0) || "U"}

            </div>


            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-3">

                <h2 className="text-xl font-semibold text-slate-900">
                  {fetchedUser.name}
                </h2>

                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase text-indigo-700">
                  {fetchedUser.role}
                </span>

              </div>


              <p className="mt-2 text-sm text-slate-500">

                <span className="font-medium text-slate-700">
                  Email:
                </span>{" "}

                {fetchedUser.email}

              </p>

            </div>

          </div>

        </section>


        {/* STATISTICS */}

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">


          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Total Assigned
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalSales}
            </p>

          </div>


          <div className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {pendingSales}
            </p>

          </div>


          <div className="rounded-xl border border-green-100 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Shipped
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {shippedSales}
            </p>

          </div>


          <div className="rounded-xl border border-red-100 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Cancelled
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {cancelledSales}
            </p>

          </div>

        </section>


        {/* ASSIGNED SALES */}

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">


          <div className="border-b border-slate-200 p-6">

            <h2 className="text-xl font-semibold text-slate-900">
              My Assigned Sales
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Mark your assigned sales as shipped or cancelled.
            </p>

          </div>


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
                    key={sale._id}
                    className="transition hover:bg-slate-50"
                  >


                    <td className="px-6 py-4">

                      <p className="font-medium text-slate-900">
                        {sale.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Assigned: {sale.assignedAt}
                      </p>

                    </td>


                    <td className="px-6 py-4 text-sm text-slate-600">
                      {sale.category}
                    </td>


                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                      ₹{sale.amount.toLocaleString()}
                    </td>


                    <td className="px-6 py-4">

                      <p className="text-sm font-medium text-slate-800">
                        {sale.customerName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {sale.customerEmail}
                      </p>

                    </td>


                    <td className="px-6 py-4 text-sm text-slate-600">
                      {sale.assignedBy}
                    </td>


                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                          sale.status
                        )}`}
                      >
                        {sale.status}
                      </span>

                    </td>


                    <td className="px-6 py-4">

                      {sale.status === "pending" ? (

                        <div className="flex items-center gap-2">


                          <button
                            type="button"
                            onClick={() =>
                              updateSaleStatus(
                                sale._id,
                                "shipped"
                              )
                            }
                            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700"
                          >
                            Mark Shipped
                          </button>


                          <button
                            type="button"
                            onClick={() =>
                              updateSaleStatus(
                                sale._id,
                                "cancelled"
                              )
                            }
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                          >
                            Mark Cancelled
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