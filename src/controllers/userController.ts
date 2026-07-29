import express, { Request, Response } from "express"
import { userRepository } from "../models/userRepository"
import { user } from "../entities/user"
// IMPORTAR SESSION

const repo = new userRepository()

export async function StartPage(req: Request, res: Response) {
    try {
        return res.render("telainicial", {flash: null})
    } catch {
        return res.status(500).json({success: false, message: "userController StartPage(req, res) | Falha ao carregar o index.html"})
    }
}
export async function LoginPage(req: Request, res: Response) {
    try {
        return res.render("login", {flash: null})
    } catch {
        return res.status(500).json({success: false, message: "userController LoginPage(req, res) | Falha ao carregar o index.html"})
    }
}
export async function registerPage(req: Request, res: Response) {
    try {
        return res.render("registro", {flash: null})
    } catch {
        return res.status(500).json({success: false, message: "userController LoginPage(req, res) | Falha ao carregar o index.html"})
    }
}


export async function CreateUser(req: Request, res: Response) {
    try {
        const {nome, email, senha} = req.body

        if (!nome || nome.trim() === "") {
            req.session.flash = "Insira um nome de usuário."
        }
        if (!email || email.includes("@")) {
            req.session.flash = "Insira um email válido."
        }
        if (!senha || senha.length < 6) {
            req.session.flash = "Senha deve conter ao menos 6 caracteres.";
        }
        const foto = req.file ? `/uploads/${req.file.filename}` : null;

        repo.cadastro(nome, email, senha, foto)
    } catch {
        return res.status(500).json({success: false, message: "userController CreateUser(req, res) | Falha ao criar o usuário"})
    }
}