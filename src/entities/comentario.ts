export class Usuario {
    id: number;
    titulo: string;
    usuario: string;
    dataCriacao: string;
    nota: number;
    foto: string | null;

    constructor(
        id: number,
        titulo: string,
        usuario: string,
        dataCriacao: string,
        nota: number,
        foto: string | null = null
    ) {
        this.id = id;
        this.titulo = titulo;
        this.usuario = usuario;
        this.dataCriacao = dataCriacao;
        this.nota = nota;
        this.foto = foto;
    }

    static validar(dados: {
        titulo?: string;
        usuario?: string;
        dataCriacao?: string;
        nota?: number;
    }): string[] {

        const erros: string[] = [];

        if (!dados.titulo || dados.titulo.trim() === "") {
            erros.push("Título obrigatório.");
        }

        if (!dados.usuario || dados.usuario.trim() === "") {
            erros.push("Nome do usuário obrigatório.");
        }

        if (!dados.dataCriacao || dados.dataCriacao.trim() === "") {
            erros.push("Data de criação obrigatória.");
        }

        if (
            dados.nota === undefined ||
            dados.nota < 0 ||
            dados.nota > 10
        ) {
            erros.push("A nota deve estar entre 0 e 10.");
        }

        return erros;
    }

    static fromJSON(json: any): Usuario {
        return new Usuario(
            json.id,
            json.titulo,
            json.usuario,
            json.dataCriacao,
            json.nota,
            json.foto
        );
    }

    toJSON(): object {
        return {
            id: this.id,
            titulo: this.titulo,
            usuario: this.usuario,
            dataCriacao: this.dataCriacao,
            nota: this.nota,
            foto: this.foto
        };
    }
}