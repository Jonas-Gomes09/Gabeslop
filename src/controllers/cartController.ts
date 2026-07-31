import { Request, Response } from "express";
import { CartRepository } from "../models/cartRepository";
import { user } from "../entities/user";

const repo = new CartRepository()

export async function sessionCarrinho(req: Request, res: Response) {
    try {
        req.session.carrinho = await repo.obterCarrinho(req.session)
        return req.session.carrinho
    } catch {
        res.status(500).json({success: false, message: "GET cartController sessionCarrinho | Falha ao obter o carrinho"})
    }
}

export async function listarCarrinho(req: Request, res: Response) {
    try {
        const carrinho = repo.listarItens(req.session.carrinho)
        const username = req.session.userName
        res.render("carrinho", {itens: carrinho, nome: username})
    } catch {
        res.status(500).json({success: false, message: "GET cartController listarCarrinho(req, res) | Falha ao carregar o carrinho.ejs"})
    }
};

export async function adicionarAoCarrinho(req: Request, res: Response) {
    const item = req.body;

    res.status(201).json({
        mensagem: "Item adicionado ao carrinho",
        item
    });
};

export const removerDoCarrinho = (req: Request, res: Response): void => {
    const { id } = req.params;

    res.status(200).json({
        mensagem: `Item ${id} removido do carrinho`
    });
};

export const atualizarQuantidade = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { quantidade } = req.body;

    res.status(200).json({
        mensagem: `Quantidade do item ${id} atualizada`,
        quantidade
    });
};

export const limparCarrinho = (req: Request, res: Response): void => {
    req.session.carrinho = []
    res.status(200).json({
        mensagem: "Carrinho esvaziado"
    });
};