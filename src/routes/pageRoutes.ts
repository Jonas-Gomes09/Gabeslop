import { Router, Request, Response } from "express";
import path from "path";

export const pageRoutes = Router();

pageRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

pageRoutes.get("/login", (req: Request, res: Response) => {
    res.render("login");
});

pageRoutes.get("/cadastro", (req: Request, res: Response) => {
    res.render("cadastro");
});

pageRoutes.get("/perfil", (req: Request, res: Response) => {
    res.render("perfil");
});

pageRoutes.get("/store", (req: Request, res: Response) => {
    res.render("store");
});

pageRoutes.get("/carrinho", (req: Request, res: Response) => {
    res.render("carrinho");
});