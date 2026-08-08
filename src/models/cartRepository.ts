import { Carrinho } from "../entities/carrinho";
import { readFile, writeFile, mkdir } from "fs/promises"

export class cartRepository {
    private usersFile: string;

    constructor(usersFile: string = "data/users.json") {
        this.usersFile = usersFile
    }

    async saveCart(userId: number, carrinho: Carrinho): Promise<void> {

        const content = await readFile(this.usersFile, "utf-8");
        const users = JSON.parse(content)

        const user = users.findIndex((c: any) => c.id === userId)

        if (user < 0) {
            throw new Error("Falha ao procurar usuário")
        }

        users[user].cart = carrinho.toJSON()
        await writeFile(this.usersFile, JSON.stringify(users, null, 2))
    }

    private async readUsers(): Promise<any[]> {
    try {
      const content = await readFile(this.usersFile, "utf-8");
      return JSON.parse(content || "[]");
    } catch {
      return [];
    }
  }

    async getCartByUId(userId: number): Promise<Carrinho> {
        const users = await this.readUsers();
        const user = users.find((u: any) => u.id === userId);

        if (!user || !user.cart) {
        return new Carrinho([]);
        }

        return Carrinho.fromJSON(user.cart);
  }
}