import { Router, Request, Response } from "express";
import { adminAuth } from "../middlewares/auth"
import * as adminController from "../controllers/adminController"
import { upload } from "../middlewares/upload";

export const adminRoutes = Router();

adminRoutes.get("/admin", adminAuth, adminController.AdminPage)
adminRoutes.post("/admin/store", upload.single("foto"), adminController.CreateProduct)
adminRoutes.put("/admin/store/:id", adminController.UpdateEstoque)
adminRoutes.get("/admin/products", adminController.loadProducts)
adminRoutes.get("/admin/users", adminController.loadUsers)
adminRoutes.delete("/api/store/:id", adminController.deleteProduct);