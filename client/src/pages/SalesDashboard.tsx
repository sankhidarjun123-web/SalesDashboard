import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getTotalSalesPerCategory } from "../api/sales.api";

interface CategorySale {
    category: string;
    total: number;
    count: number;
}

const SalesDashboard = () => {
    const [sales, setSales] = useState<CategorySale[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSales = async () => {
            try {
                setLoading(true);

                const saleInfo = await getTotalSalesPerCategory();

                setSales(saleInfo.sales);
            } catch (error) {
                console.error(error);
                toast.error("Error accessing the data of sales!");
                setError("Failed to fetch sales data.");
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    const statistics = useMemo(() => {
        const totalAmount = sales.reduce(
            (total, sale) => total + sale.total,
            0
        );

        const totalSales = sales.reduce(
            (total, sale) => total + sale.count,
            0
        );

        return {
            totalAmount,
            totalSales,
        };
    }, [sales]);

    const pieStyle = useMemo(() => {
        if (sales.length === 0) {
            return {
                background: "#e2e8f0",
            };
        }

        const colors = [
            "#3b82f6",
            "#22c55e",
            "#f59e0b",
            "#ef4444",
            "#8b5cf6",
            "#06b6d4",
            "#ec4899",
        ];

        let currentPercentage = 0;

        const gradients = sales.map((sale, index) => {
            const percentage =
                statistics.totalSales > 0
                    ? (sale.count / statistics.totalSales) * 100
                    : 0;

            const start = currentPercentage;
            currentPercentage += percentage;

            return `${colors[index % colors.length]} ${start}% ${currentPercentage}%`;
        });

        return {
            background: `conic-gradient(${gradients.join(", ")})`,
        };
    }, [sales, statistics.totalSales]);

    const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-amber-500",
        "bg-red-500",
        "bg-purple-500",
        "bg-cyan-500",
        "bg-pink-500",
    ];

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-lg text-slate-500">
                    Loading sales dashboard...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-red-500">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-6">

            {/* HEADER */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-900">
                    Sales Dashboard
                </h1>

                <p className="mt-2 text-slate-500">
                    Overview of shipped sales by category.
                </p>

            </div>


            {/* SUMMARY CARDS */}

            <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* TOTAL SALES */}

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                    <p className="text-sm font-medium text-slate-500">
                        Total Shipped Sales
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {statistics.totalSales}
                    </p>

                </div>


                {/* TOTAL AMOUNT */}

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                    <p className="text-sm font-medium text-slate-500">
                        Total Sales Amount
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        ₹{statistics.totalAmount.toLocaleString()}
                    </p>

                </div>

            </div>


            {/* MAIN DASHBOARD */}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">


                {/* LEFT SIDE - PIE CHART */}

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-xl font-semibold text-slate-900">
                        Sales by Category
                    </h2>


                    <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">


                        {/* PIE CHART */}

                        <div
                            className="relative h-56 w-56 rounded-full"
                            style={pieStyle}
                        >

                            {/* CENTER CIRCLE */}

                            <div className="absolute inset-8 flex flex-col items-center justify-center rounded-full bg-white">

                                <span className="text-3xl font-bold text-slate-900">
                                    {statistics.totalSales}
                                </span>

                                <span className="text-sm text-slate-500">
                                    Sales
                                </span>

                            </div>

                        </div>


                        {/* LEGEND */}

                        <div className="max-h-64 space-y-4 overflow-y-auto">

                            {sales.map((sale, index) => {

                                const percentage =
                                    statistics.totalSales > 0
                                        ? (
                                            sale.count /
                                            statistics.totalSales
                                        ) * 100
                                        : 0;

                                return (

                                    <div
                                        key={sale.category}
                                        className="flex items-center gap-3"
                                    >

                                        <div
                                            className={`h-3 w-3 rounded-full ${
                                                colors[
                                                    index % colors.length
                                                ]
                                            }`}
                                        />

                                        <div>

                                            <p className="font-medium text-slate-800">
                                                {sale.category}
                                            </p>

                                            <p className="text-sm text-slate-500">

                                                {sale.count} Sales

                                                <span className="ml-2">
                                                    (
                                                    {percentage.toFixed(1)}
                                                    %)
                                                </span>

                                            </p>

                                        </div>

                                    </div>

                                );
                            })}

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE - TABLE */}

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-200 p-6">

                        <h2 className="text-xl font-semibold text-slate-900">
                            Category Summary
                        </h2>

                    </div>


                    <div className="overflow-x-auto">

                        <table className="w-full">


                            {/* TABLE HEADER */}

                            <thead className="bg-slate-50">

                                <tr>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                                        Category
                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                                        Number
                                    </th>

                                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                                        Amount
                                    </th>

                                </tr>

                            </thead>


                            {/* TABLE BODY */}

                            <tbody className="divide-y divide-slate-200">

                                {sales.map((sale, index) => (

                                    <tr
                                        key={sale.category}
                                        className="hover:bg-slate-50"
                                    >

                                        {/* CATEGORY */}

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3">

                                                <div
                                                    className={`h-3 w-3 rounded-full ${
                                                        colors[
                                                            index %
                                                            colors.length
                                                        ]
                                                    }`}
                                                />

                                                <span className="font-medium text-slate-800">
                                                    {sale.category}
                                                </span>

                                            </div>

                                        </td>


                                        {/* NUMBER */}

                                        <td className="px-6 py-5 text-center font-semibold">

                                            {sale.count}

                                        </td>


                                        {/* AMOUNT */}

                                        <td className="px-6 py-5 text-right font-semibold text-slate-800">

                                            ₹
                                            {sale.total.toLocaleString()}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>


                            {/* TOTAL */}

                            <tfoot className="border-t-2 border-slate-200 bg-slate-50">

                                <tr>

                                    <td className="px-6 py-5 font-bold text-slate-900">
                                        Total
                                    </td>

                                    <td className="px-6 py-5 text-center font-bold text-slate-900">

                                        {statistics.totalSales}

                                    </td>

                                    <td className="px-6 py-5 text-right font-bold text-slate-900">

                                        ₹
                                        {statistics.totalAmount.toLocaleString()}

                                    </td>

                                </tr>

                            </tfoot>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default SalesDashboard;