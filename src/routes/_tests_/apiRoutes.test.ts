import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";
import app from "../../app";


describe("Testes das API Routes", () => {

  let cookies: string[]

  beforeAll(async () => {
    const res = await request(app).post("/cart").send({id: 1, qtd: 1})
    cookies = res.get("Set-Cookie") || []
  })


  it("deve acessar a rota do carrinho", async () => {
    const resposta = await request(app).get("/cart");

    expect(resposta.status).toBe(200);
  });

  it("deve adicionar um jogo ao carrinho", async () => {
    const resposta = await request(app)
      .post("/cart")
      .set("Cookie", cookies)
      .send({
        id: 1,
        qtd: 1
      });

    expect(resposta.status).toBe(200);
  });

  it("deve remover um jogo do carrinho", async () => {
    const resposta = await request(app)
      .delete("/cart/1");

    expect(resposta.status).toBe(200);
  });

  it("deve esvaziar o carrinho", async () => {
    const resposta = await request(app)
      .post("/cart/wipe");

    expect(resposta.status).toBe(200);
  });

});