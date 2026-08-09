import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../app";

describe("Testando rotas", () => {
  it("deve acessar a página inicial", async () => {
    const resposta = await request(app).get("/");

    expect(resposta.status).toBe(200);
  });
});