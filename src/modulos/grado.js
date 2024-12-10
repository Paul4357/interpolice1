// Modulo para administrar la info de los grados
const dataBase = require("./bd.js");

const express = require("express");

const grado = express();

/* grado.get("/api/grado/listartodos", (req, res) => {
  let limite = parseInt(req.query.limite);
  // RECIBIR LA PAGINA
  let pagina = parseInt(req.query.pagina);
  //CALCULAR EL OFFSET
  let offset = (pagina - 1) * limite;

  let consulta = "SELECT COUNT(*) AS totalGrados FROM grados";
  let consulta2 = "SELECT * FROM grados";
  dataBase.query(consulta, (error, totalGrados) => {
    dataBase.query(consulta2, [limite, offset], (error, grado) => {
      if (error) {
        res.status(400).send({
          status: "Error",
          mensaje: "Ocurrio un error en la consulta",
          error: error,
        });
      } else {
        res.status(200).send({
          status: "OK",
          mensaje: "¡Registro exitoso!",
          grado: grado,
        });
      }
    });
  });
}); */

grado.get("/api/grado/listartodos", (req, res) => {
  let consulta = "SELECT * FROM grados";
  dataBase.query(consulta, (error, grado) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: "¡Consulta exitosa!",
        grado: grado,
      });
    }
  });
});

grado.get("/api/grado/listarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM grados WHERE gra_Id = ?";
  dataBase.query(consulta, [id], (error, grado) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: "Consulta exitosa",
        grado: grado,
      });
    }
  });
});

grado.post("/api/grado/agregar", (req, res) => {
  let frmDatos = {
    gra_Nivel: req.body.nivel,
    gra_Desc: req.body.descripcion,
  };
  let consulta = "INSERT INTO grados SET ?";
  dataBase.query(consulta, [frmDatos], (error, grado) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: "¡Actualización exitosa!",
        grado: grado,
      });
    }
  });
});

grado.put("/api/grado/editarporid/:id", (req, res) => {
  let id = req.params.id;
  let frmDatos = {
    gra_Nivel: req.body.nivel,
    gra_Desc: req.body.descripcion,
  };
  let consulta = "UPDATE grados SET ? WHERE gra_Id = ?";
  dataBase.query(consulta, [frmDatos, id], (error, grado) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: "Actualización exitosa",
        grado: grado,
      });
    }
  });
});

grado.delete("/api/grado/eliminarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM grados WHERE gra_Id = ?";
  dataBase.query(consulta, [id], (error, grado) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: "¡Grado eliminado correctamente!",
        grado: grado,
      });
    }
  });
});

module.exports = grado;
