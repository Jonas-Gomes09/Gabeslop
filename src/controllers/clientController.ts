import express, { Request, Response } from "express"
import { userRepository } from "../models/userRepository"
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
        return res.status(500).json({success: false, message: "GET userController LoginPage(req, res) | Falha ao carregar o index.html"})
    }
}
export async function RegisterPage(req: Request, res: Response) {
    try {
        return res.render("registro", {flash: null})
    } catch {
        return res.status(500).json({success: false, message: "GET userController RegisterPage(req, res) | Falha ao carregar o index.html"})
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
        return res.status(500).json({success: false, message: "POST userController CreateUser(req, res) | Falha ao criar o usuário"})
    }
}

export async function LoginUser(req: Request, res: Response) {
    try {
        const {email, senha} = req.body
        const user = await repo.login(email, senha)
        if (!user || user === null) {
            req.session.flash = "Usuário ou senha incorretos"
            return res.redirect("/login")
        }

        if (user.perms === "client") {req.session.admin = false} else {req.session.admin = true}
        req.session.userId = user.id
        req.session.userName = user.nome
        req.session.email = user.email
        req.session.carrinho = user.carrinho

        if (req.session.admin = true) {
            res.redirect("/admin/startpage")
        } else {
            res.redirect("/carrinho")
        }
        
    } catch {
        return res.status(500).json({success: false, message: "POST userController LoginUser(req, res) | Falha ao criar o usuário"})
    }
}