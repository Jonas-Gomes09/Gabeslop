import {user} from "../entities/user"
import { readFile, writeFile, mkdir } from "fs/promises"

export class userRepository {
    private usersFile: string;
    private directory: string

    constructor(usersFile: string = "data/users.json", directory: string = "data") {
        this.usersFile = usersFile
        this.directory = directory
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

    // Adicionar usuário (LOGIN DO CLIENTE)
    async addUser(nome: string, email: string, senha: string, dataCriacao: string, totalCompras: number, foto: string | null = null): Promise<user> {
        const erros = user.validar({nome, email, senha})

        if(erros.length > 0) throw new Error(erros.join(", "))
        
        const users = await this.loadUsers()
        const nextID = (users.length > 0 ? users[users.length - 1].id : 0) + 1;
        const newUser = new user(nextID, nome, email, senha, dataCriacao, totalCompras = 0, foto)
        users.push(newUser)
        await this.saveUsers(users)
        return newUser
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
}