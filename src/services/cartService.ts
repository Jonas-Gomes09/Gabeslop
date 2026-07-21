// src/services/cartService.ts

interface CartItem {
    idGame: number;
    nome: string;
    preco: number;
    quantidade: number;
  }
  
  // Carrinho em memória (para fins pedagógicos)
  let carrinho: CartItem[] = [];
  
  /**
   * Retorna todos os itens do carrinho.
   */
  export function listarCarrinho(): CartItem[] {
    return carrinho;
  }
  
  /**
   * Adiciona um item ao carrinho.
   * Se o item já existir, incrementa sua quantidade.
   */
  export function adicionarAoCarrinho(item: CartItem): CartItem[] {
    const itemExistente = carrinho.find(
      (produto) => produto.idGame === item.idGame
    );
  
    if (itemExistente) {
      itemExistente.quantidade += item.quantidade;
    } else {
      carrinho.push(item);
    }
  
    return carrinho;
  }
  
  /**
   * Remove um item do carrinho.
   */
  export function removerDoCarrinho(idGame: number): CartItem[] {
    carrinho = carrinho.filter((item) => item.idGame !== idGame);
    return carrinho;
  }
  
  /**
   * Atualiza a quantidade de um item.
   */
  export function atualizarQuantidade(
    idGame: number,
    quantidade: number
  ): CartItem[] {
    const item = carrinho.find((produto) => produto.idGame === idGame);
  
    if (item) {
      item.quantidade = quantidade;
    }
  
    return carrinho;
  }
  
  /**
   * Remove todos os itens do carrinho.
   */
  export function limparCarrinho(): void {
    carrinho = [];
  }
  
  /**
   * Calcula o valor total do carrinho.
   */
  export function calcularTotal(): number {
    return carrinho.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  }