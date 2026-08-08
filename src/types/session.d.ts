import "express-session";

declare module "express-session" {
  interface SessionData {
    userId: number;
    userName: string;
    admin: boolean;
    flash: string | undefined;
    email: string;
    carrinho: [{productId: number, qtd: number}] | [];
    photo: string | null;
  }
}

