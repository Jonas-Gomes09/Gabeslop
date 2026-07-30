import {user} from "../entities/user"
import { readFile, writeFile, mkdir } from "fs/promises"
import bcrypt from "bcrypt"
import { Carrinho } from "../entities/carrinho";

export class userRepository {
    private usersFile: string;
    private directory: string;
    private saltRounds: number;

    constructor(usersFile: string = "data/users.json", directory: string = "data", saltRounds = 10) {
        this.usersFile = usersFile
        this.directory = directory
        this.saltRounds = saltRounds
    }
    // Carregar usuários (SERVIDOR)
    private async loadUsers(): Promise<user[]> {
        try {
            const content = await readFile(this.usersFile, "utf-8");
            const parsedContent = JSON.parse(content)
            console.log("Usuários carregados")
            return parsedContent
            .filter((item: any) => item !== null && item !== undefined)
            .map((u: any) => new user(u.id, u.nome, u.email, u.senha, u.dataCriacao, u.totalCompras, u.foto, u.perms, u.carrinho));
        } catch {
            console.error("userRepository loadFiles() | Não há nenhum usuário cadastrado no banco de dados.")
            await this.saveUsers([]);
            return []
        }
    }

    // Salvar os usuários (SERVIDOR)
    private async saveUsers(users: user[]): Promise<void> {
        try {
            await mkdir(this.directory, {recursive: true})
            const json = users.map(u=> u.toJSON());
            await writeFile(this.usersFile, JSON.stringify(json, null, 2))
            console.log("Usuários salvos")
        } catch(e) {
            console.error("userRepository saveUsers:", e)
        }
    }

    // Adicionar usuário (CADASTRO DO CLIENTE)
    async cadastro(nome: string, email: string, senha: string, foto: string | null = null): Promise<user> {
        const erros = user.validar({nome, email, senha})

        if(erros.length > 0) throw new Error(erros.join(", "))
        const dataCriacao = `${new Date().toLocaleTimeString()} | ${new Date().toLocaleDateString()}`
        
        const users = await this.loadUsers()

        const emailExiste = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExiste) {
        throw new Error("Email já está cadastrado.");
    }

        const nextID = users.length + 1;
        const senhaEncriptada = await bcrypt.hash(senha, this.saltRounds)
        const permission = "client"
        const carrinho: Carrinho[] = []
        

        const newUser = new user(nextID, nome, email, senhaEncriptada, dataCriacao, 0, foto, permission, carrinho)
        users.push(newUser)
        await this.saveUsers(users)
        return newUser
    }

    // Logar no usuário (CADASTRO DO CLIENTE)
    async login(email: string, senha: string): Promise<user | null> {
        const users = await this.loadUsers()
        const foundUser = await users.find(u => u.email === email.trim())

        if (!foundUser) {
            return null
        }

        const senhaDecriptada = await bcrypt.compare(senha, foundUser?.senha)

        if (!senhaDecriptada) {
            return null
        }
        return foundUser
    }

    // Remover usuário (NAS INFORMAÇÕES DA CONTA DO CLIENTE)
    async removeUser(id: number): Promise<Boolean> {
        const users = await this.loadUsers()
        const userIndex = users.findIndex(i => i.id === id)
        if (userIndex === -1) {
            return false
        }

        users.splice(id, 1)
        return true
    }

    // Listar todos (PAINEL DE MODERADOR)
    async listAll(searchTerm?: string): Promise<user[]> {
        let users = await this.loadUsers()
        if (searchTerm && searchTerm.trim()) {
            const lowercase = searchTerm.toLowerCase()
            users = users.filter(u => u.nome.toLowerCase().includes(lowercase))
        }
        return users
    }

    // Procurar por ID (PAINEL DE MODERADOR / INFORMAÇÕES DA CONTA DO CLIENTE)
    async userInfo(id: number): Promise<user | undefined> {
        const users = await this.loadUsers()
        const filter = users.find(u => u.id === id)
        
        if(!filter) {
            console.log(`userRepository userInfo(${id}) | Usuário não encontrado`)
            return undefined
        }

        return filter
    }

    // Atualizar nome de usuário (INFORMAÇÕES DA CONTA DO CLIENTE)
    async updateUserName(id: number, nome: string): Promise<user["nome"]> {
        const users = await this.loadUsers()
        const filter = users.find(u => u.id === id)
        
        if(!filter) {
            throw new Error(`userRepository updateUserName(${id}) | Usuário não encontrado`)
        }

        const erros = await user.validar({nome: nome})

        if (erros.length > 0) {
            throw new Error(erros.join(", "))
        }

        filter.nome = nome.trim()
        await this.saveUsers(users)
        return filter.nome
    }

    // Atualizar o total de compras após uma compra (SERVIDOR)
    async updateUserTotalCompras(id: number): Promise<user["totalCompras"]> {
        const users = await this.loadUsers()
        const filter = users.find(u => u.id === id)
        
        if(!filter) {
            throw new Error(`userRepository updateUserTotalCompras(${id}) | Usuário não encontrado`)
        }

        filter.totalCompras += 1
        await this.saveUsers(users)
        return filter.totalCompras
    }
}