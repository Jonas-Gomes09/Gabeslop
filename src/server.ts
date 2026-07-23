import app from "./app";

const PORT = 3009;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});