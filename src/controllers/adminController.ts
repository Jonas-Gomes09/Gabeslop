import {productRepository} from "../models/produtoRepository";
import { Request, Response } from "express";

const repo = new productRepository();

// GET /admin
export async function AdminPage(req: Request, res: Response) {
    try {
        const flash = req.session.flash
        req.session.flash = "Olá, bem-vindo à central do administrador"
        return res.render("admin", {flash: flash})
    } catch {
        return res.status(500).json({success: false, message: "userController StartPage | Falha ao carregar o telainicial.ejs"})
    }
}

// POST /api/store
export async function CreateProduct(req: Request, res: Response) {
    try {
        const titulo = req.body.titulo;
        const estoque = Number(req.body.estoque);
        const categoria = req.body.categoria;
        const foto = req.file ? req.file.filename : null;

        const newProduct = await repo.criar(titulo, estoque, categoria, foto);
        if (newProduct) {
            res.status(201).json({
                success: true,
                produto: newProduct
            });
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
    } catch(e) {
            console.log("Falha ao atualizar estoque:", e)
            res.status(500).json({
                success: false,
                mensagem: "adminController UpdateEstoque() | Erro interno do servidor."
            });
        }
}