import { Router, Request, Response } from "express";
import * as clientController from "../controllers/clientController"
import { upload } from "../middlewares/upload";

export const apiRoutes = Router();


// CONTA DE USUÁRIO

// LOGIN
apiRoutes.post("/api/login", clientController.LoginUser);
// CADASTRO
apiRoutes.post("/api/registro", upload.single("foto"), clientController.CreateUser);
// SAIR DA CONTA
apiRoutes.get("/logoff", clientController.logoff)



// FINALIZAR COMPRA
apiRoutes.post("/finalizar", (req: Request, res: Response) => {
    res.json({
        sucesso: true,
        mensagem: "Compra finalizada."
    });
});