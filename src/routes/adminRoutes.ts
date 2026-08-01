import { Router } from "express";
import { adminAuth } from "../middlewares/auth"
import * as adminController from "../controllers/adminController"

export const adminRoutes = Router();

adminRoutes.get("/admin", adminAuth, adminController.AdminPage)
adminRoutes.post("/admin/store", adminAuth, adminController.CreateProduct)
adminRoutes.put("/admin/store/:id", adminAuth, adminController.UpdateEstoque)