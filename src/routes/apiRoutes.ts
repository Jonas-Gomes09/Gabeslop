import { Router, Request, Response } from "express";

export const apiRoutes = Router();

// LOGIN
apiRoutes.post("/login", (req: Request, res: Response) => {
    res.json({
        sucesso: true,
        mensagem: "Login realizado com sucesso."
    });
});

// CADASTRO
apiRoutes.post("/cadastro", (req: Request, res: Response) => {
    res.json({
        sucesso: true,
        mensagem: "Usuário cadastrado."
    });
});

// LOGOUT
apiRoutes.post("/logout", (req: Request, res: Response) => {
    res.json({
        sucesso: true,
        mensagem: "Logout realizado."
    });
});

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