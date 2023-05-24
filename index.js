//1.IMPORTACIONES
const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./config/db");
const cors = require("cors");

//2.MIDDLEWARES
//BAse de datos
connectDB();
//app.use(cors());

//Todas las peticiones y respuestas se manejan en protocolo JSON
app.use(express.json());

//3.RUTAS
app.use("/library", require("./routes/library"));

//users
app.use("/auth", require("./routes/users"));

//4.SERVER
app.listen(process.env.PORT, () => {
  console.log(`Servidor trabajando en http://localhost:${process.env.PORT}`);
});
