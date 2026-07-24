import { Router, Request, Response } from "express";

export const cartRoutes = Router();

// EXIBIR CARRINHO
cartRoutes.get("/", (req: Request, res: Response) => {
    res.render("carrinho");
});

// ADICIONAR GAME AO CARRINHO
cartRoutes.post("/adicionar/:id", (req: Request, res: Response) => {
    res.json({
        sucesso: true,
        game: req.params.id
    });
});

// REMOVER GAME DO CARRINHO
cartRoutes.delete("/remover/:id", (req: Request, res: Response) => {
    res.json({
        sucesso: true
    });
});

// FINALIZAR COMPRA
cartRoutes.post("/finalizar", (req: Request, res: Response) => {
    res.json({
        sucesso: true,
        mensagem: "Compra finalizada."
    });
});