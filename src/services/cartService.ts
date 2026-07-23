import { Carrinho, ItemCarrinho } from "../entities/carrinho";

class CartService {

    obterCarrinho(session: any): Carrinho {
        if (!session.carrinho) {
            session.carrinho = new Carrinho();
        }

        return session.carrinho;
    }

    adicionarProduto(
        session: any,
        produto: {
            id: number;
            nome: string;
            preco: number;
            imagem?: string;
        },
        quantidade: number = 1
    ): Carrinho {

        const carrinho = this.obterCarrinho(session);

        const item: ItemCarrinho = {
            produtoId: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade
        };

        carrinho.adicionarItem(item);

        return carrinho;
    }

    removerProduto(
        session: any,
        produtoId: number
    ): Carrinho {

        const carrinho = this.obterCarrinho(session);

        carrinho.removerItem(produtoId);

        return carrinho;
    }

    atualizarQuantidade(
        session: any,
        produtoId: number,
        quantidade: number
    ): Carrinho {

        const carrinho = this.obterCarrinho(session);

        carrinho.atualizarQuantidade(
            produtoId,
            quantidade
        );

        return carrinho;
    }

    limparCarrinho(session: any): Carrinho {

        const carrinho = this.obterCarrinho(session);

        carrinho.limparCarrinho();

        return carrinho;
    }

    listarItens(session: any): ItemCarrinho[] {

        return this.obterCarrinho(session).itens;
    }

    calcularTotal(session: any): number {

        return this.obterCarrinho(session).calcularTotal();
    }

    quantidadeItens(session: any): number {

        return this.obterCarrinho(session).quantidadeItens();
    }
}

export default new CartService();