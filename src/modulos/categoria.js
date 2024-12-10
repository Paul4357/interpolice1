// Modulo para administrar la info de las categorias
const dataBase = require("./bd.js");

const express = require("express");

const categoria = express();

categoria.get("/api/categoria/listartodos", (req, res) => {
  let consulta = "SELECT * FROM categoria";
  dataBase.query(consulta, (error, categoria) => {
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
        categoria: categoria,
      });
    }
  });
});

categoria.get("/api/categoria/listarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM categoria WHERE cat_Id = ?";
  dataBase.query(consulta, [id], (error, categoria) => {
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
        categoria: categoria,
      });
    }
  });
});

categoria.post("/api/categoria/agregar", (req, res) => {
  let frmDatos = {
    cat_Nombre: req.body.nombre,
    cat_Desc: req.body.descripcion,
  };
  let consulta = "INSERT INTO categoria SET ?";
  dataBase.query(consulta, [frmDatos], (error, categoria) => {
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
        categoria: categoria,
      });
    }
  });
});

categoria.put("/api/categoria/editarporid/:id", (req, res) => {
  let id = req.params.id;
  let frmDatos = {
    cat_Nombre: req.body.nombre,
    cat_Desc: req.body.descripcion,
  };
  let consulta = "UPDATE categoria SET ? WHERE cat_Id = ?";
  dataBase.query(consulta, [frmDatos, id], (error, categoria) => {
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
        categoria: categoria,
      });
    }
  });
});

categoria.delete("/api/categoria/eliminarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM categoria WHERE cat_Id = ?";
  dataBase.query(consulta, [id], (error, categoria) => {
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
        categoria: categoria,
      });
    }
  });
});

module.exports = categoria;
