export interface ItemCarrinho {
    produtoId: number;
    quantidade: number;
}

export class Carrinho {
    private _itens: ItemCarrinho[];

    constructor(itens: ItemCarrinho[]) {this._itens = itens}

    get itens(): ItemCarrinho[] {return [...this._itens];}
    set itens(valor: ItemCarrinho[]) {this._itens = valor}



    // ADICIONAR ITEM (ou se já tiver aumentar sua qtd)
    pushItem(produtoId: number, quantidade: number = 1): void {
        if (quantidade <= 0) return;
        const existe = this._itens.find(i => i.produtoId === produtoId)

        if (existe) {
            existe.quantidade += 1
            return
        }

        this._itens.push({produtoId, quantidade})
    }

    // REMOVER ITEM
    spliceItem(produtoId: number): void {
        const busca = this._itens.findIndex(i => i.produtoId === produtoId)

        if (!busca) {
            return
        }

        this._itens.splice(busca, 1)
    }

    // ATUALIZAR QTD DO ITEM
    updateQtd(produtoId: number, quantidade: number): void {
        const busca = this._itens.findIndex(i => i.produtoId === produtoId)

        this._itens[busca].quantidade = quantidade
    }

    // OQ SOBRA PRO BETA
    limparTudo(): void {
        this._itens = []
    }

    filter(term: string): ItemCarrinho[] {
    if (!term) return this.itens;
    
    
    return this._itens.filter(item => 
      item.produtoId.toString().includes(term.toLowerCase())
    );
  }

    static fromJSON(json: any): Carrinho { return new Carrinho(json.itens)}

    toJSON(): object {
        return {
            itens: this._itens || []
        }
    }
}