export class Game {
    _id: number;
    _titulo: string;
    _vendas: number;
    _estoque: number;
    _disponivel: boolean;
    _foto: string | null;

    constructor(
        id: number,
        titulo: string,
        vendas: number,
        estoque: number,
        disponivel: boolean,
        foto: string | null = null
    ) {
        this._id = id;
        this._titulo = titulo;
        this._vendas = vendas;
        this._estoque = estoque;
        this._disponivel = disponivel;
        this._foto = foto;
    }

    get id(): number {return this._id}
    get titulo(): string {return this._titulo}
    get vendas(): number {return this._vendas}
    get estoque(): number {return this._estoque}
    get disponivel(): boolean {return this._disponivel}
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

    static validar(dados: {
        titulo?: string;
        vendas?: number;
    }): string[] {

        const erros: string[] = [];

        if (!dados.titulo || dados.titulo.trim() === "") {
            erros.push("Título obrigatório.");
        }

        if (dados.vendas === undefined || dados.vendas < 0) {
            erros.push("Número de vendas inválido.");
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
            foto: this._foto
        };
    }
}