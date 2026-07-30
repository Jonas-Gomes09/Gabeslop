import { Carrinho } from "./carrinho";

export class user {
    private _id: number;
    private _nome: string;
    private _email: string;
    private _senha: string;
    private _dataCriacao: string;
    private _totalCompras: number;
    private _foto: string | null;
    private _perms: string; // permissões
    private _carrinho: Carrinho[];

    constructor(id: number, nome: string, email: string, senha: string, dataCriacao: string, totalCompras: number, foto: string | null = null, perms: string, carrinho: Carrinho[]) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._dataCriacao = dataCriacao;
        this._totalCompras = totalCompras;
        this._foto = foto
        this._perms = perms
        this._carrinho = carrinho
    }

    get id(): number {return this._id}
    get nome(): string {return this._nome}
    get email(): string {return this._email}
    get senha(): string {return this._senha}
    get dataCriacao(): string {return this._dataCriacao}
    get totalCompras(): number {return this._totalCompras}
    get foto(): string | null {return this._foto}
    get perms(): string | null {return this._perms}
    get carrinho(): Carrinho[] {return this._carrinho}

    set nome(valor: string) {
        if (!valor) {throw new Error("Título obrigatório")};
        this._nome = valor.trim()
    }

    set dataCriacao(valor: string) {
        this._nome = valor
    }

    set totalCompras(valor: number) {
        this._totalCompras = valor
    }

    set foto(valor: string | null) {
        this._foto = valor
    }
    set perms(valor: string) {
        this._perms = valor
    }
    set carrinho(valor: Carrinho[]) {
        this._carrinho = valor
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

        return erros
    }

    static fromJSON(json: any): user {
        return new user(json.id, json.nome, json.email, json.senha, json.dataCriacao, json.totalCompras, json.foto, json.perms, json.carrinho)
    }

    toJSON(): object {
        return {
            id: this._id,
            nome: this._nome,
            email: this._email,
            senha: this._senha,
            dataCriacao: this._dataCriacao,
            totalCompras: this._totalCompras,
            foto: this._foto,
            perms: this._perms,
            carrinho: this._carrinho
          };
    }
}