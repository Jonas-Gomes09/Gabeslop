export interface ItemCarrinho {
    produtoId: number;
    nome: string;
    preco: number;
    imagem?: string;
    quantidade: number;
}

export class Carrinho {
    itens: ItemCarrinho[];

    constructor() {
        this.itens = [];
    }

    adicionarItem(item: ItemCarrinho): void {
        const existente = this.itens.find(
            p => p.produtoId === item.produtoId
        );

        if (existente) {
            existente.quantidade += item.quantidade;
        } else {
            this.itens.push(item);
        }
    }

    removerItem(produtoId: number): void {
        this.itens = this.itens.filter(
            item => item.produtoId !== produtoId
        );
    }

    atualizarQuantidade(produtoId: number, quantidade: number): void {
        const item = this.itens.find(
            p => p.produtoId === produtoId
        );

        if (!item) return;

        if (quantidade <= 0) {
            this.removerItem(produtoId);
        } else {
            item.quantidade = quantidade;
        }
    }

    limparCarrinho(): void {
        this.itens = [];
    }

    calcularTotal(): number {
        return this.itens.reduce(
            (total, item) => total + item.preco * item.quantidade,
            0
        );
    }

    quantidadeItens(): number {
        return this.itens.reduce(
            (total, item) => total + item.quantidade,
            0
        );
    }
}