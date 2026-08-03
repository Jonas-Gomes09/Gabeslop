import { Router, Request, Response } from "express";
import { adminAuth } from "../middlewares/auth"
import * as adminController from "../controllers/adminController"
import { upload } from "../middlewares/upload";

export const adminRoutes = Router();

adminRoutes.get("/admin", adminAuth, adminController.AdminPage)
adminRoutes.post("/admin/store", upload.single("foto"), adminAuth, adminController.CreateProduct)
adminRoutes.put("/admin/store/:id", adminAuth, adminController.UpdateEstoque)
adminRoutes.get("/admin/products", adminController.loadProducts)
adminRoutes.get("/admin/users", adminController.loadUsers)

// ADICIONAR GAME
adminRoutes.post("/api/store", upload.single("foto"), (req: Request, res: Response) => {
    res.json({
        sucesso: true
    });
});

// ATUALIZAR GAME
adminRoutes.put("/api/store/:id", upload.single("foto"), (req: Request, res: Response) => {
    res.json({
        sucesso: true
    });
});

// REMOVER GAME
adminRoutes.delete("/games/:id", (req: Request, res: Response) => {
    res.json({
        sucesso: true
    });
});