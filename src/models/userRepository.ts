import {user} from "../entities/user"
import { readFile, writeFile, mkdir } from "fs/promises"
import bcrypt from "bcrypt"

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
            return parsedContent.map((d: any) => {user.fromJSON(d)})
        } catch {
            console.log("userRepository loadFiles() | Não há nenhum usuário cadastrado no banco de dados.")
            await this.saveUsers([]);
            return []
        }
    }

    // Salvar os usuários (SERVIDOR)
    private async saveUsers(users: user[]): Promise<void> {
        try {
            const json = users.map(u=> u.toJSON());
            await writeFile(this.usersFile, JSON.stringify(json, null, 2))
        } catch {
            mkdir(this.directory, {recursive: true})
        }
    }

    // Adicionar usuário (CADASTRO DO CLIENTE)
    async cadastro(nome: string, email: string, senha: string, foto: string | null = null): Promise<user> {
        const erros = user.validar({nome, email, senha})

        if(erros.length > 0) throw new Error(erros.join(", "))
        const dataCriacao = `${new Date().toLocaleTimeString()} | ${new Date().toLocaleDateString()}`

        const users = await this.loadUsers()
        const nextID = (users.length > 0 ? users[users.length - 1].id : 0) + 1;
        const senhaEncriptada = await bcrypt.hash(senha, this.saltRounds)


        const newUser = new user(nextID, nome, email, senhaEncriptada, dataCriacao, 0, foto)
        users.push(newUser)
        await this.saveUsers(users)
        return newUser
    }

    // Logar no usuário (CADASTRO DO CLIENTE)
    async login(email: string, senha: string): Promise<user | null> {
        const users = await this.loadUsers()
        const foundUser = await users.find(u => u.email === email.trim())

        if (!foundUser) {
            throw new Error(`userRepository login(email, senha) | Usuário com email ${email.trim()} não encontrado`)
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
        return filter.totalCompras
    }
}