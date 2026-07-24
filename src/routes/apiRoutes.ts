import * as userController from "../controllers/userController"
import { Router, Request, Response } from "express"
import { upload } from "../middlewares/upload"

export const pageRoutes = Router()

pageRoutes.post("/api/cadastro", upload.single("foto"), userController.CreateUser)