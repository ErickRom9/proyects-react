//rutas para crear usaurios
const express = require('express');
const router = express.Router();
const tareaController = require('../controller/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator')


//CREA tareas

//API/tareas

router.post('/',
auth, //primero validamos lo que exista en el middleware 
//hacemos validaciones de check
[
  check('nombre', 'El nombre del tarea es obligatorio').not().isEmpty(),  //con esto validamos que el nombre no este vacio
  check('proyecto', 'El proyecto es obligatorio').not().isEmpty(),  //con esto recordamos que el proyecto es obligatiro
  check('fechainicio', 'La fecha inicio es obligatoria').not().isEmpty(),  //con esto validamos que el nombre no este vacio
  check('fechafin', 'La fecha fin es obligatoria').not().isEmpty(),  //con esto recordamos que el proyecto es obligatiro
],
tareaController.crearTarea  //SE IMPORTA EL METODO QUE SE OCUPARA
);

//Obener todos las tareas por proyecto del usuario autenticado
router.get('/',
auth, //primero validamos lo que exista en el middleware 
tareaController.obtenerTarea  //SE IMPORTA EL METODO QUE SE OCUPARA
);

//Actualizar tareas por su ID
router.put('/:id', //el id es un comidin para saber que poryecto actualizar
auth, //primero validamos lo que exista en el middleware 
tareaController.actualizarTarea  //SE IMPORTA EL METODO QUE SE OCUPARA
);

//Eliminar una tarea
router.delete('/:id', //el id es un comidin para saber que poryecto actualizar
auth, //primero validamos lo que exista en el middleware 
tareaController.eliminarTarea  //SE IMPORTA EL METODO QUE SE OCUPARA
);






module.exports = router; 




