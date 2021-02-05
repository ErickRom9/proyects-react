const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs'); //Agregamod la nueva dependecnia de hash
const {validationResult} = require('express-validator'); //importamos la funcion
const jwt = require('jsonwebtoken'); //importamos la funcion de jwt




exports.crearUsuario = async (req, res) => {

    //revisar si hay errores:

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer email y pasword
    const {email, password} = req.body;

    //usamos trycatch para poder ver si hay algun error
try {
    //revisar que el usaurio registrado sea unico
    let usuario = await Usuario.findOne({email});

    if(usuario){
        return res.status(400).json({msg: 'El usuario ya existe'})
    }




    //crea un nuevo usuario
    usuario = new Usuario(req.body);

    //hashear el pasword
    const salt = await bcryptjs.genSalt(10);
    //re-escribira el pasw hasheado
    usuario.password = await bcryptjs.hash(password, salt);

    //guarda el nuevo usuario
    await usuario.save();

    //crear y firmar el jsonwebtoken
    const payload = {

        //se alamcenan datos del usaurio
        usuario: {
            id: usuario.id //se hara una consulta con el id del usaurio, asi se traera los proyectos creados por el usaurio
        }
    };

    //firmar el jwt

    jwt.sign(payload, process.env.SECRETA, {  //la palabra sign es firmar se le pasasn dos parametro el payload y la palabra secreta
        expiresIn: 3600  // expira en una hora esta en segundos
    }, (error, token) =>{ //se crea un arrrow function por si hay algun error al crear el token
        if(error) throw error;

        //mensaje de confirmacion
        res.json({ token });

    });

    //Mensaje de confirmacion

  //  res.json({msg: 'Usuario creado correctamnete'})
} catch (error) {
    console.log(error)
    res.status(400).send('Hubo un error');
} 

}