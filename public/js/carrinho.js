async function loadProducts(term) {
    const loading = document.getElementById("loading")
    const list = document.getElementById("plist")

    loading.style.display = "block"
    try {
        const url = term ? '/admin/products?q=' + encodeURIComponent(term) : '/admin/products'
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("O servidor não retornou nenhuma resposta.")
        }
        const json = await response.json()
        
        productList(json.dados)
        document.getElementById("producttotal").textContent = `Total: ${json.total}`
    } catch(e) {
        list.innerHTML = `<p>Não foi possível carregar a lista.</p>`
    } finally {
        loading.style.display = "none"
    }
}

// Exibir produtos
function productList(products) {
    const list = document.getElementById("plist")
    if (products.length === 0) {
        list.innerHTML = `<p>Nenhum produto presente.</p>`
        return
    }
    list.innerHTML = products.map(p =>
        `<div class="plistitem">
            <div class="foto">
                <img style="max-height: 8rem; max-width: 8rem; margin-top: .8rem; border-radius: .5rem" src="/uploads/${p.foto}" alt="${`Imagem de: ` + p.titulo}">
            </div>
            <div class="infos">
                <h1>${p.titulo}</h1>
                <div class="info">
                <p>Preço: </p><span>${p.preco}</span>
                </div>
                <div class="info">
                <p>Vendas: </p><span>${p.vendas}</span>
                </div>
                <div class="info">
                <p>Qtd. em Estoque: </p><span>${p.estoque}</span>
                </div>
                <div class="info">
                <p>Disponibilidade: </p><span>${p.disponivel}</span>
                </div>
                <div class="info">
                <p>Categoria: </p><span>${p.categoria}</span>
                </div>
            </div>
            <div class="prodbuttons">
                <button class="sideBarButton">ATUALIZAR ESTOQUE</button>
                <button class="sideBarButton">EXCLUIR PRODUTO</button>
                <button class="sideBarButton">ATUALIZAR INFORMAÇÕES</button>
            </div>
        </div>`
        ).join('')
}
loadProducts()