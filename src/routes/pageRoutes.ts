import { Router } from "express";
import * as clientController from "../controllers/clientController"
import * as cartController from "../controllers/cartController"
import { clientAuth, jaLogado } from "../middlewares/auth";

export const pageRoutes = Router();

// ROTA PARA TODOS
pageRoutes.get("/", clientController.StartPage);
pageRoutes.get("/login", jaLogado, clientController.LoginPage);
pageRoutes.get("/registro", jaLogado, clientController.RegisterPage);

// ROTAS CLIENTE
pageRoutes.get("/profile", clientAuth, clientController.ProfilePage);
pageRoutes.get("/store", clientAuth, clientController.StorePage);
pageRoutes.get("/carrinho", clientAuth, cartController.listarCarrinho);

// pode ficar de easter egg talvez?
pageRoutes.get("/forbidden", clientController.ForbiddenPage)