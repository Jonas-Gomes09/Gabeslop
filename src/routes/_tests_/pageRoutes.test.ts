import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../app";

describe("Testes das Page Routes", () => {

  it("deve acessar a página inicial", async () => {
    const resposta = await request(app)
      .get("/");

    expect(resposta.status).toBe(200);
  });

  it("deve acessar a página de login", async () => {
    const resposta = await request(app)
      .get("/login");

    expect([200, 302]).toContain(resposta.status);
  });

  it("deve acessar a página de registro", async () => {
    const resposta = await request(app)
      .get("/registro");

    expect([200, 302]).toContain(resposta.status);
  });

  it("deve acessar a página de rota inexistente", async () => {
    const resposta = await request(app)
      .get("/naoexiste");

    expect(resposta.status).toBe(200);
  });

  it("deve acessar a página forbidden", async () => {
    const resposta = await request(app)
      .get("/forbidden");

    expect(resposta.status).toBe(200);
  });
});