export class usuario {
    private _id: number;
    private _nome: string;
    private _email: string;
    private _senha: string;
    private _dataCriacao: string;
    private _totalCompras: number;
    private _foto: string | null

    constructor(id: number, nome: string, email: string, senha: string, dataCriacao: string, totalCompras: number, foto: string | null = null) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._dataCriacao = dataCriacao;
        this._totalCompras = totalCompras;
        this._foto = foto
    }

    get id(): number {return this._id}
    get nome(): string {return this._nome}
    get email(): string {return this.email}
    get senha(): string {return this._senha}
    get dataCriacao(): string {return this._dataCriacao}
    get totalCompras(): number {return this._totalCompras}
    get foto(): string | null {return this._foto}

    set nome(valor: string) {
        if (!valor) {throw new Error("Título obrigatório")};
        this.nome = valor.trim()
    }

    set dataCriacao(valor: string) {
        this.nome = valor
    }

    set totalCompras(valor: number) {
        this.totalCompras = valor
    }

    set foto(valor: string | null) {
        this.foto = valor
    }

    static validar(dados: {nome?: string, email?: string, senha?: string}) {
        const erros = []
        if (!dados.nome || dados.nome.trim() == "") {
            erros.push("Insira um nome de exibição")
        }
        if (!dados.email || !dados.email.includes("@")) {
            erros.push("E-mail obrigatório e deve ser escrito corretamente")
        }
        if (!dados.senha || dados.senha.length < 6) {
            erros.push("Senha obrigatória e deve conter no mínimo 6 caractéres")
        }
    }

    static fromJSON(json: any): usuario {
        return new usuario(json.id, json.nome, json.email, json.senha, json.dataCriacao, json.totalCompras, json.foto)
    }

    toJSON(): object {
        return {
            id: this._id,
            nome: this._nome,
            email: this._email,
            senha: this._senha,
            dataCriacao: this._dataCriacao,
            totalCompras: this._totalCompras,
            foto: this._foto
          };
    }
}