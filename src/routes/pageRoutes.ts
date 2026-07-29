import { Router, Request, Response } from "express";
import * as clientController from "../controllers/clientController"
import { auth } from "../middlewares/auth";

export const pageRoutes = Router();

pageRoutes.get("/", clientController.StartPage);

pageRoutes.get("/login", clientController.LoginPage);

pageRoutes.get("/registro", clientController.RegisterPage);

pageRoutes.get("/perfil", auth, (req: Request, res: Response) => {
    res.render("perfil");
});

pageRoutes.get("/store", auth, (req: Request, res: Response) => {
    res.render("store");
});

pageRoutes.get("/carrinho", auth, (req: Request, res: Response) => {
    res.render("carrinho");
});