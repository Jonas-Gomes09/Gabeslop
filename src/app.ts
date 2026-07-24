import express from "express";
import session from "express-session";
import { pageRoutes } from "./routes/pageRoutes";
import { apiRoutes } from "./routes/apiRoutes";
import { cartRoutes } from "./routes/cartRoutes";
import { logger } from "./middlewares/logger";

const app = express();

app.use(session({
    secret: "segredo-senac-2026-rafavicnajonasmarvin",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        secure: false
    }
}));

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./src/views");

// Rotas
app.use("/", pageRoutes);
app.use("/api", apiRoutes);
app.use("/carrinho", cartRoutes);

export default app;