let searchTimer = undefined

// Pegar objetos do site
const nothingDiv = document.getElementById("nothinghere") // Tela de bem-vindo
const consoleDiv = document.getElementById("console") // Tela do console
const usersDiv = document.getElementById("users")
const productsDiv = document.getElementById("products")

const toggleConsoleBtn = document.getElementById("toggleConsole") // Botão de mostrar console
const toggleUsersBtn = document.getElementById("toggleUsers") // Botão de mostrar console
const toggleProductsBtn = document.getElementById("toggleProducts") // Botão de mostrar console
const logoffBtn = document.getElementById("logoff") // Botão de sair

async function showNothingDiv() {
    consoleDiv.style.display = "none"
    nothingDiv.style.display = "flex"
    usersDiv.style.display = "none"
    productsDiv.style.display = "none"
    loadUsers()
}

// Fazer o botão "SAIR" fazer logoff
async function logoffFunction() {
    window.location.href = '/logoff'

} logoffBtn.addEventListener('click', () => logoffFunction())



// Fazer o botão "USUÁRIOS" mostrar os usuários
async function showUsers() {
    toggleUsersBtn.disabled = true
    toggleConsoleBtn.disabled = false
    toggleProductsBtn.disabled = false

    usersDiv.style.display = "flex"
    nothingDiv.style.display = "none"
    consoleDiv.style.display = "none"
    productsDiv.style.display = "none"
    
} toggleUsersBtn.addEventListener('click', () => {showUsers()})



// Fazer o botão "PRODUTOS" mostrar os produtos
async function showProducts() {
    toggleUsersBtn.disabled = false
    toggleConsoleBtn.disabled = false
    toggleProductsBtn.disabled = true

    usersDiv.style.display = "none"
    nothingDiv.style.display = "none"
    consoleDiv.style.display = "none"
    productsDiv.style.display = "flex"
    
} toggleProductsBtn.addEventListener('click', () => showProducts())



// Fazer o botão "CONSOLE" mostrar o console
async function showConsole() {
    toggleUsersBtn.disabled = false
    toggleConsoleBtn.disabled = true
    toggleProductsBtn.disabled = false

    consoleDiv.style.display = "flex"
    nothingDiv.style.display = "none"
    usersDiv.style.display = "none"
    productsDiv.style.display = "none"
    loadUsers()

} toggleConsoleBtn.addEventListener('click', () => showConsole())

// Carregar usuários
async function loadUsers(term) {
    const loading = document.getElementById("loading")
    const list = document.getElementById("ulist")

    loading.style.display = "block"
    try {
        const url = term ? '/admin/users?q=' + encodeURIComponent(term) : '/admin/users'
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("O servidor não retornou nenhuma resposta.")
        }
        const json = await response.json()
        
        userList(json.dados)
        document.getElementById("total").textContent = `Total: ${json.total}`
    } catch(e) {
        list.innerHTML = `<p>Não foi possível carregar a lista.</p>`
    } finally {
        loading.style.display = "none"
    }
}

// Exibir usuários
function userList(users) {
    const list = document.getElementById("ulist")
    if (users.length === 0) {
        list.innerHTML = `<p>Nenhum usuário presente.</p>`
        return
    }
    list.innerHTML = users.map(u =>
        `<div class="ulistitem">
            <div class="foto">
                <img style="max-height: 8rem; margin-top: .8rem" src=${u.foto ? u.foto : u.perms==="admin" ? 'img/adminpfp.png' : 'img/missingpfp.png'} alt=${`Foto de perfil de: ` + u.nome}>
            </div>
            <div class="infos">
                <h1>${u.nome}</h1>
                <div class="info">
                <p>Email: </p><span>${u.email}</span>
                </div>
                <div class="info">
                <p>Data de criação: </p><span>${u.dataCriacao}</span>
                </div>
                <div class="info">
                <p>Total de compras: </p><span>${u.totalCompras}</span>
                </div>
                <div class="info">
                <p>Permissões: </p><span>${u.perms}</span>
                </div>
            </div>
        </div>`
        ).join('')
}

function debounceUsers(event) {
clearTimeout(searchTimer)
searchTimer = setTimeout(() => loadUsers(event.target.value.trim()), 300)
}

showNothingDiv()