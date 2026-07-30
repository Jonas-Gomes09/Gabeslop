import { Game } from "../entities/produto"
import { readFile, writeFile, mkdir } from "fs/promises"

export class gameRepository {
    private gamesFile: string;
    private directory: string;
    private saltRounds: number;

    constructor(gamesFile: string = "data/products.json", directory: string = "data", saltRounds = 10) {
        this.gamesFile = gamesFile
        this.directory = directory
        this.saltRounds = saltRounds
    }
    // Carregar usuários (SERVIDOR)
    private async loadGames(): Promise<Game[]> {
        try {
            const content = await readFile(this.gamesFile, "utf-8");
            const parsedContent = JSON.parse(content)
            console.log("Usuários carregados")
            return parsedContent
            .filter((item: any) => item !== null && item !== undefined)
            .map((g: any) => new Game(g.id, g.titulo, g.vendas, g.estoque, g.disponivel, g.foto));
        } catch {
            console.error("produtoRepository loadGames() | Não há nenhum produto presente.")
            await this.saveGames([]);
            return []
        }
    }

    // Salvar os usuários (SERVIDOR)
    private async saveGames(users: Game[]): Promise<void> {
        try {
            await mkdir(this.directory, {recursive: true})
            const json = users.map(u=> u.toJSON());
            await writeFile(this.gamesFile, JSON.stringify(json, null, 2))
            console.log("Usuários salvos")
        } catch(e) {
            console.error("produtoRepository saveGames:", e)
        }
    }

    // Adicionar usuário (CADASTRO DO CLIENTE)
    async cadastro(titulo: string, vendas: number, foto: string | null = null): Promise<Game> {
        const erros = Game.validar({titulo, vendas})

        if(erros.length > 0) throw new Error(erros.join(", "))
        const dataCriacao = `${new Date().toLocaleTimeString()} | ${new Date().toLocaleDateString()}`
        
        const games = await this.loadGames()

        const produtoExiste = games.some(g => g.titulo.toLowerCase() === titulo.toLowerCase());
    if (produtoExiste) {
        throw new Error("Email já está cadastrado.");
    }

        const nextID = games.length + 1;

        const newUser = new Game(nextID, titulo, vendas, estoque, foto)
        games.push(newUser)
        await this.saveGames(games)
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