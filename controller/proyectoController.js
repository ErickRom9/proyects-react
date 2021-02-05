const Proyecto = require('../models/Proyecto');
const {validationResult, Result} = require('express-validator'); //importamos la funcion de validacion
const jwt = require('jsonwebtoken'); //importamos la funcion de jwt




exports.crearProyecto = async (req, res) => {

    //revisar si hay errores en la validacion

    const errores = validationResult(req); //en caso de errores validationresult los detecta y los colocara en el arreglo de errores
    if(!errores.isEmpty()){  //si tiene algo se mostrara el error
        return res.status(400).json({errores: errores.array()})
    }

    try {
        //Crear un proyecto nuevo
        let proyecto = new Proyecto(req.body); //como se le pasara solo el nombre del proyecto
        //guardar el creador via JWT
        proyecto.creador = req.usuario.id;
        //despues guardamos el poryecto
        proyecto.save();
        res.json(proyecto);


        
    } catch (error) {  //Se crea un try catch dentro del catch se cacha el error para poder debugearlo
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}


//obtiene proyectos del usuario autenticado en el momento:

exports.obtenerProyecto = async (req, res) => {

    try {

        //con la siguiente funcion nos trae todos los poruectos del usuario actual
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1}); //le decimos que campo o atributo debe cumplir para traer proyectos, el sort -1 cambia el orden
        res.json({proyectos}) //mandamos al response los proyectos que se identificaron arriba
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}



//Actualizar proyectos


exports.actualizarProyecto = async (req, res) => {

    
    //revisar si hay errores:

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer info del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {}  //creamos un objeto vacio

    if(nombre) //si el usuario agrega un nuevo  nombre
    {
        nuevoProyecto.nombre = nombre; //aqui se actualizara el nombrel del poryecto, si se agregan mas campos debera tener mas ifs
    }

    try {

        //revisar el id, siempre que se hace consulta a la BD utilizar await
        let proyecto = await Proyecto.findById(req.params.id); //esta funcion nos dara el id del proyecto a actualizar

        //si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg: 'proyecto no encontrado'}) 
        }



        //verificar el creador del proyecto

        if(proyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'})

        }

        //Actualizar

        proyecto = await Proyecto.findByIdAndUpdate ({_id: req.params.id}, {$set: nuevoProyecto}, {new: true});  //es como el where en sql

        res.json({proyecto});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}


//Eliminar proyecto

exports.eliminarProyecto = async (req, res) => {

    try {

        //revisar el id, siempre que se hace consulta a la BD utilizar await
        let proyecto = await Proyecto.findById(req.params.id); //esta funcion nos dara el id del proyecto a actualizar

        //si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg: 'proyecto no encontrado'}) 
        }



        //verificar el creador del proyecto

        if(proyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'});

        }

        //Eliminar el proyecto

        await Proyecto.findOneAndRemove ({ _id: req.params.id }); //EL _id esta en mongo db

        res.json({msg: 'Proyecto eliminado'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('error en el servidor');
    }


}