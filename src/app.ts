// Importar módulos
import express from "express";
import session from "express-session";
import helmet from "helmet";
import path from "path";

// Importar rotas
import { pageRoutes } from "./routes/pageRoutes";
import { apiRoutes } from "./routes/apiRoutes";
import { adminRoutes } from "./routes/adminRoutes";

// Importar middlewares
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
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false
    }
}));


// Middleware de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrcElem: ["'self'", "'unsafe-inline'"],
    }
  }
})) 

// Utilizar arquivos estáticos
app.use(express.static("public")); 
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Renderizar páginas EJS
app.set("view engine", "ejs"); 

// Apontar automaticamente para a pasta views
app.set("views", "./src/views"); 

// Permitir POST via JSON nn lembro direito
app.use(express.json()); 

// Permitir POST pelo navegador
app.use(express.urlencoded({ extended: true })); 

// Middleware para identificar os métodos e rotas executadas
app.use(logger); 



// Utilização das rotas
app.use(pageRoutes)
app.use(adminRoutes)
app.use(apiRoutes)

export default app;