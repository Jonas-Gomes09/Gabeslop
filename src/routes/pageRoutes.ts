import { Router, Request, Response } from "express";
import path from "path";
import * as userController from "../controllers/clientController"

export const pageRoutes = Router();

pageRoutes.get("/", userController.StartPage);

pageRoutes.get("/login", userController.LoginPage);

pageRoutes.get("/registro", userController.RegisterPage);

pageRoutes.get("/perfil", (req: Request, res: Response) => {
    res.render("perfil");
});

pageRoutes.get("/store", (req: Request, res: Response) => {
    res.render("store");
});

pageRoutes.get("/carrinho", (req: Request, res: Response) => {
    res.render("carrinho");
});