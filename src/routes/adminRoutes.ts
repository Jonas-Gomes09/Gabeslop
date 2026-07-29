import { admin, auth } from "../middlewares/auth";
import { Router, Request, Response } from "express";
import * as clientController from "../controllers/clientController"

const adminRoutes = Router()

adminRoutes.get("/admin/startpage", admin)