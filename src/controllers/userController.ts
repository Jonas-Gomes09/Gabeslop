import express, { Request, Response } from "express"
import { userRepository } from "../models/userRepository"
// IMPORTAR SESSION

export async function StartPage(req: Request, res: Response) {
    try {
        // AINDA FALTA O FLASH DA SESSION POR EXEMPLO
        return res.render("index")
    } catch {
        return res.status(500).json({success: false, message: "userController StartPage(req, res) | Falha ao carregar o index.html"})
    }
}