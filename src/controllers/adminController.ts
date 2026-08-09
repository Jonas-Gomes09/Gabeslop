import {productRepository} from "../models/produtoRepository";
import { Request, Response } from "express";
import { consoleContent } from "../types/serverConsole";
import { userRepository } from "../models/userRepository";

const productRepo = new productRepository();
const userRepo = new userRepository();

// GET /admin
export async function AdminPage(req: Request, res: Response) {
    try {
        const flash = req.session.flash
        req.session.flash = "Olá, bem-vindo à central do administrador"
        return res.render("admin", {flash: flash, console: consoleContent})
    } catch {
        return res.status(500).json({success: false, message: "userController StartPage | Falha ao carregar o telainicial.ejs"})
    }
}

// POST /api/store
export async function CreateProduct(req: Request, res: Response) {
    try {
        const {titulo, preco, estoque, categoria} = req.body
        const foto = req.file ? req.file.filename : null;

        const newProduct = await productRepo.criar(titulo, Number(preco), Number(estoque), categoria, foto);
        if (newProduct) {
            req.session.flash = "Produto adicionado!"
            res.redirect("/admin")
        } else {
            res.status(400).json({
                success: false,
                mensagem: "Falha ao criar o produto."
            });
        }
    } catch(e) {
        console.log("Falha ao criar produto:", e)
        res.status(500).json({
            success: false,
            mensagem: "adminController CreateProduct() | Erro interno do servidor."
        });
    }
}


// PUT /api/store/:id
export async function UpdateEstoque(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const estoque = Number(req.body.estoque);

        const funcao = await productRepo.atualizarEstoque(id, estoque)

        if (funcao === null) {
            req.session.flash = `Não foi encontrado nenhum produto com ID ${id}`
        }
    } catch(e) {
            console.log("Falha ao atualizar estoque:", e)
            res.status(500).json({
                success: false,
                mensagem: "adminController UpdateEstoque() | Erro interno do servidor."
            });
        }
}


// DELETE /api/store/:id
export async function deleteProduct(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        productRepo.removerProduto(id)
        res.status(200).json({success: true})
    } catch(e) {
            console.log("Falha ao atualizar estoque:", e)
            res.status(500).json({
                success: false,
                mensagem: "adminController UpdateEstoque() | Erro interno do servidor."
            });
        }
}


// Criar conta de admin (EXECUTADO AO LIGAR O SERVIDOR)
async function adminUser() {
    userRepo.cadastro("Admin", "admin@gabeslop.com", "admin123")
} adminUser()


// Carregar produtos
export async function loadUsers (req: Request, res: Response) {
    const queryTerm = typeof req.query.q === 'string' ? req.query.q.trim() : '';

    const usuarios = await userRepo.listAll(queryTerm)
    const dados = usuarios.map(u => u.toJSON())
    res.json({sucesso: true, total: dados.length, dados: dados})
}

// Carregar usuários
export async function loadProducts (req: Request, res: Response) {
    const queryTerm = typeof req.query.q === 'string' ? req.query.q.trim() : '';

    const products = await productRepo.listAll(queryTerm)
    const dados = products.map(u => u.toJSON())
    return res.json({sucesso: true, total: products.length, dados: dados})
}