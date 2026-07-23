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