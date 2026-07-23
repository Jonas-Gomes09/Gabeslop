import express from "express";
import { pageRoutes } from "./routes/pageRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pageRoutes)

app.use(express.static("public"));
export default app;