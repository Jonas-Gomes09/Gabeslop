import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { unlink, writeFile, mkdir } from "fs/promises";
import { productRepository } from "../produtoRepository";

const testFile = "data/products-test.json";

describe("Testes do produtoRepository", () => {

  beforeEach(async () => {
    await mkdir("data", { recursive: true });
    await writeFile(testFile, "[]");
  });

  afterEach(async () => {
    try {
      await unlink(testFile);
    } catch {
      // Arquivo já foi removido ou não existe
    }
  });

  it("deve criar um produto", async () => {
    const repository = new productRepository(testFile);

    const produto = await repository.criar(
      "Super Mario Bros",
      299.90,
      10,
      "Nintendo",
      "mario.jpg"
    );

    expect(produto).not.toBeNull();
    expect(produto?.id).toBe(1);
    expect(produto?.titulo).toBe("Super Mario Bros");
    expect(produto?.preco).toBe(299.90);
    expect(produto?.estoque).toBe(10);
    expect(produto?.categoria).toBe("Nintendo");
    expect(produto?.disponivel).toBe(true);
  });

  it("não deve criar dois produtos com o mesmo nome", async () => {
    const repository = new productRepository(testFile);

    await repository.criar(
      "Super Mario Bros",
      299.90,
      10,
      "Nintendo"
    );

    const segundoProduto = await repository.criar(
      "super mario bros",
      399.90,
      5,
      "Nintendo"
    );

    expect(segundoProduto).toBeNull();

    const produtos = await repository.listAll();

    expect(produtos).toHaveLength(1);
  });

  it("deve listar todos os produtos", async () => {
    const repository = new productRepository(testFile);

    await repository.criar(
      "Super Mario Bros",
      299.90,
      10,
      "Nintendo"
    );

    await repository.criar(
      "Minecraft",
      199.90,
      5,
      "Microsoft"
    );

    const produtos = await repository.listAll();

    expect(produtos).toHaveLength(2);
    expect(produtos[0].titulo).toBe("Super Mario Bros");
    expect(produtos[1].titulo).toBe("Minecraft");
  });

  it("deve buscar produtos pelo título", async () => {
    const repository = new productRepository(testFile);

    await repository.criar(
      "Super Mario Bros",
      299.90,
      10,
      "Nintendo"
    );

    await repository.criar(
      "Minecraft",
      199.90,
      5,
      "Microsoft"
    );

    const produtos = await repository.listAll("mario");

    expect(produtos).toHaveLength(1);
    expect(produtos[0].titulo).toBe("Super Mario Bros");
  });

  it("deve buscar produtos pela categoria", async () => {
    const repository = new productRepository(testFile);

    await repository.criar(
      "Super Mario Bros",
      299.90,
      10,
      "Nintendo"
    );

    await repository.criar(
      "Minecraft",
      199.90,
      5,
      "Microsoft"
    );

    const produtos = await repository.listAll("nintendo");

    expect(produtos).toHaveLength(1);
    expect(produtos[0].categoria).toBe("Nintendo");
  });

  it("deve buscar um produto pelo ID", async () => {
    const repository = new productRepository(testFile);

    await repository.criar(
      "Super Mario Bros",
      299.90,
      10,
      "Nintendo"
    );

    const produto = await repository.produtoInfo(1);

    expect(produto).toBeDefined();
    expect(produto?.id).toBe(1);
    expect(produto?.titulo).toBe("Super Mario Bros");
  });

  it("deve retornar undefined quando o produto não existe", async () => {
    const repository = new productRepository(testFile);

    const produto = await repository.produtoInfo(999);

    expect(produto).toBeUndefined();
  });

  it("deve atualizar o estoque de um produto", async () => {
    const repository = new productRepository(testFile);

    await repository.criar(
      "Super Mario Bros",
      299.90,
      10,
      "Nintendo"
    );

    const produto = await repository.atualizarEstoque(1, 20);

    expect(produto).not.toBeNull();
    expect(produto?.estoque).toBe(20);
    expect(produto?.disponivel).toBe(true);
  });

  it("deve marcar o produto como indisponível quando o estoque for zero", async () => {
    const repository = new productRepository(testFile);

    await repository.criar(
      "Super Mario Bros",
      299.90,
      10,
      "Nintendo"
    );

    const produto = await repository.atualizarEstoque(1, 0);

    expect(produto).not.toBeNull();
    expect(produto?.estoque).toBe(0);
    expect(produto?.disponivel).toBe(false);
  });

  it("deve realizar uma compra", async () => {
    const repository = new productRepository(testFile);

    await repository.criar(
      "Super Mario Bros",
      299.90,
      10,
      "Nintendo"
    );

    const produto = await repository.compra(1, 2);

    expect(produto).not.toBeNull();
    expect(produto?.estoque).toBe(8);
    expect(produto?.vendas).toBe(2);
    expect(produto?.disponivel).toBe(true);
  });

  it("deve deixar o produto indisponível quando o estoque acabar", async () => {
    const repository = new productRepository(testFile);

    await repository.criar(
      "Super Mario Bros",
      299.90,
      2,
      "Nintendo"
    );

    const produto = await repository.compra(1, 2);

    expect(produto).not.toBeNull();
    expect(produto?.estoque).toBe(0);
    expect(produto?.vendas).toBe(2);
    expect(produto?.disponivel).toBe(false);
  });

  it("não deve realizar compra de produto inexistente", async () => {
    const repository = new productRepository(testFile);

    const produto = await repository.compra(999, 1);

    expect(produto).toBeNull();
  });

  it("não deve realizar compra de produto sem estoque", async () => {
    const repository = new productRepository(testFile);

    await repository.criar(
      "Super Mario Bros",
      299.90,
      0,
      "Nintendo"
    );

    const produto = await repository.compra(1, 1);

    expect(produto).toBeNull();
  });

  it("deve remover um produto", async () => {
    const repository = new productRepository(testFile);

    await repository.criar(
      "Super Mario Bros",
      299.90,
      10,
      "Nintendo"
    );

    const resultado = await repository.removerProduto(1);

    expect(resultado).toBe(true);

    const produto = await repository.produtoInfo(1);

    expect(produto).toBeUndefined();
  });

  it("não deve remover um produto que não existe", async () => {
    const repository = new productRepository(testFile);

    const resultado = await repository.removerProduto(999);

    expect(resultado).toBe(false);
  });

  it("deve rejeitar produto com dados inválidos", async () => {
    const repository = new productRepository(testFile);

    await expect(
      repository.criar(
        "",
        299.90,
        10,
        "Nintendo"
      )
    ).rejects.toThrow();
  });

});