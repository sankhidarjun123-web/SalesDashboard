import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { login, register, logout } from "../controllers/auth.controller.js";
import type { Request, Response } from "express";
import UserModel from "../models/User.model.js";

const router = Router();

router.get("/check-auth", authMiddleware, async (req: Request, res: Response) => {
    const userId = req.userId;

    if(!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await UserModel.findById(userId).select("-password").lean();

    if(!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Authorized", userId, role: req.userRole, userInfo: user });
});

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authMiddleware, logout);


export default router;