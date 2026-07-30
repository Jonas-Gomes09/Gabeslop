import { Router, Request, Response } from "express";
import * as clientController from "../controllers/clientController"
import { admin, auth } from "../middlewares/auth";

export const pageRoutes = Router();


// ROTA PARA TODOS
pageRoutes.get("/", clientController.StartPage);

pageRoutes.get("/login", clientController.LoginPage);

pageRoutes.get("/registro", clientController.RegisterPage);


// ROTAS CLIENTE
pageRoutes.get("/perfil", auth, (req: Request, res: Response) => {
    res.render("perfil");
});

pageRoutes.get("/store", auth, (req: Request, res: Response) => {
    res.render("store");
});

pageRoutes.get("/carrinho", auth, (req: Request, res: Response) => {
    res.render("carrinho");
});


// ROTAS ADMIN
pageRoutes.get("/admin/startpage", admin, (req: Request, res: Response) => {

})