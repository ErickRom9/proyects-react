//rutas para crear usaurios
const express = require('express');
const router = express.Router();
const proyectoController = require('../controller/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator')


//CREA Proyectos

//API/Proyectos

router.post('/',
auth, //primero validamos lo que exista en el middleware 
//hacemos validaciones de check
[
  check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),  //con esto validamos que el nombre no este vacio
],
proyectoController.crearProyecto  //SE IMPORTA EL METODO QUE SE OCUPARA
);

//Obener todos los proyectos del usuario autenticado
router.get('/',
auth, //primero validamos lo que exista en el middleware 
proyectoController.obtenerProyecto  //SE IMPORTA EL METODO QUE SE OCUPARA
);

//Actualizar proyectos por su ID
router.put('/:id', //el id es un comidin para saber que poryecto actualizar
auth, //primero validamos lo que exista en el middleware 
//hacemos validaciones de check
[
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),  //con esto validamos que el nombre no este vacio
  ],
proyectoController.actualizarProyecto  //SE IMPORTA EL METODO QUE SE OCUPARA
);

//Eliminar un proycto
router.delete('/:id', //el id es un comidin para saber que poryecto actualizar
auth, //primero validamos lo que exista en el middleware 
proyectoController.eliminarProyecto  //SE IMPORTA EL METODO QUE SE OCUPARA
);


module.exports = router; 




