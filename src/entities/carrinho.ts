export interface ItemCarrinho {
    produtoId: number;
    preco: number;
    quantidade: number;
}

export class Carrinho {
    private _itens: ItemCarrinho[];

    constructor() {
        this._itens = [];
    }
get itens(): ItemCarrinho[] {
        return [...this._itens];
    }

    adicionarItem(item: ItemCarrinho): void {
        const existe = this._itens.find(
            p => p.produtoId === item.produtoId
        );

        if (existe) {
            existe.quantidade += item.quantidade;
        } else {
            this.itens.push(item);
        }
    }

    removerItem(produtoId: number): void {
        this._itens = this._itens.filter(
            item => item.produtoId !== produtoId
        );
    }

    atualizarQuantidade(produtoId: number, quantidade: number): void {
        const item = this._itens.find(
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
        this._itens = [];
    }

    calcularTotal(): number {
        return this._itens.reduce(
            (total, item) => total + item.preco * item.quantidade,
            0
        );
    }

    quantidadeItens(): number {
        return this._itens.reduce(
            (total, item) => total + item.quantidade,
            0
        );
    }
}