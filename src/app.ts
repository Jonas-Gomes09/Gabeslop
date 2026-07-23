import express from "express";
import session from "express-session";

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
  })
);

import { pageRoutes } from "./routes/pageRoutes";
import path from "path";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(pageRoutes)

export default app;

