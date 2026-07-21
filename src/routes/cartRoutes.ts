import { Router } from "express";
import * as cartController from "../controllers/cartController";

const router = Router();

router.get("/", cartController.listarCarrinho);

router.post("/", cartController.adicionarAoCarrinho);

router.put("/:id", cartController.atualizarQuantidade);

router.delete("/:id", cartController.removerDoCarrinho);

router.delete("/", cartController.limparCarrinho);

export default router;