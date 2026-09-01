import { Router } from "express";
import {
  assignSales,
  updateSales,
  getUserSales,
  getTotalSalesPerCategory,
} from "../controllers/sales.controller.js";

const router = Router();


router.get("/user-sales", getUserSales);

router.get("/total-sales", getTotalSalesPerCategory);

router.post("/assign-sale", assignSales);

router.patch("/update-sale/:saleId", updateSales);

export default router;