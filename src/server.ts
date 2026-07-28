import app from "./app";

const PORT = 3009;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
const http = require('http')

const express = require('express')

http.createServer(express).listen(3000, () => console.log("Servidor rodando local na porta 3000"));