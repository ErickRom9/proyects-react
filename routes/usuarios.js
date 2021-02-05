//rutas para crear usaurios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');
const { check } = require('express-validator')


//CREA UN USUARIO

//API/USUARIOS

router.post('/', 

//Creamos nuestras reglas de validacion
[
  check('nombre', 'el nombre es obligatorio').not().isEmpty(), //esto revisara que no este vacio
  check('email', 'Agrega un email valido').isEmail(), //esto revisara que no este vacio
  check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 }),

],
  usuarioController.crearUsuario
);
module.exports = router; 
