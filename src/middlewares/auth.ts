import { Request, Response, NextFunction } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
    if (!req.session.userId) {
        return res.status(401).send("Faça login.");
    }

    next();
}

export function admin(req: Request, res: Response, next: NextFunction) {
    if (req.session.admin = false) {
        res.status(403).json({message: "Acesso proibido"});
        return res.redirect("/")
    }
    next();
}