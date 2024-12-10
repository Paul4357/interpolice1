// Modulo para administrar la info de los usuarios
const dataBase = require("./bd.js");

const express = require("express");

const usuario = express();

const bcrypt = require("bcryptjs");

usuario.get("/api/usuario/listartodos", (req, res) => {
  let limite = parseInt(req.query.limite);
  // RECIBIR LA PAGINA
  let pagina = parseInt(req.query.pagina);
  //CALCULAR EL OFFSET
  let offset = (pagina - 1) * limite;

  let consulta = "SELECT COUNT(*) AS totalUsuarios FROM usuarios";
  let consulta2 =
    "SELECT user_Id, user_Nombre, user_Apellido, rol_Tipo FROM usuario JOIN rol ON usuario.rol_rol_id = rol.rol_id";
  dataBase.query(consulta, (error, totalUsuarios) => {
    dataBase.query(consulta2, [limite, offset], (error, usuario) => {
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
          usuario: usuario,
        });
      }
    });
  });
});

usuario.get("/api/usuario/listarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta =
    "SELECT usuario.user_Nombre, usuario.user_Apellido, usuario.rol_rol_id FROM usuario WHERE user_Id = ?";
  dataBase.query(consulta, [id], (error, usuario) => {
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
        usuario: usuario,
      });
    }
  });
});

usuario.post("/api/usuario/agregar", (req, res) => {
  let frmDatos = {
    user_Nombre: req.body.nombre,
    user_Apellido: req.body.apellido,
    user_Pass: bcrypt.hashSync(req.body.password, 10),
    rol_rol_Id: req.body.rol,
  };
  let consulta = "INSERT INTO usuario SET ?";
  dataBase.query(consulta, [frmDatos], (error, usuario) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: `Se agrego correctamente el usuario ${frmDatos.user_Nombre} ${frmDatos.user_Apellido}`,
        usuario: usuario,
      });
    }
  });
});

usuario.put("/api/usuario/editarporid/:id", (req, res) => {
  let id = req.params.id;
  let frmDatos = {
    user_Nombre: req.body.nombre,
    user_Apellido: req.body.apellidos,
    /* user_Pass: req.body.password, */
    rol_rol_Id: req.body.rol,
  };
  let consulta = "UPDATE usuario SET ? WHERE user_Id = ?";
  dataBase.query(consulta, [frmDatos, id], (error, usuario) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: `Se actualizo correctamente el usuario ${frmDatos.user_Nombre} ${frmDatos.user_Apellido}`,
        usuario: usuario,
      });
    }
  });
});

usuario.delete("/api/usuario/eliminarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM usuario WHERE user_Id = ?";
  dataBase.query(consulta, [id], (error, usuario) => {
    if (error) {
      res.status(400).send({
        status: "Error",
        mensaje: "Ocurrio un error en la consulta",
        error: error,
      });
    } else {
      res.status(200).send({
        status: "OK",
        mensaje: "Se elimino el usuario correctamente",
        usuario: usuario,
      });
    }
  });
});

module.exports = usuario;
