// Importando
import express from "express";
import session from "express-session";
import helmet from "helmet";

import { pageRoutes } from "./routes/pageRoutes";
import { apiRoutes } from "./routes/apiRoutes";

import { logger } from "./middlewares/logger";

// Facilitar a vida
const app = express();

// Cookie e sessão
app.use(
  session({
    secret: "segredo-senac-2026-rafavicnajonasmarvin",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        secure: false
    }
}));

app.use(helmet()) // Middleware de segurança
app.use(express.static("public")); // Utilizar arquivos estáticos
app.set("view engine", "ejs"); // Renderizar páginas EJS
app.set("views", "./src/views"); // Apontar automaticamente para a pasta views

app.use(express.json()); // Permitir POST via JSON
app.use(express.urlencoded({ extended: true })); // Permitir POST pelo navegador

app.use(logger); // Middleware para identificar os métodos e rotas executadas

app.use(pageRoutes) // Rotas de páginas
app.use(apiRoutes) // Rotas da API

export default app;