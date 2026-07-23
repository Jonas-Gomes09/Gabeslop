import express from "express";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: "segredo",
    resave: false,
    saveUninitialized: false,
  })
);

import { pageRoutes } from "./routes/pageRoutes";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(pageRoutes)

export default app;

