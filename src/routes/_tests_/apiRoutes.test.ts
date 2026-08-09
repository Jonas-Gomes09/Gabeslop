import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../app";

describe("Testes das API Routes", () => {

  it("deve acessar a rota do carrinho", async () => {
    const resposta = await request(app).get("/cart");

    expect(resposta.status).toBe(200);
  });

  it("deve adicionar um jogo ao carrinho", async () => {
    const resposta = await request(app)
      .post("/cart")
      .send({
        id: 123
      });

    expect(resposta.status).toBe(200);
  });

it("deve atualizar a quantidade de um item", async () => {
  const resposta = await request(app)
    .put("/cart/123")
    .send({
      productId: 123,
      qtd: 2
    });

  expect(resposta.status).toBe(200);
});

  it("deve remover um jogo do carrinho", async () => {
    const resposta = await request(app)
      .delete("/cart/123");

    expect(resposta.status).toBe(200);
  });

  it("deve esvaziar o carrinho", async () => {
    const resposta = await request(app)
      .post("/cart/wipe");

    expect(resposta.status).toBe(200);
  });

  it("deve finalizar a compra", async () => {
    const resposta = await request(app).post("/finalizar");

    expect(resposta.status).toBe(200);
    expect(resposta.body.sucesso).toBe(true);
    expect(resposta.body.mensagem).toBe("Compra finalizada.");
  });

});