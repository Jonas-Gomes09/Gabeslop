import { Router, Request, Response } from "express";
import * as clientController from "../controllers/clientController"
import { clientAuth, jaLogado } from "../middlewares/auth";

export const pageRoutes = Router();

// ROTA PARA TODOS
pageRoutes.get("/", clientController.StartPage);
pageRoutes.get("/login", jaLogado, clientController.LoginPage);
pageRoutes.get("/registro", jaLogado, clientController.RegisterPage);
pageRoutes.get("/naoexiste", clientController.naoExiste)

// ROTAS CLIENTE
pageRoutes.get("/profile", clientAuth, clientController.ProfilePage);
pageRoutes.get("/store", clientAuth, clientController.StorePage);

// pode ficar de easter egg talvez?
pageRoutes.get("/forbidden", clientController.ForbiddenPage)

// BUSCAR GAME POR ID
pageRoutes.get("/store/:id", (req: Request, res: Response) => {
    res.json({
        id: req.params.id
    });
});