const excluirContaBtn = document.getElementById("excluir-conta")
const userId = Number(excluirContaBtn.getAttribute("data-id"))

excluirContaBtn.addEventListener('click', async () => await excluirConta(userId))
async function excluirConta(id) {
    const URL = `/api/delete/${id}`
    try {
        const response = await fetch(URL, {
            method: 'DELETE'
        })

        if (response.ok) {
            console.log("Conta excluída com sucesso!")
        } else {
            console.error("Não foi possível excluir a conta:", response.statusText)
        }
    } catch(e) {
        console.error("Não foi possível executar a rota DELETE /api/delete:", e)
    }
}