import express from "express";
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