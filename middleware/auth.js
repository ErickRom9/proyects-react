const jwt = require('jsonwebtoken'); //importamos la funcion de jwt

module.exports =  function(req, res, next) {
    //Leer el token del header
    const token = req.header('x-auth-token');
    console.log(token);


    //Revisar si no hay token
    if(!token){ //si no hay token enviara el mensaje de abajo
        return res.status(401).json({msg: 'No hay token, permiso  no valido'})
    }


    //validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA) //Con esta funcion se verifica que el token sea correcto

        //en caso que lo haya validado bien se ponen:
        req.usuario = cifrado.usuario;
        //le ponemos next para que se vaya al siguiente middleware
        next();
    } catch (error) {
        return res.status(401).json({msg: 'No token no valido'});

    }
}