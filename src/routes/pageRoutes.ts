import * as userController from "../controllers/userController"
import { Router } from "express"

export const pageRoutes = Router()

pageRoutes.get("/", userController.StartPage)