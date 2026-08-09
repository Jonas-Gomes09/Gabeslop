import { Router, Request, Response } from "express";
import * as clientController from "../controllers/clientController"
import { upload } from "../middlewares/upload";
import * as cartController from "../controllers/cartController"

export const apiRoutes = Router();


// CONTA DE USUÁRIO

// LOGIN
apiRoutes.post("/api/login", clientController.LoginUser);
// CADASTRO
apiRoutes.post("/api/registro", upload.single("foto"), clientController.CreateUser);
// SAIR DA CONTA
apiRoutes.get("/logoff", clientController.logoff)



// CARRINHO

// CARREGAR
apiRoutes.get("/cart", cartController.listarCarrinho)
// ADICIONAR
apiRoutes.post("/cart", cartController.adicionarAoCarrinho)
// ATUALIZAR QTD
apiRoutes.put("/cart/:id", cartController.atualizarQtd)
// REMOVER ITEM
apiRoutes.delete("/cart/:id", cartController.deleteItem)
// ESVAZIAR
apiRoutes.post("/cart/wipe", cartController.empty)
// FINALIZAR COMPRA
apiRoutes.post("/cart/comprar", cartController.finalizarCompra);