import api from "./baseURL";




export const getAdminInfo = async (adminId: string) => {

    const response = await api.get(`/api/user/admin/${adminId}`);

    return response.data;
}

export const getUsersInfo = async (usersId: string) => {
    const response = await api.get(`/api/user/users/${usersId}`);

    return response.data;
}