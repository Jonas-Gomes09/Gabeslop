import { Router, Request, Response } from "express";
import * as userController from "../controllers/userController"

export const apiRoutes = Router();

// LOGIN
apiRoutes.post("/login", userController.CreateUser);

// CADASTRO
apiRoutes.post("/registro", userController.CreateUser);

// LOGOUT
apiRoutes.post("/logout", userController.CreateUser);

// LISTAR GAMES
apiRoutes.get("/games", (req: Request, res: Response) => {
    res.json([]);
});

// BUSCAR GAME POR ID
apiRoutes.get("/games/:id", (req: Request, res: Response) => {
    res.json({
        id: req.params.id
    });
});

// ADICIONAR GAME
apiRoutes.post("/games", (req: Request, res: Response) => {
    res.json({
        sucesso: true
    });
});

// ATUALIZAR GAME
apiRoutes.put("/games/:id", (req: Request, res: Response) => {
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