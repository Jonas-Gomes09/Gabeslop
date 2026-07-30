export class Game {
    _id: number;
    _titulo: string;
    _vendas: number;
    _estoque: number;
    _disponivel: boolean;
    _categoria: string;
    _foto: string | null;

    constructor(
        id: number,
        titulo: string,
        vendas: number,
        estoque: number,
        disponivel: boolean,
        categoria: string,
        foto: string | null = null
    ) {
        this._id = id;
        this._titulo = titulo;
        this._vendas = vendas;
        this._estoque = estoque;
        this._disponivel = disponivel;
        this._categoria = categoria;
        this._foto = foto;
    }

    get id(): number {return this._id}
    get titulo(): string {return this._titulo}
    get vendas(): number {return this._vendas}
    get estoque(): number {return this._estoque}
    get disponivel(): boolean {return this._disponivel}
    get categoria(): string {return this._categoria}
    get foto(): string | null {return this._foto}

    set titulo(valor: string) {
        if (!valor) {throw new Error("Título obrigatório")};
        this._titulo = valor.trim()
    }

    set vendas(valor: number) {
        this._vendas = valor
    }

    set estoque(valor: number) {
        this._estoque = valor
    }

    set disponivel(valor: boolean) {
        this._disponivel = valor
    }

    set categoria(valor: string) {
        this._categoria = valor
    }

    static validar(dados: {
        titulo?: string;
        vendas?: number;
        categoria?: string;
    }): string[] {

        const erros: string[] = [];

        if (!dados.titulo || dados.titulo.trim() === "") {
            erros.push("Título obrigatório");
        }

        if (dados.vendas === undefined || dados.vendas < 0) {
            erros.push("Número de vendas inválido");
        }

        if (!dados.categoria || dados.categoria.trim() === "") {
            erros.push("O produto deve estar em uma categoria");
        }

        return erros;
    }

    static fromJSON(json: any): Game {
        return new Game(
            json.id,
            json.titulo,
            json.vendas,
            json.estoque,
            json.disponivel,
            json.categoria,
            json.foto
        );
    }

    toJSON(): object {
        return {
            id: this._id,
            titulo: this._titulo,
            vendas: this._vendas,
            estoque: this._estoque,
            disponivel: this._disponivel,
            categoria: this._categoria,
            foto: this._foto
        };
    }
}