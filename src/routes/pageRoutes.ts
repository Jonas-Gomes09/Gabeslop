import { Router, Request, Response } from "express";

export const pageRoutes = Router();

pageRoutes.get("/", (req: Request, res: Response) => {
    res.render("index");
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

pageRoutes.get("/games", (req: Request, res: Response) => {
    res.render("games");
});

pageRoutes.get("/carrinho", (req: Request, res: Response) => {
    res.render("carrinho");
});