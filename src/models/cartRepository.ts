import { Carrinho, ItemCarrinho } from "../entities/carrinho";
import { Game } from "../entities/produto";

export class CartRepository {

    carregarCarrinho(session: any): Carrinho {
        if (!session.carrinho || session.carrinho.length < 1) {
            session.carrinho = new Carrinho();
        }

        return session.carrinho;
    }

    adicionarProduto(
        session: any, produto: Game,
        quantidade: number = 1
    ): Carrinho {

        const carrinho = this.carregarCarrinho(session);

        const item: any = Game;

        carrinho.adicionarItem(item);

        return carrinho;
    }

    removerProduto(
        session: any,
        produtoId: number
    ): Carrinho {

        const carrinho = this.carregarCarrinho(session);

        carrinho.removerItem(produtoId);

        return carrinho;
    }

    atualizarQuantidade(
        session: any,
        produtoId: number,
        quantidade: number
    ): Carrinho {

        const carrinho = this.carregarCarrinho(session);

        carrinho.atualizarQuantidade(
            produtoId,
            quantidade
        );

        return carrinho;
    }

    limparCarrinho(session: any): Carrinho {

        const carrinho = this.carregarCarrinho(session);

        carrinho.limparCarrinho();

        return carrinho;
    }

    listarItens(session: any): ItemCarrinho[] {

        return this.carregarCarrinho(session).itens;
    }

    calcularTotal(session: any): number {

        return this.carregarCarrinho(session).calcularTotal();
    }

    quantidadeItens(session: any): number {

        return this.carregarCarrinho(session).quantidadeItens();
    }

    salvarCarrinho(session: any) {
        
    }
}