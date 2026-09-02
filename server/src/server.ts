import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import authCheck from "./middlewares/auth.middleware.js";
import salesRoutes from "./routes/sales.routes.js";
import userRoutes from "./routes/users.routes.js";
import connectDB from "./connection.js";

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
    "http://localhost:5173",
    "https://sales-dashboard-lovat-rho.vercel.app",
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api/auth", authRoutes);

app.use("/api/sales", authCheck, salesRoutes);

app.use("/api/user", authCheck, userRoutes);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT http://localhost:${PORT}`);
});