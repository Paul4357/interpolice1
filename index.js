const express = require("express");
const cors = require("cors");

// Metodo constructor
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/", require("./src/modulos/citizen.js"));
app.use("/", require("./src/modulos/categoria.js"));
app.use("/", require("./src/modulos/delito.js"));
app.use("/", require("./src/modulos/grado.js"));
app.use("/", require("./src/modulos/usuario.js"));
app.use("/", require("./src/modulos/rol.js"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running in: 4100`);
});
