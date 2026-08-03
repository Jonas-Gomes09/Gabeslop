import { Game } from "../entities/produto"
import { readFile, writeFile, mkdir } from "fs/promises"
import { consoleContent } from "../types/serverConsole";

export class productRepository {
    private gamesFile: string;
    private directory: string;
    private saltRounds: number;

    constructor(gamesFile: string = "data/products.json", directory: string = "data", saltRounds = 10) {
        this.gamesFile = gamesFile
        this.directory = directory
        this.saltRounds = saltRounds
    }
    // Carregar produtos (SERVIDOR)
    private async loadProducts(): Promise<Game[]> {
        try {
            const content = await readFile(this.gamesFile, "utf-8");
            const parsedContent = JSON.parse(content)
            console.log("Produtos carregados")
            consoleContent.push("Produtos carregados")
            return parsedContent
            .filter((item: any) => item !== null && item !== undefined)
            .map((g: any) => new Game(g.id, g.titulo, g.vendas, g.estoque, g.disponivel, g.categoria, g.foto));
        } catch {
            console.error("produtoRepository loadGames() | Não há nenhum produto presente.")
            await this.saveProducts([]);
            return []
        }
    }

    // Salvar os produtos (SERVIDOR)
    private async saveProducts(products: Game[]): Promise<void> {
        try {
            await mkdir(this.directory, {recursive: true})
            const json = products.map(p=> p.toJSON());
            await writeFile(this.gamesFile, JSON.stringify(json, null, 2))
            console.log("Produtos salvos")
            consoleContent.push("Produtos salvos")
        } catch(e) {
            console.error("produtoRepository saveProducts:", e)
            consoleContent.push(`produtoRepository saveProducts:, ${e}`)
        }
    }

    // Adicionar produto (CRIAÇÃO VIA PAINEL DE ADMINISTRADOR)
    async criar(titulo: string, preco: number, vendas: number, estoque: number, categoria: string, foto: string | null = null): Promise<Game | null> {
        const erros = Game.validar({titulo, preco, categoria})

        if(erros.length > 0) throw new Error(erros.join(", "))
        
        const games = await this.loadProducts()

        // Verificação de existência do produto
        const produtoExiste = games.some(g => g.titulo.trim().toLowerCase() === titulo.trim().toLowerCase());
    if (produtoExiste) {
        return null;
    }
    
        const disponibilidade = estoque > 0

        const nextID = games.length + 1;

        const newUser = new Game(nextID, titulo, preco, vendas, estoque, disponibilidade, categoria, foto)
        games.push(newUser)
        await this.saveProducts(games)
        return newUser
    }

    // Remover produto (VIA PAINEL DE MODERADOR)
    async removerProduto(id: number): Promise<Boolean> {
        const products = await this.loadProducts()
        const productIndex = products.findIndex(p => p.id === id)
        if (productIndex === -1) {
            return false
        }

        products.splice(productIndex, 1)
        await this.saveProducts(products)
        return true
    }

    // Listar todos (PAINEL DE MODERADOR)
    async listAll(searchTerm?: string): Promise<Game[]> {
        let products = await this.loadProducts()
        if (searchTerm && searchTerm.trim()) {
            const lowercase = searchTerm.toLowerCase()
            products = products.filter(p => p.titulo.toLowerCase().includes(lowercase))
        }
        return products
    }

    // Procurar por ID (PAINEL DE MODERADOR / LOJA)
    async produtoInfo(id: number): Promise<Game | undefined> {
        const products = await this.loadProducts()
        const filter = products.find(p => p.id === id)
        
        if(!filter) {
            console.log(`produtoRepository produtoInfo(${id}) | Produto não encontrado`)
            consoleContent.push(`produtoRepository produtoInfo(${id}) | Produto não encontrado`)
            return undefined
        }

        return filter
    }

    // Compra de produto (CLIENTE, APÓS COMPRA)
    async compra(id: number): Promise<Game | null> {
        const products = await this.loadProducts()
        const filter = products.find(p => p.id === id)
        if (!filter) {
            return null
        }
        if (filter.estoque <= 0) {
            return null
        }
        filter.estoque -= 1
        filter.vendas += 1
        
        if (filter.estoque <= 0) {
            filter.disponivel = false
        }
        await this.saveProducts(products)
        return filter
    }


    // Atualizar estoque (PAINEL DE MODERADOR)
    async atualizarEstoque(id: number, estoque: number): Promise<Game["estoque"] | null> {
        const products = await this.loadProducts()
        const filter = products.find(p => p.id === id)
        
        if(!filter) {
            return null
        }

        filter.estoque = estoque
        await this.saveProducts(products)
        return filter.estoque
    }
}