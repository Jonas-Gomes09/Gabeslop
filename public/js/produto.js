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

document.addEventListener("DOMContentLoaded", () => {
    loadComments();

    const commentForm = document.getElementById("commentForm");
    if (commentForm) {
        commentForm.addEventListener("submit", createComment)
    }

    const commentsContainer = document.getElementById("commentsContainer");
    if (commentsContainer) {
        commentsContainer.addEventListener("click", deleteComment)
    }
})

// GET /comments
async function loadComments() {
    const container = document.getElementById("commentsContainer")

    try {
        const response = await fetch("/comments");
        const json = await response.json()

        if (!response.ok) {
            container.innerHTML = `<p style="color: black">Não foi possível carregar os comentários. ${json.message}</p>`
            return
        }

        listComments(json.dados, json.user)
    } catch(e) {
        console.error("Erro ao listar comentários:", e)
    }
}

function listComments(comments, users) {
    const container = document.getElementById("commentsContainer")

    if (!comments || comments.length === 0) {
        container.innerHTML = `<p style="color: black">Nenhum comentário ainda. Seja o primeiro a comentar!</p>`
        return
    }

    container.innerHTML = comments.map(c => {
        const autor = users.find(u => Number(u.id) === Number(c.idUser))
        const foto = autor?.foto ? `${autor.foto}` : '/img/missingpfp.png';
        return `
        <div class="comlistitem">
            <div class="user">
            <div class="userinfo">
                <div class="userphoto">
                    <img class="userphotoimg" src="${foto}" alt="Foto de perfil de ${autor.nome}"> 
                </div>
                    <p style="font-size: 1.5rem; font-weight: 700">${autor.nome}</p>
            </div>
                <button type="button" class="botao-excluir btn-excluir" data-id=${c.id}>Excluir comentário</button>         
            </div>
            <div class="comment-title">
                <h3>${c.titulo}</h3>
            </div>
            <div class="comment-text">
                <p class="comment-text-content">${c.comentario}</p>
            </div>
        </div>
        `
    }).join("");
}

async function createComment(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value
    const comentario = document.getElementById("comentario").value

    try {
        const response = await fetch("/comments", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({titulo, comentario})
        })

        const json = await response.json()

        if (response.ok) {
            await loadComments()
        } else {
            alert(json.message)
        }
    } catch(e) {
        console.error("Não foi possível criar o comentário:", e)
    }
}

async function deleteComment(event) {
    event.preventDefault();

    const btnExcluir = event.target.closest(".btn-excluir")
    if (!btnExcluir) return;

    const commentId = Number(btnExcluir.getAttribute("data-id"))

    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
        const response = await fetch(`/comments/${commentId}`, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            await loadComments()
        } else {
            alert(json.message)
        }
    } catch(e) {
        console.error("Não foi possível criar o comentário:", e)
    }
}