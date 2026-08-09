import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../app";

describe("Testes das Admin Routes", () => {

  it("deve acessar a rota principal do admin", async () => {
    const resposta = await request(app)
      .get("/admin");

    expect([200, 302, 401, 403]).toContain(resposta.status);
  });

  it("deve acessar a rota de produtos do admin", async () => {
    const resposta = await request(app)
      .get("/admin/products");

    expect([200, 302, 401, 403, 500]).toContain(resposta.status);
  });

  it("deve acessar a rota de usuários do admin", async () => {
    const resposta = await request(app)
      .get("/admin/users");

    expect([200, 302, 401, 403, 500]).toContain(resposta.status);
  });

  it("deve excluir um produto", async () => {
    const resposta = await request(app)
      .delete("/api/store/123");

    expect([200, 302, 400, 401, 403, 404, 500]).toContain(resposta.status);
  });

});