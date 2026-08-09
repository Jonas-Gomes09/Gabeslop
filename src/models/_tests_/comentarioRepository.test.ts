import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { comentarioRepository } from "../comentarioRepository";
import { writeFile, unlink, mkdir } from "fs/promises";

const testFile = "data/comments-test.json";

describe("Testes do comentarioRepository", () => {

  beforeEach(async () => {
    await mkdir("data", { recursive: true });
    await writeFile(testFile, "[]");
  });

  afterEach(async () => {
    try {
      await unlink(testFile);
    } catch {
      // Arquivo já não existe
    }
  });

  it("deve criar um comentário", async () => {
    const repository = new comentarioRepository(testFile);

    const comentario = await repository.criar(
      "Meu jogo favorito",
      1,
      "Esse jogo é muito bom!"
    );

    expect(comentario).not.toBeNull();
    expect(comentario?.titulo).toBe("Meu jogo favorito");
    expect(comentario?.idUser).toBe(1);
    expect(comentario?.comentario).toBe("Esse jogo é muito bom!");
  });

  it("deve listar todos os comentários", async () => {
    const repository = new comentarioRepository(testFile);

    await repository.criar(
      "Comentário 1",
      1,
      "Primeiro comentário"
    );

    await repository.criar(
      "Comentário 2",
      2,
      "Segundo comentário"
    );

    const comentarios = await repository.listAll();

    expect(comentarios).toHaveLength(2);
    expect(comentarios[0].titulo).toBe("Comentário 1");
    expect(comentarios[1].titulo).toBe("Comentário 2");
  });

  it("deve remover um comentário", async () => {
    const repository = new comentarioRepository(testFile);

    const comentario = await repository.criar(
      "Comentário para remover",
      1,
      "Esse comentário será removido"
    );

    const resultado = await repository.removerComentario(
      comentario!.id,
      1
    );

    expect(resultado).toBe(true);

    const comentarios = await repository.listAll();

    expect(comentarios).toHaveLength(0);
  });

  it("não deve remover um comentário que não existe", async () => {
    const repository = new comentarioRepository(testFile);

    const resultado = await repository.removerComentario(999, 1);

    expect(resultado).toBe(false);
  });

  it("não deve remover comentário se o usuário não existir", async () => {
    const repository = new comentarioRepository(testFile);

    const comentario = await repository.criar(
      "Comentário",
      1,
      "Texto do comentário"
    );

    const resultado = await repository.removerComentario(
      comentario!.id,
      999
    );

    expect(resultado).toBe(false);
  });

  it("deve rejeitar comentário com dados inválidos", async () => {
    const repository = new comentarioRepository(testFile);

    await expect(
      repository.criar("", 1, "")
    ).rejects.toThrow();
  });

});