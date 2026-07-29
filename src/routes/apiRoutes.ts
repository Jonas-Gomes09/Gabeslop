import { Router, Request, Response } from "express";
import * as userController from "../controllers/clientController"

export const apiRoutes = Router();

// LOGIN
apiRoutes.post("/api/login", userController.CreateUser);

// CADASTRO
apiRoutes.post("/api/registro", userController.CreateUser);

// LOGOUT
apiRoutes.post("/api/logout", userController.CreateUser);

// BUSCAR GAME POR ID
apiRoutes.get("/store/:id", (req: Request, res: Response) => {
    res.json({
        id: req.params.id
    });
});

// ADICIONAR GAME
apiRoutes.post("/api/store", (req: Request, res: Response) => {
    res.json({
        sucesso: true
    });
});

// ATUALIZAR GAME
apiRoutes.put("/api/store/:id", (req: Request, res: Response) => {
    res.json({
        sucesso: true
    });
});

// REMOVER GAME
apiRoutes.delete("/games/:id", (req: Request, res: Response) => {
    res.json({
        sucesso: true
    });
});

// ADICIONAR GAME AO CARRINHO
apiRoutes.post("/adicionar/:id", (req: Request, res: Response) => {
    res.json({
        sucesso: true,
        game: req.params.id
    });
});

// REMOVER GAME DO CARRINHO
apiRoutes.delete("/remover/:id", (req: Request, res: Response) => {
    res.json({
        sucesso: true
    });
});

// FINALIZAR COMPRA
apiRoutes.post("/finalizar", (req: Request, res: Response) => {
    res.json({
        sucesso: true,
        mensagem: "Compra finalizada."
    });
});