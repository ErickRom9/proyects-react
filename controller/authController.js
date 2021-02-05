const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs'); //Agregamod la nueva dependecnia de hash
const {validationResult} = require('express-validator'); //importamos la funcion
const jwt = require('jsonwebtoken'); //importamos la funcion de jwt




exports.autenticarUsuario = async (req, res) => {

    //revisar si hay errores:
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer email y pasword
    const {email, password} = req.body;

     //usamos trycatch para poder ver si hay algun error
try {
    //revisar que sea un usuario registrado
    let usuario = await Usuario.findOne({email}); //buscamos un usuario por su email

    if(!usuario){  //si ese usuario no existe
        return res.status(400).json({msg: 'El usuario no existe'}); //retornamos un mensaje
    }

    //revisar que el pasword sea el mismo
    const passCorrecto = await bcryptjs.compare(password, usuario.password); //comparamos el pasw de la peticion con el guardado
    if(!passCorrecto){ //si el pasw es incorrecto envia un mensaje
        return res.status(400).json({msg: 'El password es incorrecto'}); //retornamos un mensaje

    }
    //si todo es correcto firmar y crear el jwt

    //crear y firmar el jsonwebtoken
    const payload = {

        //se alamcenan datos del usaurio
        usuario: {
            id: usuario.id //se hara una consulta con el id del usaurio, asi se traera los proyectos creados por el usaurio
        }
    };
    //crear el jwt

     jwt.sign(payload, process.env.SECRETA, {  //la palabra sign es firmar se le pasasn dos parametro el payload y la palabra secreta
        expiresIn: 3600  // expira en una hora esta en segundos
    }, (error, token) =>{ //se crea un arrrow function por si hay algun error al crear el token
        if(error) throw error;

        //mensaje de confirmacion
        res.json({ token });

    });



   } catch(error){
       console.log(error);
   }






}

//Obtiene que usuario esta autenticado

exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password'); //esta ruta del usuario lo guarda en midleware donde guarda el usaurio con select -passwor le decimos que no queremos ese campo
        res.json({usuario});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'})

        
    }
}