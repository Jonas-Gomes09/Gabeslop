import "express-session";

declare module "express-session" {
  interface SessionData {
    usuario?: {
      id: number;
      nome: string;
      admin: boolean;
    };
  }
}