export class Game {
    id: number;
    titulo: string;
    vendas: number;
    avaliacao: number;
    estoque: number;
    disponivel: boolean;
    foto: string | null;

    constructor(
        id: number,
        titulo: string,
        vendas: number,
        avaliacao: number,
        estoque: number,
        disponivel: boolean,
        foto: string | null = null
    ) {
        this.id = id;
        this.titulo = titulo;
        this.vendas = vendas;
        this.avaliacao = avaliacao;
        this.estoque = estoque;
        this.disponivel = disponivel;
        this.foto = foto;
    }

    static validar(dados: {
        titulo?: string;
        vendas?: number;
        avaliacao?: number;
        estoque?: number;
    }): string[] {

        const erros: string[] = [];

        if (!dados.titulo || dados.titulo.trim() === "") {
            erros.push("Título obrigatório.");
        }

        if (dados.vendas === undefined || dados.vendas < 0) {
            erros.push("Número de vendas inválido.");
        }

        if (
            dados.avaliacao === undefined ||
            dados.avaliacao < 0 ||
            dados.avaliacao > 10
        ) {
            erros.push("A avaliação deve estar entre 0 e 10.");
        }

        if (dados.estoque === undefined || dados.estoque < 0) {
            erros.push("Estoque inválido.");
        }

        return erros;
    }

    static fromJSON(json: any): Game {
        return new Game(
            json.id,
            json.titulo,
            json.vendas,
            json.avaliacao,
            json.estoque,
            json.disponivel,
            json.foto
        );
    }

    toJSON(): object {
        return {
            id: this.id,
            titulo: this.titulo,
            vendas: this.vendas,
            avaliacao: this.avaliacao,
            estoque: this.estoque,
            disponivel: this.disponivel,
            foto: this.foto
        };
    }
}