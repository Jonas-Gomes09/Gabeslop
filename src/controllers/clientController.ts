import { Request, Response } from "express"
import { userRepository } from "../models/userRepository"
import { productRepository } from "../models/produtoRepository"
import { comentarioRepository } from "../models/comentarioRepository"

const userRepo = new userRepository()
const productRepo = new productRepository()
const commentRepo = new comentarioRepository()

// -------------------------------------------------------------------------------- //
//                                ROTAS COMENTARIOS                                 //
// -------------------------------------------------------------------------------- //

export async function listComments(req: Request, res: Response) {
    try {
        const comments = await commentRepo.listAll()

        res.status(200).json({success: true, dados: comments, total: comments.length})
    } catch {
        res.status(500).json({success: false, message: "Não foi possível carregar os comentários"})
    }
}

export async function comentar(req: Request, res: Response) {
    const uId = Number(req.session.userId)
    const {titulo, comentario} = req.body
    try {
        const comments = await commentRepo.criar(titulo, uId, comentario)

        if (comments) {
            res.status(200).json({success: true, message: "Comentário criado com sucesso!"})
        } else {
            res.status(400).json({success: true, message: "Comentário inválido"})
        }
    } catch {
        res.status(500).json({success: false, message: "Não foi possível criar um comentário"})
    }
}

export async function excluirComentario(req: Request, res: Response) {
    const uId = Number(req.session.userId)
    const name = Number(req.session.userName)
    const id = Number(req.params.id)
    const {titulo, comentario} = req.body
    try {
        const comment = await commentRepo.removerComentario(id, uId)

        if (comment === true) {
            res.status(200).json({success: true, message: "Comentário criado com sucesso!"})
        } else {
            res.status(400).json({success: true, message: "Você não pode deletar esse comentário!"})
        }
    } catch {
        res.status(500).json({success: false, message: `Não foi possível excluir o comentário ${id} de ${name}`})
    }
}

// -------------------------------------------------------------------------------- //
//                                       GET                                        //
// -------------------------------------------------------------------------------- //

// GET /
export async function StartPage(req: Request, res: Response) {
    try {
        // Flash
        req.session.flash = undefined
        const flash = req.session.flash
        

        // Carregar
        return res.render("telainicial", {flash: flash})
    } catch {
        return res.status(500).json({success: false, message: "userController StartPage | Falha ao carregar o telainicial.ejs"})
    }
}


// GET /profile
export async function ProfilePage(req: Request, res: Response) {
    const id = Number(req.session.userId)

    try {
        const user = await userRepo.userInfo(id)

        // Flash
        req.session.flash = undefined
        const flash = req.session.flash

        // Carregar
        return res.render("profile", {session: req.session, userInfo: user})
    } catch {
        return res.status(500).json({success: false, message: "userController ProfilePage | Falha ao carregar o profile.ejs"})
    }
}


// GET /login
export async function LoginPage(req: Request, res: Response) {
    try {

        // Flash
        const flash = req.session.flash

        // Carregar
        return res.render("login", {flash: flash})
    } catch {
        return res.status(500).json({success: false, message: "GET userController LoginPage | Falha ao carregar o login.ejs"})
    }
}


// GET /registro
export async function RegisterPage(req: Request, res: Response) {
    try {

        // Flash
        req.session.flash = undefined
        const flash = req.session.flash

        // Carregar
        return res.render("registro", {flash: flash})
    } catch {
        return res.status(500).json({success: false, message: "GET userController RegisterPage | Falha ao carregar o registro.ejs"})
    }
}


// GET /store
export async function StorePage(req: Request, res: Response) {
    try {
        // Flash
        
        req.session.flash = undefined
        const q = typeof req.query.q === "string" ? req.query.q : "";
        const flash = req.session.flash
        
        return res.render("store", {flash: flash, nome: req.session.userName, foto: req.session.photo})
    } catch {
        return res.status(500).json({success: false, message: "GET userController StorePage | Falha ao carregar o loja.ejs"})
    }
}


// Página do 403
export async function ForbiddenPage(req: Request, res: Response) {
    try {
        req.session.flash = "Acesso proibido."
        const flash = req.session.flash

        return res.render("forbidden", {flash: flash})
    } catch {
        return res.status(500).json({success: false, message: "userController ForbiddenPage | Falha ao carregar o forbidden.ejs"})
    }
}


// Página de não existe
export async function naoExiste(req: Request, res: Response) {
    try {
        return res.render("naoExiste")
    } catch {
        return res.status(500).json({success: false, message: "userController naoExiste | Falha ao carregar o naoExiste.ejs"})
    }
}

// -------------------------------------------------------------------------------- //
//                                       POST                                       //
// -------------------------------------------------------------------------------- //

// POST /api/registro
export async function CreateUser(req: Request, res: Response) {
    try {
        req.session.flash = undefined
        const {nome, email, senha} = req.body

        // Verificação básica
        if (!nome || nome.trim() === "") {
            req.session.flash = "Insira um nome de usuário."
        }
        if (!email || !email.includes("@")) {
            req.session.flash = "Insira um e-mail válido."
        }
        if (!senha || senha.length < 6) {
            req.session.flash = "Senha deve conter ao menos 6 caracteres.";
        }

        // Imagem com multer
        const foto = req.file ? `/uploads/${req.file.filename}` : null;

        // Cadastro no banco de dados
        const user = userRepo.cadastro(nome, email, senha, foto)

        if (user === null) {
            req.session.flash = ("Já existe um usuário cadastrado com este e-mail!");
        }
        // Redirecionamento
        res.redirect("/login")
    } catch {
        return res.status(500).json({success: false, message: "POST userController CreateUser | Falha ao criar o usuário"})
    }
}


// POST /api/login
export async function LoginUser(req: Request, res: Response) {
    try {
        req.session.flash = undefined
        const {email, senha} = req.body
        const user = await userRepo.login(email, senha)
        if (!user || user === null) {
            req.session.flash = "Usuário ou senha incorretos"
            return res.redirect("/login")
        }

        if (user.perms === "client") {req.session.admin = false} else {req.session.admin = true}
        req.session.userId = user.id
        req.session.userName = user.nome
        req.session.email = user.email
        req.session.photo = user.foto

        if (req.session.admin === true) {
            res.redirect("/admin")
        } else {
            res.redirect("/store")
        }
        
    } catch {
        return res.status(500).json({success: false, message: "POST userController LoginUser | Falha ao criar o usuário"})
    }
}


// Logoff
export async function logoff(req: Request, res: Response) {
    try {
        req.session.admin = undefined
        req.session.email = undefined
        req.session.userId = undefined
        req.session.userName = undefined
        req.session.flash = undefined
        res.redirect("/")
    } catch {
        return res.status(500).json({success: false, message: "userController logoff | Falha ao sair do usuário"})
    }
}


// Deletar usuário
export async function deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id)
    try {

        await userRepo.removeUser(id)
        req.session.admin = undefined
        req.session.email = undefined
        req.session.userId = undefined
        req.session.userName = undefined
        req.session.flash = undefined
        res.status(200).redirect("/")
    } catch {
        return res.status(500).json({success: false, message: "userController deleteUser | Falha ao excluir usuário"})
    }
}

export async function productInfo(req: Request, res: Response) {
    const id = Number(req.params.id)
    try {
        const produto = await productRepo.produtoInfo(id)
        res.status(200).render("produto", {produto, nome: req.session.userName, foto: req.session.photo})
    } catch {
        return res.status(500).json({success: false, message: "userController productInfo | Falha ao carregar produtos"})
    }
}