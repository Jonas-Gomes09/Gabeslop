import { Request, Response } from "express";
import { productRepository } from "../models/produtoRepository";
import { userRepository } from "../models/userRepository";

const productRepo = new productRepository()
const userRepo = new userRepository()

// POST /cart
export async function adicionarAoCarrinho(req: Request, res: Response) {
    try {
        req.session.flash = undefined
        if (req.session.carrinho === undefined) {
            req.session.carrinho = []
        }

        const {productId, qtd} = req.body
        const pId = Number(productId)
        const quantidade = Number(qtd)


        const existe = req.session.carrinho?.find(i => i.productId === pId)

        if (existe) {
            existe.qtd += quantidade
        } else {
            req.session.carrinho.push({productId: pId, qtd: quantidade})
            req.session.flash = `Produto adicionado ao carrinho com sucesso!`
        }

        return res.status(200).json({
            success: true,
            message: "Item adicionado ao carrinho com sucesso",
            carrinho: req.session.carrinho
        });

    } catch {
        res.status(500).json({success: false, message: "cartController adicionarAoCarrinho() | Não foi possível adicionar o item ao carrinho"})
    }
}

// GET /cart
export async function listarCarrinho(req: Request, res: Response) {
    try {
        const carrinho = req.session.carrinho || [];

        const itens = await Promise.all(
            carrinho.map(async (ItemCarrinho) => {
                const produto = await productRepo.produtoInfo(ItemCarrinho.productId)

                if (!produto) return null;

                return {
                    produto: produto,
                    qtd: ItemCarrinho.qtd,
                    subtotal: produto._preco * ItemCarrinho.qtd
                }
            })
        )

        const dados = itens.filter(item => item !== null)

        const valorTotal = dados.reduce((acc, item) => acc + item.subtotal, 0)

        return res.status(200).json({
            success: true,
            valorTotal: valorTotal,
            dados: dados,
            totalItens: dados.length
        })

    } catch {
        res.status(500).json({success: false, message: "cartController listarCarrinho() | Não foi possível acessar o carrinho do usuário"})
    }
}

// PUT /cart/:id
export async function atualizarQtd(req: Request, res: Response) {

        const prodId = Number(req.params.id)
        const quantidade = Number(req.body.qtd)

    try {
        const carrinho = req.session.carrinho || [];
        req.session.flash = undefined

        const busca = carrinho.findIndex(c => c.productId === prodId)

        if (busca === -1) {
            return res.status(404).json({success: false, message: "Produto não encontrado"})
        }

        if (!quantidade || quantidade <= 0) {
            carrinho.splice(busca, 1)
            return res.status(200).json({success: true, message: "Quantidade zerada, produto removido"})
        }

        carrinho[busca].qtd = quantidade
        return res.status(200).json({success: true, message: "Quantidade atualizada com sucesso"})
    } catch {
        res.status(500).json({success: false, message: `cartController atualizarQtd() | Não foi possível atualizar a quantidade do item ${prodId}`})
    }
}

// DELETE /cart/:id
export async function deleteItem(req: Request, res: Response) {
        const prodId = Number(req.params.id)

    try {
        req.session.flash = undefined
        const carrinho = req.session.carrinho || [];

        const busca = carrinho.findIndex(i => i.productId === prodId)

        if (prodId === 1) {
            carrinho.splice(0, 1)
            return res.status(200).json({success: true, message: "Item excluído do carrinho"})
        }
        if (!busca) {
            return res.status(404).json({success: false, message: "Produto não encontrado"})
        }

        carrinho.splice(busca, 1)

            req.session.flash = `Item removido com sucesso!`
            return res.status(200).json({success: true, message: "Item excluído do carrinho"})

    } catch {
        res.status(500).json({success: false, message: `cartController deleteItem() | Não foi possível deletar o item ${prodId} do carrinho`})
    }
}

// POST /cart/wipe
export async function empty(req: Request, res: Response) {
    try {
        req.session.flash = undefined
        req.session.carrinho = []

        req.session.flash = `Carrinho esvaziado com sucesso!`
        return res.status(200).json({success: true, message: "Carrinho esvaziado com sucesso"})
    } catch {
        res.status(500).json({success: false, message: `cartController empty() | Não foi possível esvaziar o carrinho`})
    }
}

// GET /comprar
export async function paginaFinalizarCompra(req: Request, res: Response) {
    try {
        const carrinho = req.session.carrinho || [];

        if (carrinho.length <= 0) {
            req.session.flash = "Compre algo antes!"
            return res.status(400).redirect("/store")
        }

        res.status(200).render("pagamento")
    } catch {
        res.status(500).json({success: false, message: "Falha ao carregar pagamento.ejs"})
    }
}

// POST /cart/comprar
export async function finalizarCompra(req: Request, res: Response) {
    try {
        req.session.flash = undefined

        const sessionId = Number(req.session.userId)
        const carrinho = req.session.carrinho || [];

        if (carrinho.length === 0) {
            req.session.flash = "Compre algo antes!"
            return res.status(400).redirect("/store")
        }

        for (const item of carrinho) {
            await productRepo.compra(item.productId, item.qtd)
        }
        
        await userRepo.updateUserTotalCompras(sessionId)

        req.session.flash = "Compra realizada com sucesso!"
        return res.status(200).redirect("/profile")
    } catch(e) {
        return res.status(500).json({success: false, message: "Erro do servidor ao processar a compra"})
    }
}