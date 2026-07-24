import * as userController from "../controllers/userController"
import { Router, Request, Response } from "express"
import { upload } from "../middlewares/upload"

export const pageRoutes = Router()

// ROTAS GET
pageRoutes.get("/", userController.StartPage)
pageRoutes.get("/login", userController.LoginPage)