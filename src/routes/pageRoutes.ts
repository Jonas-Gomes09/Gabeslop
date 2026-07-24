import * as userController from "../controllers/userController"
import { Router } from "express"

export const pageRoutes = Router()

// ROTAS GET
pageRoutes.get("/", userController.StartPage)
pageRoutes.get("/login", userController.LoginPage)
