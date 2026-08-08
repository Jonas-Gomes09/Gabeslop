import "express-session";
import { ItemCarrinho } from "../entities/carrinho";

declare module "express-session" {
  interface SessionData {
    userId: number;
    userName: string;
    admin: boolean;
    flash: string | undefined;
    email: string;
    carrinho: { itens: ItemCarrinho[] };
    photo: string | null;
  }
}

