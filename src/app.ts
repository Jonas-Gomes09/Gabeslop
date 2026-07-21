import express from "express";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "lojagames",
        resave: false,
        saveUninitialized: false,
    })
);

export default app;