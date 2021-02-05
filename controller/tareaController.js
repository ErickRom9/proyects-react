const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult, Result} = require('express-validator'); //importamos la funcion de validacion
const jwt = require('jsonwebtoken'); //importamos la funcion de jwt




exports.crearTarea = async (req, res) => {

    //revisar si hay errores en la validacion

    const errores = validationResult(req); //en caso de errores validationresult los detecta y los colocara en el arreglo de errores
    if(!errores.isEmpty()){  //si tiene algo se mostrara el error
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer el proyecto y validar que exista
    //const { proyecto } = req.body; //se aplica restructury y proyecto viene de request.body


    try {
        const { proyecto } = req.body; //se aplica restructury y proyecto viene de request.body

        //Crear un Tarea nuevo
        const existeProyecto = await Proyecto.findById(proyecto); //se busca el ID del proyectp y le pasamos el proyecto
        if(!existeProyecto){ //si el proyecto no existe retonaremos
            return res.status(400).json({msg: 'Proyecto no encontrado'})
        }

        //Revisar si el proyecto actual corresponde al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'})

        }
        
        //creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});



        
    } catch (error) {  //Se crea un try catch dentro del catch se cacha el error para poder debugearlo
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}

//obtiene tareas de los proyectos del usuario autenticado en el momento:

exports.obtenerTarea = async (req, res) => {

    


    try {
        //Extraer el proyecto y comprabas que exista
        const { proyecto } = req.query; //se aplica restructury y proyecto viene de request.body

        
        const existeProyecto = await Proyecto.findById(proyecto); //se busca el ID del proyectp y le pasamos el proyecto
        if(!existeProyecto){ //si el proyecto no existe retonaremos
            return res.status(400).json({msg: 'Proyecto no encontrado'})
        }

        //Revisar si el proyecto actual corresponde al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'})

        }

        //Obtener tareas por proyectos
        const tareas = await Tarea.find({proyecto}).sort({ creado: -1});//le decimos donde el proyecto sea igual al proyecto que le pasamos en la linea 60
        res.json({tareas}) //mandamos al response los proyectos que se identificaron arriba
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}



//Actualizar tareas

exports.actualizarTarea = async (req, res) => {

    try {

        //Extraer el proyecto y comprabas que exista
        const { proyecto, nombre, estado, fechafin, fechainicio } = req.body; //se aplica restructury y proyecto viene de request.body

        //si la tarea existe o no

        let tareaExiste = await  Tarea.findById(req.params.id);

        if(!tareaExiste){
            return res.status(401).json({msg: 'No existe esa tarea'})
        }

        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto); //se busca el ID del proyectp y le pasamos el proyecto
      
        //Revisar si el proyecto actual corresponde al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //crear un objeto con la nueva informacion, se empieza a agregar la info que el usuario actualice

        const nuevaTarea = {};

        //Si el usuario actualiza el nombre de la tarea, aqui validara
        //if(nombre){
            nuevaTarea.nombre = nombre;
        
       // }

        //Si el usuario cambia el estado de la tarea, aqui validara
       // if(estado){
            nuevaTarea.estado = estado;
            nuevaTarea.fechainicio = fechainicio;
            nuevaTarea.fechafin = fechafin;
       // }
        
        //guardar la tarea
        tareaExiste = await Tarea.findByIdAndUpdate ({_id: req.params.id}, nuevaTarea, {new: true});  //es como el where en sql

        res.json({tareaExiste});
        

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

   
}

//Eliminar tarea

exports.eliminarTarea = async (req, res) => {
    try {

        //Extraer el proyecto y comprabas que exista
        const { proyecto } = req.query; //se aplica restructury y proyecto viene de request.body

        //si la tarea existe o no

        let tareaExiste = await  Tarea.findById(req.params.id);

        if(!tareaExiste){
            return res.status(401).json({msg: 'No existe esa tarea'})
        }

        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto); //se busca el ID del proyectp y le pasamos el proyecto
      
        //Revisar si el proyecto actual corresponde al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'})
        }

       //Elimar tarea

       await Tarea.findOneAndRemove ({ _id: req.params.id }); //EL _id esta en mongo db

       res.json({msg: 'Tarea eliminado'});
        

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}
