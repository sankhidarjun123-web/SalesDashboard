export type RegisterBody = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: "user" | "admin"
}

export type LoginBody = {
    email: string,
    password: string
}