// Modulo para administrar la info de los delitos
const dataBase = require("./bd.js");

const express = require("express");

const delito = express();

delito.get("/api/delito/listartodos", (req, res) => {
  let limite = parseInt(req.query.limite);
  // RECIBIR LA PAGINA
  let pagina = parseInt(req.query.pagina);
  //CALCULAR EL OFFSET
  let offset = (pagina - 1) * limite;

  let consulta = "SELECT COUNT(*) AS totalDelitos FROM delitos";
  let consulta2 =
    "SELECT del_Id, del_Nombre, del_Desc, gra_Nivel FROM delito JOIN grados ON delito.grados_gra_Id = grados.gra_Id LIMIT ? OFFSET ?";
  dataBase.query(consulta, (error, totalDelitos) => {
    dataBase.query(consulta2, [limite, offset], (error, delito) => {
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
          delito: delito,
        });
      }
    });
  });
});

delito.get("/api/delito/listarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta =
    "SELECT delito.del_Nombre, delito.del_Desc, grados.gra_Id FROM delito JOIN grados ON grados.gra_Id = delito.grados_gra_Id WHERE del_Id = ?";
  dataBase.query(consulta, [id], (error, delito) => {
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
        delito: delito,
      });
    }
  });
});

delito.post("/api/delito/agregar", (req, res) => {
  let frmDatos = {
    del_Nombre: req.body.nombre,
    del_Desc: req.body.descripcion,
    grados_gra_Id: req.body.grado,
  };
  let consulta = "INSERT INTO delito SET ?";
  dataBase.query(consulta, [frmDatos], (error, delito) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: `Se agrego correctamente el delito ${frmDatos.del_Nombre}`,
        delito: delito,
      });
    }
  });
});

delito.put("/api/delito/editarporid/:id", (req, res) => {
  let id = req.params.id;
  let frmDatos = {
    del_Nombre: req.body.nombre,
    del_Desc: req.body.descripcion,
    grados_gra_Id: req.body.grado,
  };
  let consulta = "UPDATE delito SET ? WHERE del_Id = ?";
  dataBase.query(consulta, [frmDatos, id], (error, delito) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: `Se actualizo correctamente el delito ${frmDatos.del_Nombre}`,
        delito: delito,
      });
    }
  });
});

delito.delete("/api/delito/eliminarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM delito WHERE del_Id = ?";
  dataBase.query(consulta, [id], (error, delito) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: "Se elimino el delito correctamente",
        delito: delito,
      });
    }
  });
});

module.exports = delito;
