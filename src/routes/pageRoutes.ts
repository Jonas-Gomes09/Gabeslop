import { Router } from "express";
import * as clientController from "../controllers/clientController"
import * as cartController from "../controllers/cartController"
import { clientAuth } from "../middlewares/auth";

export const pageRoutes = Router();

// ROTA PARA TODOS
pageRoutes.get("/", clientController.StartPage);
pageRoutes.get("/login", clientController.LoginPage);
pageRoutes.get("/registro", clientController.RegisterPage);

// ROTAS CLIENTE
pageRoutes.get("/profile", clientAuth, clientController.ProfilePage);
pageRoutes.get("/store", clientAuth, clientController.StorePage);
pageRoutes.get("/carrinho", clientAuth, cartController.listarCarrinho);