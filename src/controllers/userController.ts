import express, { Request, Response } from "express"
import { userRepository } from "../models/userRepository"
import { user } from "../entities/user"
// IMPORTAR SESSION

const repo = new userRepository()

export async function StartPage(req: Request, res: Response) {
    try {
        return res.render("index")
        flash: null
    } catch {
        return res.status(500).json({success: false, message: "userController StartPage(req, res) | Falha ao carregar o index.html"})
    }
}
export async function LoginPage(req: Request, res: Response) {
    try {
        return res.render("login")
        flash: null
    } catch {
        return res.status(500).json({success: false, message: "userController StartPage(req, res) | Falha ao carregar o index.html"})
    }
}

export async function addUser(req: Request, res: Response) {
    try {
        const {nome, email, senha, foto} = req.body

        if (!nome || nome.trim() === "") {
            flash: "Insira um nome de usuário."
            res.redirect("/registro");
        }
        if (!email || email.includes("@")) {
            flash: "Insira um email válido."
            res.redirect("/registro");
        }
        if (!senha || senha.length < 6) {
            flash: "Senha deve conter ao menos 6 caracteres.";
        }

        repo.cadastro(nome, email, senha, foto)
    } catch {

    }
}