import { Router, Request, Response } from "express";
import * as clientController from "../controllers/clientController"
import { upload } from "../middlewares/upload";

import { cartRepository } from "../models/cartRepository";
import { cartService } from "../services/cartService";
import { cartController } from "../controllers/cartController";
const cartRepo = new cartRepository()
const cartServ = new cartService(cartRepo)
const cartCont = new cartController(cartServ)

export const apiRoutes = Router();


// CONTA DE USUÁRIO

// LOGIN
apiRoutes.post("/api/login", clientController.LoginUser);
// CADASTRO
apiRoutes.post("/api/registro", upload.single("foto"), clientController.CreateUser);
// SAIR DA CONTA
apiRoutes.get("/logoff", clientController.logoff)


// CARRINHO

// EXIBIR CARRINHO
apiRoutes.get("/cart", cartCont.getCart)
// ADICIONAR AO CARRINHO
apiRoutes.post("/cart", cartCont.addItem)
// ATUALIZAR QTD DO ITEM
apiRoutes.put("/cart/:id", cartCont.updateQtd)
// EXCLUIR ITEM
apiRoutes.delete("/cart/:id", cartCont.removeItem)
// ESVAZIAR TUDO
apiRoutes.post("/cart", cartCont.limparTudo)

// BUSCAR GAME POR ID
apiRoutes.get("/store/:id", (req: Request, res: Response) => {
    res.json({
        id: req.params.id
    });
});

// FINALIZAR COMPRA
apiRoutes.post("/finalizar", (req: Request, res: Response) => {
    res.json({
        sucesso: true,
        mensagem: "Compra finalizada."
    });
});