/* Importamos bibliotecas */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

/* Rutas */
import addRouter from "./routes/add.routes.js";
import registroRouter from "./routes/registros.routes.js";
import entregadoRouter from "./routes/entregado.routes.js";
import obtenerRouter from "./routes/obtener.routes.js";
import busquedaRouter from "./routes/busqueda.routes.js";

dotenv.config();

const app = express(); // Inicializamos Express
const port = 5000; // Puerto

/* Hacemos que sea JSON la respuesta y que pueda acceder el frontend al backend */
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

/* Rutas */
app.use("/api/add", addRouter);
app.use("/api/get", obtenerRouter);
app.use("/api/registros", registroRouter);
app.use("/api/entregados", entregadoRouter);
app.use("/api/busqueda", busquedaRouter);

/* Otras rutas que no sean las antes dichas */
app.use("*", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server is running on: " + port);
});
