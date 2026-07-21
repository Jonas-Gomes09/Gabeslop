import { Request, Response } from "express";

export const listarCarrinho = (req: Request, res: Response): void => {
    res.status(200).json({
        mensagem: "Listando os itens do carrinho"
    });
};

export const adicionarAoCarrinho = (req: Request, res: Response): void => {
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
    res.status(200).json({
        mensagem: "Carrinho esvaziado"
    });
};