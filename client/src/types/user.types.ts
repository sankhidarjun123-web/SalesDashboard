export interface User {
    _id: string;
    name: string;
    role: "user" | "admin";
    email: string;
    created_at: string;
    updated_at: string;
    isLoggedIn: boolean;
    isDeleted: boolean;
    passwordChangedAt: string | null
}