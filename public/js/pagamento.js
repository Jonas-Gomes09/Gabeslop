let valorTotal = 0
let valorProd = 0

async function loadCart(term) {
    const loading = document.getElementById("loading");
    const list = document.getElementById("clist");

    if (loading) loading.style.display = "block";

    try {
        const url = term ? '/cart?q=' + encodeURIComponent(term) : '/cart';
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro no servidor: ${response.status}`);
        }

        const json = await response.json();

        cartList(json.dados);

        const totalElem = document.getElementById("totalItensCarrinho");
        const totalPreco = document.getElementById("cart-total")
        if (totalElem) {
            totalElem.textContent = `Total de itens: ${json.totalItens}`;
            totalPreco.textContent = `Valor total: R$${valorTotal}`
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

function cartList(products) {
    const list = document.getElementById("clist");
    if (!list) return;

    if (!products || products.length === 0) {
        list.innerHTML = `<p class="cartnenhumproduto">Nada aqui ainda. Adicione um item ao carrinho e ele aparecerá aqui!</p>`;
        valorTotal = 0
        return;
    }

    list.innerHTML = products.map(p => {
        valorProd = p.qtd * p.produto.preco
        valorTotal += valorProd
        return `
            <div class="clistitem">
                <div class="cfoto">
                    <img class="cfoto" src="uploads/${p.produto.foto}" alt="Imagem de: ${p.produto.titulo}">
                </div>
                <div class="cinfos">
                    <h1 style="max-width: 100px">${p.produto.titulo}</h1>
                    <div class="cinfo" style="margin-top: -1rem"><p>Preço: </p><span>R$ ${p.produto.preco},00</span></div>
                    <div class="cinfo"><p>Quantidade: </p><span>${p.qtd}</span></div>
                    <div class="cinfo">
                </div>
                </div>
                </div>
            </div>
        `;
    }).join('');
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadCart()
})