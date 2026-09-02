import type { SaleData } from "../pages/AdminDashboard";
import api from "./baseURL";




export const assignSales = async (saleData: SaleData & { assignedUserId: string }) => {

    const response = await api.post("/api/sales/assign-sale", saleData);

    return response.data;
}


export const updateSales = async (saleId: string, update: boolean) => {

    const response = await api.patch(`/api/sales/update-sale/${saleId}`, {
        completed: update
    });

    return response.data;
}


export const getTotalSalesPerCategory = async () => {

    const response = await api.get("/api/sales/total-sales");

    return response.data;
}