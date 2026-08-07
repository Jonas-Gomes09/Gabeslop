import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../app";

describe("Testes do carrinho", () => {

  it("deve adicionar um jogo ao carrinho", async () => {
    const resposta = await request(app)
      .post("/adicionar/123");

    expect(resposta.status).toBe(200);
    expect(resposta.body.sucesso).toBe(true);
    expect(resposta.body.game).toBe("123");
  });

  it("deve remover um jogo do carrinho", async () => {
    const resposta = await request(app)
      .delete("/remover/123");

    expect(resposta.status).toBe(200);
    expect(resposta.body.sucesso).toBe(true);
  });

  it("deve finalizar a compra", async () => {
    const resposta = await request(app)
      .post("/finalizar");

    expect(resposta.status).toBe(200);
    expect(resposta.body.sucesso).toBe(true);
    expect(resposta.body.mensagem).toBe("Compra finalizada.");
  });

});