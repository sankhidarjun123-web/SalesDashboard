import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useParams } from "react-router-dom";
import type { User } from "../types/user.types";
import { useAuth } from "../context/AuthContext";
import UsersList from "../features/UsersList";
import SalesCard from "../features/SalesCard";
import { getAdminInfo } from "../api/users.api";
import { assignSales } from "../api/sales.api";
import { toast } from "react-toastify";

export interface SaleData {
  title: string;
  category: string;
  amount: number;
  customerName: string;
  customerEmail: string;
}

const AdminDashboard = () => {
  // ================= LOGGED-IN ADMIN =================

  const { user } = useAuth();
  const { adminId } = useParams();

  // ================= TEMPORARY ADMIN DATA =================

  const [users, setUsers] = useState<User[]>([
  ]);

  // ================= STATE =================

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const [saleData, setSaleData] = useState<SaleData>({
    title: "",
    category: "",
    amount: 0,
    customerName: "",
    customerEmail: "",
  });

  useEffect(() => {
    const getAdminsInfo = async () => {
      if (!adminId) return;
      try {
        const info = await getAdminInfo(adminId);
        setUsers(info.users);
        toast.success("Welcome back: ", user.name);
      } catch (err) {
        console.error(err);
        toast.error("An error occured while accessing the page!");
      }
    }

    getAdminsInfo();
  }, [adminId]);

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

  const handleCreateSale = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!selectedUser) {
      alert("Please select an admin to assign the sale.");
      return;
    }

    const newSale = {
      ...saleData,
      assignedUserId: selectedUser._id
    };

    try {

      await assignSales(newSale);
      toast.success(`Sale assigned to ${selectedUser.name} successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("An error occured while assigning sales!");
    }

    console.log("Sale Created:", newSale);

    setSaleData({
      title: "",
      category: "",
      amount: 0,
      customerName: "",
      customerEmail: "",
    });

    setSelectedUser(null);
  };

  return (
    <div>


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
            {user.name.charAt(0)}
          </div>


          {/* ADMIN INFO */}
          <div>

            <div className="flex items-center gap-3">

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

        </section>


        {/* ================= DASHBOARD GRID ================= */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">


          {/* ================= CREATE SALE ================= */}

          <SalesCard selectedUser={selectedUser} setSelectedUser={setSelectedUser} handleChange={handleChange} handleCreateSale={handleCreateSale} saleData={saleData} />


          {/* ================= ADMIN LIST ================= */}
          <UsersList selectedUser={selectedUser} setSelectedUser={setSelectedUser} users={users} />

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;