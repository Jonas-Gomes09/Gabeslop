import { Request, Response, NextFunction } from "express";

export async function clientAuth(req: Request, res: Response, next: NextFunction) {
    const flash = req.session.flash
    req.session.flash = "Você deve fazer login primeiro."
    if (!req.session.userName) {
        return res.render("login", {flash: flash});
    }

    next();
}

export async function adminAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.session.admin) {
    const flash = req.session.flash
    req.session.flash = "Acesso proibido."
        return res.render("forbidden", {flash: flash});
    }

    next();
}