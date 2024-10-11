// Administracion de la conexion a la Database
// Usando CallBacks

// Instanciar la librebria MySQL
const mysql = require("mysql2"); // Principio de inmutabilidad

// Cadena de conexion
const cnx = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "interpolice",
});

cnx.query("SELECT * FROM citizen", (err, results) => {
  console.log(results); // results contains rows returned by server
});

cnx.connect((error) => {
  if (error) {
    console.log(`Error en la conexion \n ${error}`);
  } else {
    console.log("Conexion exitosa a la BD!");
  }
});

module.exports = cnx
