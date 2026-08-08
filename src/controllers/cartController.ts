import { Request, Response } from "express";
import { cartService } from "../services/cartService";

export class cartController {
    constructor(private cartService: cartService) {}

    // GET /cart
    async getCart(req: Request, res: Response) {
        try {
            const queryTerm = typeof req.query.q === 'string' ? req.query.q.trim() : '';

            const carrinho = await this.cartService.getCart(req.session)
            const dados = carrinho.filter(queryTerm)

            res.json({success: true, data: dados, total: dados.length})
        } catch {
            res.status(500).json({success: false, message: "Erro ao tentar carregar o carrinho"})
        }
    }

    // POST /cart
    async addItem(req: Request, res: Response) {
        try {
            const produtoId = Number(req.body.produtoId)
            const quantidade = Number(req.body.quantidade)

            this.cartService.addItem(req.session, produtoId, quantidade)
        } catch {
            res.status(500).json({success: false, message: "Erro ao tentar adicionar produto ao carrinho"})
        }
    }

    // DELETE /cart/:id
    async removeItem(req: Request, res: Response) {
        try {
            const produtoId = Number(req.body.produtoId)

            this.cartService.removeItem(req.session, produtoId)
        } catch {
            res.status(500).json({success: false, message: "Erro ao tentar remover item do carrinho"})
        }
    }

    // PUT /cart/:id
    async updateQtd(req: Request, res: Response) {
        const produtoId = Number(req.body.produtoId)
        const quantidade = Number(req.body.quantidade)

        try {
            this.cartService.updateQtd(req.session, produtoId, quantidade)
        } catch {
            res.status(500).json({success: false, message: `Erro ao tentar atualizar quantidade do item ${produtoId}`})
        }
    }

    // POST /cart
    async limparTudo(req:Request, res:Response) {
        this.cartService.esvaziar(req.session)
    }
}