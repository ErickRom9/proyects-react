//rutas para autenticar
const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const authController = require('../controller/authController');
const auth = require('../middleware/auth');

//CREA UN USUARIO
//Inciari sesion
//API/auth

router.post('/', 

authController.autenticarUsuario
);

//obtiene el usario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado

);
module.exports = router; 
