import { Request, Response, NextFunction } from "express";

export async function auth(req: Request, res: Response, next: NextFunction) {
    if (!req.session.userName) {
        return res.status(401).send("Faça login.");
    }

    next();
}

export async function admin(req: Request, res: Response, next: NextFunction) {
    if (req.session.admin = false) {
        res.status(403).json({message: "Acesso proibido"});
        return res.redirect("/")
    }
    next();
}