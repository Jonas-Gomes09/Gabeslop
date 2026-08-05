async function loadProducts(term) {
    const loading = document.getElementById("loading");
    const list = document.getElementById("plist");

    if (loading) loading.style.display = "block";

    try {
        const url = term ? '/admin/products?q=' + encodeURIComponent(term) : '/admin/products';
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro no servidor: ${response.status}`);
        }

        const json = await response.json();

        productList(json.dados);

        const totalElem = document.getElementById("producttotal");
        if (totalElem) {
            totalElem.textContent = `Total: ${json.total}`;
        }
    } catch (e) {
        console.error("Erro ao carregar produtos:", e);
        if (list) {
            list.innerHTML = `<p>Não foi possível carregar a lista.</p>`;
        }
    } finally {
        if (loading) loading.style.display = "none";
    }
}

function productList(products) {
    const list = document.getElementById("plist");
    if (!list) return;

    if (!products || products.length === 0) {
        list.innerHTML = `<p>Nenhum produto presente.</p>`;
        return;
    }

    list.innerHTML = products.map(p => {
        return `
            <div class="plistitem">
                <div class="foto">
                    <img style="max-height: 8rem; max-width: 8rem; margin-top: .8rem; border-radius: .5rem; object-fit: cover" src="uploads/${p.foto}" alt="Imagem de: ${p.titulo}">
                </div>
                <div class="infos">
                    <h1>${p.titulo}</h1>
                    <div class="info"><p>Preço: </p><span>R$ ${p.preco}</span></div>
                    <div class="info"><p>Vendas: </p><span>${p.vendas}</span></div>
                    <div class="info"><p>Qtd. em Estoque: </p><span>${p.estoque}</span></div>
                    <div class="info"><p>Disponibilidade: </p><span>${p.disponivel}</span></div>
                    <div class="info"><p>Categoria: </p><span>${p.categoria}</span></div>
                </div>
            </div>
        `;
    }).join('');
}

// Inicializa a busca ao carregar o arquivo
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});