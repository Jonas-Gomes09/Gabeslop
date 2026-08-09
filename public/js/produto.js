const adicionarBotao = document.getElementById("addcart")
const id = Number(adicionarBotao.getAttribute("data-id"))

adicionarBotao.addEventListener('click', async () => await handleAddToCart(id))


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
        valorTotal = 0

        if (response.ok) {
            console.log("Adicionado ao carrinho com sucesso")
            window.location.href = "/store"
        } else {
            console.error("Erro ao adicionar ao carrinho:", response.statusText)
        }
    } catch(e) {
        console.error("Erro ao tentar executar requisição POST /cart:", e)
    }
}

