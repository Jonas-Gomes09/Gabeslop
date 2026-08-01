import { Request, Response, NextFunction } from "express";

export async function clientAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.session.userName) {
        return res.status(401).send("Faça login.");
    }

    next();
}

export async function adminAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.session.admin) {
        return res.status(403).send("Acesso proibido");
    }

    next();
}