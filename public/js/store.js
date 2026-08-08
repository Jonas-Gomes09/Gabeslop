var valorTotal = 0

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
        const id = p._id || p.id;

        return `
            <div class="plistitem">
            <h1 style="color: black; font-size: 1.3rem">${p.titulo}</h1>
            <div class="informacoesproduto">
                <div class="foto">
                    <img style="max-height: 8rem; max-width: 8rem; margin-top: .8rem; border-radius: .5rem; object-fit: cover" src="uploads/${p.foto}" alt="Imagem de: ${p.titulo}">
                </div>
                <div class="infos">
                    
                    <div class="info"><p>Preço: </p><span>R$ ${p.preco}</span></div>
                    <div class="info"><p>Vendas: </p><span>${p.vendas}</span></div>
                    <div class="info"><p>Qtd. em Estoque: </p><span>${p.estoque}</span></div>
                    <div class="info"><p>Categoria: </p><span>${p.categoria}</span></div>


                </div>        
            </div>
            <div class="productbuttons">
                <button type="button" class="btn-adicionar btn-add-cart" data-id="${id}">Adicionar ao carrinho</button>
                <button type="button" class="btn-adicionar btn-view-product" data-id="${id}">Acessar página</button>
            </buttons>
            </div>
            </div>
        `;
    }).join('');
}


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
        list.innerHTML = `<p>Nenhum produto presente.</p>`;
        return;
    }

    list.innerHTML = products.map(p => {
        // Trata o campo de ID independentemente se vem de MongoDB (_id) ou relacional (id)
        const id = p._id || p.id;
        valorTotal += p.produto.preco * p.qtd
        return `
            <div class="clistitem">
                <div class="cfoto">
                    <img style="max-height: 4rem; max-width: 4rem; margin-top: .8rem; border-radius: .5rem; object-fit: cover" src="uploads/${p.produto.foto}" alt="Imagem de: ${p.produto.titulo}">
                </div>
                <div class="cinfos">
                    <h1>${p.produto.titulo}</h1>
                    <div class="cinfo"><p>Preço: </p><span>R$ ${p.produto.preco}</span></div>
                    <div class="cinfo"><p>Quantidade: </p><span>${p.qtd}</span></div>

                    <form action="/carrinho/adicionar/${id}" method="POST" style="margin-top: 0.8rem;">
                        <input type="hidden" name="quantidade" value="1">
                        <button type="submit" class="btn-adicionar remover-do-carrinho">Remover do carrinho</button>
                    </form>
                </div>
            </div>
        `;
    }).join('');
}


document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadCart();

    const productListContainer = document.getElementById("plist")

    if (productListContainer) {
        productListContainer.addEventListener("click", async (event) => {
            const target = event.target

            const btnAdd = target.closest(".btn-add-cart")
            if (btnAdd) {
                const id = Number(btnAdd.getAttribute("data-id"))
                await handleAddToCart(id)
                return
            }

            const btnView = target.closest(".btn-view-product")
            if (btnView) {
                const id = Number(btnAdd.getAttribute("data-id"))
                window.location.href(`/store/${id}`)
                return
            }
        })
    }
});


async function handleAddToCart(productId) {
    try {
        const response = await fetch('/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: Number(productId),
                qtd: 1
            })
        })

        if (response.ok) {
            if (typeof loadCart === "function") {
                await loadCart()
                console.log("Adicionado ao carrinho com sucesso")
            }
        } else {
            console.error("Erro ao adicionar ao carrinho:", response.statusText)
        }
    } catch(e) {
        console.error("Erro ao tentar executar requisição POST /cart:", e)
    }
}

