import { Comment } from "../entities/comentario";
import { readFile, writeFile, mkdir } from "fs/promises"
import { consoleContent } from "../types/serverConsole";

export class comentarioRepository {
    private commentsFile: string

    constructor(commentsFile: string = "data/comments.json") {
        this.commentsFile = commentsFile
    }

    private async loadComments(): Promise<Comment[]> {
        try {
            const content = await readFile(this.commentsFile, "utf-8");
            const parsedContent = JSON.parse(content)
            console.log("Comentários carregados")
            consoleContent.push("Comentários carregados")
            return parsedContent
            .filter((item: any) => item !== null && item !== undefined)
            .map((g: any) => new Comment(g.id, g.idUser, g.titulo, g.comentario));
        } catch {
            console.error("produtoRepository loadComments() | Não há nenhum produto presente.")
            await this.saveComments([]);
            return []
        }
    }

    // Salvar os produtos (SERVIDOR)
    private async saveComments(comments: Comment[]): Promise<void> {
        try {
            const json = comments.map(p=> p.toJSON());
            await writeFile(this.commentsFile, JSON.stringify(json, null, 2))
            console.log("Comentários salvos")
            consoleContent.push("Comentários salvos")
        } catch(e) {
            console.error("produtoRepository saveComments:", e)
            consoleContent.push(`produtoRepository saveComments:, ${e}`)
        }
    }

    async criar(titulo: string, userId: number, comentario: string): Promise<Comment | null> {
        const erros = Comment.validar({titulo, comentario})

        if(erros.length > 0) throw new Error(erros.join(", "))
        
        const comments = await this.loadComments()

        const nextID = comments.length + 1;

        const newComment = new Comment(nextID, userId, titulo, comentario)
        comments.push(newComment)
        await this.saveComments(comments)
        return newComment
    }

    async removerComentario(id: number, uId: number): Promise<Boolean> {
        const comments = await this.loadComments()
        const commentIndex = comments.findIndex(p => p.id === id)
        if (commentIndex === -1) {
            return false
        }

        if (comments[commentIndex].idUser !== uId) {
            return false
        }

        comments.splice(commentIndex, 1)
        await this.saveComments(comments)
        return true
    }

    // Listar todos (SERVIDOR)
    async listAll(): Promise<Comment[]> {
        let products = await this.loadComments()
        return products
    }
}