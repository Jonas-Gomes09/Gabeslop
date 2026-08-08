import "express-session";

export interface ItemCarrinho {
  productId: number,
  qtd: number
}

declare module "express-session" {
  interface SessionData {
    userId: number;
    userName: string;
    admin: boolean;
    flash: string | undefined;
    email: string;
    carrinho: ItemCarrinho[];
    photo: string | null;
  }
}

