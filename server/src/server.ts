import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { onlyUsers } from "./middlewares/role.middleware.js";
import authCheck from "./middlewares/auth.middleware.js";
import salesRoutes from "./routes/sales.routes.js";
import connectDB from "./connection.js";

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/sales", authRoutes, authCheck, onlyUsers, salesRoutes);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT http://localhost:${PORT}`);
});