// Modulo para administrar la info de los roles
const dataBase = require("./bd.js");

const express = require("express");

const rol = express();

/* rol.get("/api/rol/listartodos", (req, res) => {
  let limite = parseInt(req.query.limite);
  // RECIBIR LA PAGINA
  let pagina = parseInt(req.query.pagina);
  //CALCULAR EL OFFSET
  let offset = (pagina - 1) * limite;

  let consulta = "SELECT COUNT(*) AS totalRoles FROM roles";
  let consulta2 = "SELECT * FROM rol";

  dataBase.query(consulta, (error, totalRoles) => {
    dataBase.query(consulta2, [limite, offset], (error, rol) => {
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
          rol: rol,
        });
      }
    });
  });
}); */

rol.get("/api/rol/listartodos", (req, res) => {
  let consulta = "SELECT * FROM rol";
  dataBase.query(consulta, (error, rol) => {
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
        rol: rol,
      });
    }
  });
});

rol.get("/api/rol/listarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM rol WHERE rol_Id = ?";
  dataBase.query(consulta, [id], (error, rol) => {
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
        rol: rol,
      });
    }
  });
});

rol.post("/api/rol/agregar", (req, res) => {
  let frmDatos = {
    rol_Tipo: req.body.tipo,
    rol_Desc: req.body.descripcion,
  };
  let consulta = "INSERT INTO rol SET ?";
  dataBase.query(consulta, [frmDatos], (error, rol) => {
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
        rol: rol,
      });
    }
  });
});

rol.put("/api/rol/editarporid/:id", (req, res) => {
  let id = req.params.id;
  let frmDatos = {
    rol_Tipo: req.body.tipo,
    rol_Desc: req.body.descripcion,
  };
  let consulta = "UPDATE rol SET ? WHERE rol_Id = ?";
  dataBase.query(consulta, [frmDatos, id], (error, rol) => {
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
        rol: rol,
      });
    }
  });
});

rol.delete("/api/rol/eliminarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM rol WHERE rol_Id = ?";
  dataBase.query(consulta, [id], (error, rol) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: "¡Rol eliminado correctamente!",
        rol: rol,
      });
    }
  });
});

module.exports = rol;
