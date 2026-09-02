import { Router } from "express";
import { getAdminInfo, getUserInfo } from "../controllers/users.controller.js";
import { onlyAdmins } from "../middlewares/role.middleware.js";



const router = Router();


router.get("/admin/:adminId", onlyAdmins, getAdminInfo);

router.get("/users/:usersId", getUserInfo);

export default router;