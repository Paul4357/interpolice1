// Modulo para administrar la info de los ciudadanos
const dataBase = require("./bd.js");

const express = require("express");

const citizen = express();

ciudadano.get("/api/ciudadano/listartodos", (req, res) => {
  let limite = parseInt(req.query.limite);
  // RECIBIR LA PAGINA
  let pagina = parseInt(req.query.pagina);
  //CALCULAR EL OFFSET
  let offset = (pagina - 1) * limite;

  let consulta = "SELECT COUNT(*) AS totalCiudadanos FROM citizen";
  let consulta2 =
    "SELECT citizen.id, citizen.nombre, citizen.apellidos, citizen.apodo, citizen.email, citizen.foto, citizen.fechanace, categoria.cat_Nombre FROM citizen JOIN categoria ON categoria.cat_Id = citizen.tipo_tip_Id LIMIT ? OFFSET ?";
  dataBase.query(consulta, (error, totalCiudadanos) => {
    dataBase.query(consulta2, [limite, offset], (error, citizen) => {
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
          citizen: citizen,
        });
      }
    });
  });
});

/* citizen.get("/api/citizen/listartodos", (req, res) => {
  let consulta =
    "SELECT citizen.id, citizen.nombre, citizen.apellidos, citizen.apodo, citizen.email, citizen.foto, citizen.fechanace, categoria.cat_Nombre FROM citizen JOIN categoria ON categoria.cat_Id = citizen.tipo_tip_Id LIMIT ? OFFSET ?";
  dataBase.query(consulta, (error, citizen) => {
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
        citizen: citizen,
      });
    }
  });
}); */

citizen.get("/api/citizen/listarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta =
    "SELECT citizen.nombre, citizen.apellidos, citizen.apodo, citizen.email, citizen.foto, citizen.fechanace, categoria.cat_Id FROM citizen JOIN categoria ON categoria.cat_Id = citizen.tipo_tip_Id WHERE citizen.id = ?";
  dataBase.query(consulta, [id], (error, citizen) => {
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
        citizen: citizen,
      });
    }
  });
});

citizen.post("/api/citizen/agregar", (req, res) => {
  let frmDatos = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    apodo: req.body.apodo,
    email: req.body.email,
    /* foto: req.body.foto, */
    fechanace: req.body.fechaNace,
    tipo_tip_Id: req.body.tipo,
  };
  let consulta = "INSERT INTO citizen SET ?";
  dataBase.query(consulta, [frmDatos], (error, citizen) => {
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
        citizen: citizen,
      });
    }
  });
});

citizen.put("/api/citizen/editarporid/:id", (req, res) => {
  let id = req.params.id;
  let frmDatos = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    apodo: req.body.apodo,
    email: req.body.email,
    /* foto: req.body.foto, */
    fechanace: req.body.fechaNace,
    tipo_tip_Id: req.body.tipo,
  };
  let consulta = "UPDATE citizen SET ? WHERE id = ?";
  dataBase.query(consulta, [frmDatos, id], (error, citizen) => {
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
        citizen: citizen,
      });
    }
  });
});

citizen.delete("/api/citizen/eliminarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM citizen WHERE id = ?";
  dataBase.query(consulta, [id], (error, citizen) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: "Se elimino el ciudadano exitosamente",
        citizen: citizen,
      });
    }
  });
});

module.exports = citizen;
