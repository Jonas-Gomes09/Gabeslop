import { Session, SessionData } from "express-session";
import { cartRepository } from "../models/cartRepository";
import { Carrinho } from "../entities/carrinho";

export class cartService {
    constructor(private cartRepo: cartRepository) {}

    async getCart(session: Session & Partial<SessionData>): Promise<Carrinho> {
    if (session.carrinho) {
        return Carrinho.fromJSON(session.carrinho)
    }

    if (session.userId) {
        const uCart = await this.cartRepo.getCartByUId(session.userId)
        session.carrinho = uCart
        return uCart
    }

    return new Carrinho([])
}

async addItem(session: Session & Partial<SessionData>, produtoId: number, quantidade: number): Promise<Carrinho> {
    const carrinho = await this.getCart(session)

    carrinho.pushItem(produtoId, quantidade)
    session.carrinho = carrinho

    if (session.userId) {
        await this.cartRepo.saveCart(session.userId, carrinho)
        return carrinho
    }

    return carrinho
}

async removeItem(session: Session & Partial<SessionData>, produtoId: number): Promise<Carrinho> {
    const carrinho = await this.getCart(session)

    carrinho.spliceItem(produtoId)

    if (session.userId) {
        await this.cartRepo.saveCart(session.userId, carrinho)
        return carrinho
    }

    return carrinho
}

async updateQtd(session: Session & Partial<SessionData>, produtoId: number, quantidade: number): Promise<Carrinho> {
    const carrinho = await this.getCart(session)

    carrinho.updateQtd(produtoId, quantidade)

    if (session.userId) {
        await this.cartRepo.saveCart(session.userId, carrinho)
        return carrinho
    }

    return carrinho
}

async esvaziar(session: Session & Partial<SessionData>) {
    const carrinho = await this.getCart(session)

    carrinho.limparTudo()

    if (session.userId) {
        await this.cartRepo.saveCart(session.userId, carrinho)
        return carrinho
    }
}
}