import "express-session";

declare module "express-session" {
  interface SessionData {
    userId: number;
    userName: string;
    admin: boolean;
    flash: string | null;
  }
}