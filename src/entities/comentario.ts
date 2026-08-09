export class Comment {
    _id: number;
    _idUser: number;
    _titulo: string;
    _comentario: string;

    constructor(
        id: number,
        idUser: number,
        titulo: string,
        comentario: string
    ) {
        this._id = id;
        this._idUser = idUser;
        this._titulo = titulo;
        this._comentario = comentario;
    }

    get id(): number {return this._id}
    get idUser(): number {return this._idUser}
    get titulo(): string {return this._titulo}
    get comentario(): string {return this._comentario}

    set titulo(valor: string) {
        if (!valor) {throw new Error("Título obrigatório")};
        this._titulo = valor.trim()
    }

    set comentario(valor: string) {
        this._comentario = valor
    }

    static validar(dados: {
        titulo?: string;
        comentario?: string;
    }): string[] {

        const erros: string[] = [];

        if (!dados.titulo || dados.titulo.trim() === "") {
            erros.push("Título obrigatório");
        }

        if (!dados.comentario || dados.comentario.trim() === "") {
            erros.push("Comentário obrigatório");
        }

        return erros;
    }

    static fromJSON(json: any): Comment {
        return new Comment(
            json.id,
            json.idUser,
            json.titulo,
            json.comentario,
        );
    }

    toJSON(): object {
        return {
            id: this._id,
            idUser: this._idUser,
            titulo: this._titulo,
            comentario: this._comentario,
        };
    }
}